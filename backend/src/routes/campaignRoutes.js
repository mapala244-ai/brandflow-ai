import { Router } from 'express'
import {
  createCampaign,
  listCampaigns,
  getCampaign,
  deleteCampaign,
} from '../controllers/campaignController.js'

const router = Router()

router.post('/', createCampaign)
router.get('/', listCampaigns)
router.get('/:id', getCampaign)
router.delete('/:id', deleteCampaign)

export default router
