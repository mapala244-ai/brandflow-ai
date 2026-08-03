import * as claudeService from '../services/claudeService.js'

export async function chat(req, res) {
  try {
    const { prompt, model, maxTokens } = req.body

    if (!prompt) {
      return res.status(400).json({ error: 'prompt is required' })
    }

    const result = await claudeService.sendMessage(prompt, { model, maxTokens })
    res.status(200).json(result)
  } catch (error) {
    if (error.code === 'MISSING_API_KEY') {
      return res.status(503).json({ error: error.message })
    }

    if (error.code === 'CLAUDE_API_ERROR') {
      return res.status(error.status || 502).json({ error: error.message })
    }

    res.status(500).json({ error: 'Failed to process AI request' })
  }
}

export function status(req, res) {
  res.status(200).json({ configured: claudeService.isConfigured() })
}
