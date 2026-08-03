import { dbAll, dbGet, dbRun } from '../config/db.js'

function parseRow(row) {
  if (!row) return row
  return { ...row, content: JSON.parse(row.content) }
}

export async function findAll(companyId) {
  const rows = companyId
    ? await dbAll('SELECT * FROM campaigns WHERE company_id = ? ORDER BY id DESC', [companyId])
    : await dbAll('SELECT * FROM campaigns ORDER BY id DESC')

  return rows.map(parseRow)
}

export async function findById(id) {
  const row = await dbGet('SELECT * FROM campaigns WHERE id = ?', [id])
  return parseRow(row)
}

export async function create(data) {
  const result = await dbRun(
    `INSERT INTO campaigns (company_id, product_name, content)
     VALUES (?, ?, ?)`,
    [data.company_id, data.product_name, JSON.stringify(data.content)]
  )

  return findById(result.lastID)
}

export async function remove(id) {
  const result = await dbRun('DELETE FROM campaigns WHERE id = ?', [id])
  return result.changes > 0
}
