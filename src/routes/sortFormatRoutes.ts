import express from 'express'
import { findSortFormat, updateSortFormat } from '../controllers/sortFormatController'

const router = express.Router()

router.get('/',  async (req, res) => {
	//done
	try {
		let store = await findSortFormat()
		res.status(200).json({success : true, data : store})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

router.patch('/',  async (req, res) => {
	try {
		let {values}= req.body
		let response = await updateSortFormat(values)
		if (response > 0)
			res.status(200).json({
				success: true,
				message: `Urutan pesanan berhasil diperbarui`
			})
		else
			res.status(400).json({ success: false, message: `Gagal memperbarui urutan pesanan` })
	} catch (error) {
		res.status(500).json({ success: false, message: error.message})
	}
})

export default router