
import express from 'express'
import { findAllUsers, creatUser, deleteUser , findOneUser} from '../controllers/userController'
import { User } from '../types'
import { ADMIN } from '../types/constant'
import { body, validationResult } from 'express-validator'
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        let users = await findAllUsers()
        res.status(200).json({success : true, data : users})
    } catch (error) {
        res.status(500).json({success : false, message : error.message})
    }
})

router.post('/', body('name', 'Nama tidak boleh kosong').notEmpty().trim().escape(),body('passcode', "PIN Harus diisi!").notEmpty().isLength({min : 3}).withMessage("PIN Minimal terdiri dari 3 digit") ,async (req, res) => {
    try {
        const result = validationResult(req)
        if(result.isEmpty()) {
            let {name, passcode }= req.body
            let user = await creatUser({name, passcode})
            if (user) res.status(200).json({ success: true, data: user })
            else res.status(400).json({ success: false, message: 'Tidak dapat membuat pengguna baru'})
        } else res.status(400).json({ success: false, message: 'Gagal Menambahkan Pengguna', error : result.array()})
		
	} catch (error) {
		let message = ''
        let statusCode = 500
		if (error.errorType === 'uniqueViolated') {
			message = `PIN tersebut sudah digunakan! gunakan PIN lain`
            statusCode = 400
        }
		else message = error.message
		res.status(statusCode).json({ success: false, message: message })
	}
})

router.delete('/:id', async (req, res) => {
    try {
		let id : string = req.params['id']
        if (id === ADMIN._id) return res.status(400).json({success : false, message : "Admin Tidak Dapat Dihapus"})
        let user : User = await findOneUser(id)
        if( !user ) return res.status(400).json({success : false, message : "Pegguna tidak ada dalam database"})
        let response = await deleteUser(id)
        if (response > 0)
            res.status(200).json({
                success: true,
                message: `${user.name} berhasil dihapus dari database`
            })
        else res.status(400).json({ success: false, message: `Gagal menghapus ${user.name}` })
		
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

export default router