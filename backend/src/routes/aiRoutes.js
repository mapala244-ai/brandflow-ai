import { Router } from 'express'
import { chat, status } from '../controllers/aiController.js'

const router = Router()

router.post('/chat', chat)
router.get('/status', status)

export default router
