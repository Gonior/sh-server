import express from 'express'
import { searchMenu, createMenu, deleteMenu, findAllMenus, updateMenu, searchMenuQuery } from '../controllers/menuController'
import { Menu } from '../types'
const router = express.Router()

router.get('/',  async (req, res) => {
	//done
	try {
		let menu = await findAllMenus()
		res.status(200).json({success : true, data : menu})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

router.post('/',  async (req, res) => {
	try {
		let {name, upc, category, price} = req.body
		let menu = await createMenu({name, upc, category, price})
		if (menu) res.status(200).json({ success: true, data: menu })
	} catch (error) {
		let message = ''
		if (error.errorType === 'uniqueViolated')
			message = `UPC tersebut sudah digunakan, gunakan UPC lain!`
		else message = error.message
		res.status(500).json({ success: false, message: message })
	}
})

router.patch('/:id',  async (req, res) => {
	try {
		let {name, upc, category, price} = req.body
		let id : string = req.params['id']
		let response = await updateMenu(id, {name, upc, category, price})
		if (response > 0)
			res.status(200).json({
				success: true,
				message: `Menu berhasil diperbarui`
			})
		else
			res.status(400).json({ success: false, message: `Gagal memperbarui menu` })
	} catch (error) {
        let message = ''
        // console.log(error.errorType)
        if (error.errorType === 'uniqueViolated') message = `UPC tersebut sudah digunakan, gunakan UPC lain!`
		else message = error.message
		res.status(500).json({ success: false, message: message })
	}
})
router.delete('/:id',  async (req, res) => {
	try {
		let id = req.params['id']
        let menu : Menu = await searchMenu(id)
        if( !menu) return res.status(400).json({ success: false, message: `Menu tidak ada dalam database` })
		let response = await deleteMenu(id)
		if (response > 0)
			res.status(200).json({
				success: true,
				message: `Menu berhasil dihapus dari database`
			})
		else res.status(400).json({ success: false, message: `Gagal menghapus menu` })
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

router.post('/search', async (req, res) => {
	try {
		let query = req.body.query
		let menus = await searchMenuQuery(query)
		if (menus.length > 0) res.status(200).json({ success: true, data: menus })
		else res.status(404).json({ success: false, message: 'Menu tidak ditemukan' })
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

export default router