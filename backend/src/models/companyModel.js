import { dbAll, dbGet, dbRun } from '../config/db.js'

export async function findAll() {
  return dbAll('SELECT * FROM companies ORDER BY id DESC')
}

export async function findById(id) {
  return dbGet('SELECT * FROM companies WHERE id = ?', [id])
}

export async function create(data) {
  const result = await dbRun(
    `INSERT INTO companies (name, industry, email, phone, website, address, description)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.industry ?? null,
      data.email ?? null,
      data.phone ?? null,
      data.website ?? null,
      data.address ?? null,
      data.description ?? null,
    ]
  )

  return findById(result.lastID)
}

export async function update(id, data) {
  const existing = await findById(id)
  if (!existing) return null

  await dbRun(
    `UPDATE companies
     SET name = ?,
         industry = ?,
         email = ?,
         phone = ?,
         website = ?,
         address = ?,
         description = ?,
         updated_at = datetime('now')
     WHERE id = ?`,
    [
      data.name ?? existing.name,
      data.industry ?? existing.industry,
      data.email ?? existing.email,
      data.phone ?? existing.phone,
      data.website ?? existing.website,
      data.address ?? existing.address,
      data.description ?? existing.description,
      id,
    ]
  )

  return findById(id)
}

export async function remove(id) {
  const result = await dbRun('DELETE FROM companies WHERE id = ?', [id])
  return result.changes > 0
}
