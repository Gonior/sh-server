import express from 'express'
import {findStoreInfo, updateStoreInfo } from '../controllers/storeInfoController'
import { Store, StoreConfig } from 'types'
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
		let { _id, bankInfo, storeInfo,taxInfo} = req.body as StoreConfig
		let response = await updateStoreInfo({ _id, bankInfo, storeInfo,taxInfo})
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