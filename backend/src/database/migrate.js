import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const migrationsDir = path.join(__dirname, 'migrations')

export function runMigrations(db) {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `)

    const files = fs
      .readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort()

    db.all('SELECT name FROM migrations', [], (err, rows) => {
      if (err) {
        console.error(err)
        return
      }

      const applied = new Set(rows.map(row => row.name))

      for (const file of files) {
        if (applied.has(file)) continue

        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8')

        db.exec(sql, (err) => {
          if (err) {
            console.error(`Error aplicando ${file}:`, err.message)
            return
          }

          db.run(
            'INSERT INTO migrations (name) VALUES (?)',
            [file],
            (err) => {
              if (err) {
                console.error(err)
              } else {
                console.log(`✅ Migration aplicada: ${file}`)
              }
            }
          )
        })
      }
    })
  })
}