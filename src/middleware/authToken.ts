import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import {envConfig} from '../types/constant'
dotenv.config(envConfig)

const authenticationToken = (req, res, next) => {
	
	const SECRET_KEY : string = process.env.SECRET_KEY || 'cnqo[ewiqq[ncouqoewiyqwebvq[ew0'
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if(!token) return res.status(401).json({success : false, message : "Dilarang akses API"})

	jwt.verify(token, SECRET_KEY, (err, user) => {
		if(err) return res.status(403).json({success : false, message : err.message})
		req.user= user
		next()
	})
	
}

export default authenticationToken