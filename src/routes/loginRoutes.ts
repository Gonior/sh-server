import * as dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'
dotenv.config()
import { loginUser} from '../controllers/userController'

const router = express.Router()

router.post('/',  async (req, res) => {
	const SECRET_KEY = process.env.SECRET_KEY || 'cnqo[ewiqq[ncouqoewiyqwebvq[ew0'
	try {
		let passcode = req.body.passcode
		let user = await loginUser(passcode)
		if (user) {
			const token = jwt.sign(user, SECRET_KEY, {expiresIn : '18h'})
			res.status(200).json({ success: true, data: user, token })
		} else res.status(200).json({ success: false, message: 'PIN anda salah!' })
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})
export default router