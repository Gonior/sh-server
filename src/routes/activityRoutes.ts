import express from 'express'
import { getActivities } from '../controllers/activityController'
import { Acitivity } from '../types'

const router = express.Router()

router.post('/', async(req, res) => {
	try {
		let orderId :string = req.body.orderId
		let activities = await getActivities(orderId)

		res.status(200).json({ success: true, data :  activities})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

export default router
