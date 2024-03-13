import express from 'express'
import { getActivities } from '../controllers/activityController'
import { Acitivity } from '../types'

const router = express.Router()

router.get('/:orderid', async(req, res) => {
	try {
		let orderId :string = req.params['orderid']
		let activities = await getActivities(orderId)
		if(activities) res.status(200).json({ success: true, data : activities})
		else res.status(404).json({ success: true, message : 'Tidak ada Aktivitas'})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

export default router
