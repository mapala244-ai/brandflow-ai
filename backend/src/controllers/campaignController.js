import * as campaignModel from '../models/campaignModel.js'
import * as companyModel from '../models/companyModel.js'
import * as claudeService from '../services/claudeService.js'

function buildPrompt(company, productName) {
  return `Eres un experto en marketing digital. Genera contenido de marketing listo para publicar sobre el siguiente producto.

Empresa: ${company.name}
Industria: ${company.industry || 'No especificada'}
Descripción de la empresa: ${company.description || 'No especificada'}
Producto: ${productName}

Responde ÚNICAMENTE con un objeto JSON válido (sin markdown, sin texto adicional antes o después) con exactamente esta estructura:
{
  "instagram": "texto para publicación de Instagram",
  "facebook": "texto para publicación de Facebook",
  "whatsapp": "mensaje corto para WhatsApp",
  "email": { "subject": "asunto del correo", "body": "cuerpo del correo" },
  "seo": { "title": "título SEO", "description": "meta descripción SEO" },
  "hashtags": ["#hashtag1", "#hashtag2"],
  "imagePrompt": "prompt para generar una imagen con IA",
  "videoPrompt": "prompt para generar un video con IA"
}`
}

function parseCampaignContent(rawText) {
  const cleaned = rawText.trim().replace(/^```(json)?/i, '').replace(/```$/, '').trim()
  return JSON.parse(cleaned)
}

export async function createCampaign(req, res) {
  try {
    const { company_id, product_name } = req.body

    if (!company_id || !product_name) {
      return res.status(400).json({ error: 'company_id and product_name are required' })
    }

    const company = await companyModel.findById(company_id)

    if (!company) {
      return res.status(404).json({ error: 'Company not found' })
    }

    const prompt = buildPrompt(company, product_name)
    const result = await claudeService.sendMessage(prompt, { maxTokens: 2048 })

    let content
    try {
      content = parseCampaignContent(result.content)
    } catch (parseError) {
      return res.status(502).json({ error: 'Claude AI returned an invalid response' })
    }

    const campaign = await campaignModel.create({ company_id, product_name, content })
    res.status(201).json(campaign)
  } catch (error) {
    if (error.code === 'MISSING_API_KEY') {
      return res.status(503).json({ error: error.message })
    }

    if (error.code === 'CLAUDE_API_ERROR') {
      return res.status(error.status || 502).json({ error: error.message })
    }

    res.status(500).json({ error: 'Failed to create campaign' })
  }
}

export async function listCampaigns(req, res) {
  try {
    const campaigns = await campaignModel.findAll(req.query.company_id)
    res.status(200).json(campaigns)
  } catch (error) {
    res.status(500).json({ error: 'Failed to list campaigns' })
  }
}

export async function getCampaign(req, res) {
  try {
    const campaign = await campaignModel.findById(req.params.id)

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' })
    }

    res.status(200).json(campaign)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get campaign' })
  }
}

export async function deleteCampaign(req, res) {
  try {
    const deleted = await campaignModel.remove(req.params.id)

    if (!deleted) {
      return res.status(404).json({ error: 'Campaign not found' })
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete campaign' })
  }
}
