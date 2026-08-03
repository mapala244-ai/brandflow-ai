import 'dotenv/config'
import app from './src/app.js'
import db from './src/config/db.js'
import { runMigrations } from './src/database/migrate.js'

const PORT = process.env.PORT || 4000

await runMigrations(db)

app.listen(PORT, () => {
  console.log(`BrandFlow AI backend running on port ${PORT}`)
})
