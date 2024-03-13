import express from 'express'
import {findStoreInfo, updateStoreInfo } from '../controllers/storeInfoController'
const router = express.Router()

router.get('/',  async (req, res) => {
	//done
	try {
		let store = await findStoreInfo()
		res.status(200).json({success : true, data : store})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

router.patch('/',  async (req, res) => {
	try {
		let {name, address, footerNote, phone, mobilePhone, bank, holder, norek} = req.body
		let response = await updateStoreInfo({name, address, footerNote, phone, mobilePhone, bank, holder, norek})
		if (response > 0)
			res.status(200).json({
				success: true,
				message: `Informasi perusahaan berhasil diperbarui`
			})
		else
			res.status(400).json({ success: false, message: `Gagal memperbarui informasi perusahaan` })
	} catch (error) {
		res.status(500).json({ success: false, message: error.message})
	}
})

export default router