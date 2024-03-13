import express from 'express'
import { createCategory, deleteCategory, findAllCategories, searchCategory, updateCategory} from '../controllers/categoryController'
import { searchMenuQuery } from '../controllers/menuController'
import { body, validationResult } from 'express-validator'
import { DEFAULT_CATEGORY } from '../types/constant'
const router = express.Router()

router.get('/', async (req, res) => {
	//done
	try {
		let categories = await findAllCategories()
		res.status(200).json({success : true, data : categories})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})


router.get('/:id', async (req, res) => {
	//done
	try {
		let id = req.params['id']
		let category = await searchCategory(id)
		if( category ) res.status(200).json({success : true, data : category})
		else res.status(404).json({success : false, message : "Kategori tidak ada dalam database!"})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})
router.post('/',body('name',"Nama Kategori tidak boleh kosong").notEmpty().trim(''),  async (req, res) => {
	// done
	try {
		const result = validationResult(req)
		if (result.isEmpty()) {
			let {name, printer} = req.body
			name.trim()
			if(!printer) printer = ""
			let category = await createCategory({name, printer})
			if (category) res.status(200).json({ success: true, data: category })
		} else res.status(400).json({ success: false, message: result.array()[0].msg})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

router.patch('/:id', async (req, res) => {
	//done
	try {
		let {name, printer} = req.body
		let id : string = req.params['id']
		let response = await updateCategory(id, {name, printer})
		if (response > 0)
			res.status(200).json({
				success: true,
				message: `Kategori berhasil diperbarui `
			})
		else
			res.status(400).json({
				success: false,
				message: `Gagal memperbarui kategori`
			})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

router.delete('/:id', async (req, res) => {
	//done
	try {
		let id = req.params['id']
		let menu = await searchMenuQuery({ category: id })
		if (id === DEFAULT_CATEGORY._id) return res.status(400).json({success : false, message : 'Kategori bawaan tidak dapat dihapus' })
		if (menu.length > 0) return res.status(400).json({
			success: false,
			message: 'Kategori tidak dapat dihapus, karena ada menu yang menggunakan kategori tersebut!'
		})
		
        let category = await searchCategory(id)
        if(!category) return res.status(404).json({success: false,message: 'Kategori tidak ada dalam database'})

        let response = await deleteCategory(id)
        if (response > 0)
            res.status(200).json({
                success: true,
                message: `Kategori berhasil dihapus dari database`
            })
        else res.status(400).json({ success: false, message: `Gagal menghapus kategori` })
		

	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

export default router