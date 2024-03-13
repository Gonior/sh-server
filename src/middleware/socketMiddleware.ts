import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { User } from 'types'
dotenv.config()

const authenticationToken = (socket, next) => {
    const SECRET_KEY : string = process.env.SECRET_KEY
    const Authorization = socket.handshake.auth?.token || socket.handshake.headers?.token || null;
	if (Authorization){
		jwt.verify(Authorization, SECRET_KEY, function(err, decoded : User) {
			if (err) return next(new Error('Token kadaluarsa, silakan login kembali'))
			socket.decoded = decoded
			next()
		})
	} else {
		next(new Error('Akses ditolak!'))
	}
}

export default authenticationToken