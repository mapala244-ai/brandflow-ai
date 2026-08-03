import * as companyModel from '../models/companyModel.js'

export async function createCompany(req, res) {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ error: 'name is required' })
    }

    const company = await companyModel.create(req.body)
    res.status(201).json(company)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create company' })
  }
}

export async function listCompanies(req, res) {
  try {
    const companies = await companyModel.findAll()
    res.status(200).json(companies)
  } catch (error) {
    res.status(500).json({ error: 'Failed to list companies' })
  }
}

export async function getCompany(req, res) {
  try {
    const company = await companyModel.findById(req.params.id)

    if (!company) {
      return res.status(404).json({ error: 'Company not found' })
    }

    res.status(200).json(company)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get company' })
  }
}

export async function updateCompany(req, res) {
  try {
    const existing = await companyModel.findById(req.params.id)

    if (!existing) {
      return res.status(404).json({ error: 'Company not found' })
    }

    const company = await companyModel.update(req.params.id, req.body)
    res.status(200).json(company)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update company' })
  }
}

export async function deleteCompany(req, res) {
  try {
    const deleted = await companyModel.remove(req.params.id)

    if (!deleted) {
      return res.status(404).json({ error: 'Company not found' })
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete company' })
  }
}
