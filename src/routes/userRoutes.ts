
import express from 'express'
import { findAllUsers, creatUser, deleteUser , findOneUser} from '../controllers/userController'
import { User } from '../types'
import { ADMIN } from '../types/constant'
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        let users = await findAllUsers()
        res.status(200).json({success : true, data : users})
    } catch (error) {
        res.status(500).json({success : false, message : error.message})
    }
})

router.post('/', async (req, res) => {
    try {
		let data = req.body.data
		let user = await creatUser(data)
		if (user) res.status(200).json({ success: true, data: user })
        else res.status(400).json({ success: false, message: 'Tidak dapat membuat pengguna baru'})
	} catch (error) {
		let message = ''
		if (error.errorType === 'uniqueViolated')
			message = `PIN tersebut sudah digunakan! gunakan PIN lain`
		else message = error.message
		res.status(500).json({ success: false, message: message })
	}
})

router.delete('/', async (req, res) => {
    try {
		let id : string = req.body.id
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