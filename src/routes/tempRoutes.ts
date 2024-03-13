

import express from 'express'
import { findEditing, deleteEditing, insertEditing } from '../controllers/tempController'
const router = express.Router()

router.get('/:id', async (req, res) => {
	
	try {
        let id = req.params['id']
		let temp = await findEditing(id)
		if( !temp ) res.status(200).json({success : true, message : "Order safe to edit"})
		else res.status(400).json({success : false, message : "Tidak dapat melakukan perubahan karena ada pengguna lain yang sedang melakukan perubahan."})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

router.post('/',  async (req, res) => {
	try {
		let {orderId, invoice} = req.body
		let temp = await insertEditing({orderId, invoice})
		if (temp) res.status(200).json({ success: true, data: temp })
	} catch (error) {
		res.status(500).json({ success: false, message: error })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		let id = req.params['id']
		let numRemoved = await deleteEditing(id)
        if (numRemoved > 0) res.status(200).json({ success: true, message: `Temp data has been delete`})
        else res.status(400).json({ success: false, message: `Nothing to delete`})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

export default router
