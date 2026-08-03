import express from 'express'
import cors from 'cors'
import companyRoutes from './routes/companyRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import campaignRoutes from './routes/campaignRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/companies', companyRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/campaigns', campaignRoutes)

export default app
