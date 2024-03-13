//Importing Libraries 
require("dotenv").config();

import { createServer } from 'http'
import { Server } from 'socket.io'
import authenticationToken from './middleware/socketMiddleware'
import { createtOrder, updateOrder, findOrderById } from './controllers/orderController'
import { insertActivities } from './controllers/activityController'
import generateActivities from './utils/generateActivities'
import { Record, Acitivity} from './types'
import app from '.'

const PORT = process.env.PORT || 8000
const httpServer = createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: ['http://localhost:8000', 'http://localhost:5173'],
		credentials: true
	}
})

io.use(authenticationToken)

io.on('connection', (socket) => {
	socket.on('orders', async (order) => {
		try {
			let response = await createtOrder(order)
			if (response) {
				let activity : Acitivity = {
                    orderId: response._id,
                    user: (socket as any).decoded,
                    records: [],
                    createdAt: new Date()
                }
				let record : Record = {
                    action: 'Membuat',
					prefix : 'pesanan',
					value : response.invoice
                }
				activity.records.push(record)
				await insertActivities(activity)
				io.emit('orders', response)
			}
			else io.emit('error', "Gagal memasukan pesanan!")
		} catch (err) {
			io.emit('error', err)
		}
	})
	socket.on('update-order', async (data) => {
		try {
			let oldData = await findOrderById(data.id)
			if(oldData) {
				if(oldData.status === "lunas" || oldData.status === "cancel") io.emit('error', "Pesanan yang sudah lunas/cancel tidak dapat diubah!")
				else {
					let response = await updateOrder(data.id, data.order)
					let order = {}
					if (response > 0) {
						let newData = await findOrderById(data.id)
						if(newData) {
							let activity = generateActivities(oldData, newData, (socket as any).decoded)
							if(activity) {
								await insertActivities(activity)
							}
						}
						let res = await findOrderById(data.id)
						if (res) order = res
					}
					io.emit('update-order', order)
				}
			}
		} catch (error) {
			io.emit('error', error)
		}
	})
})

httpServer.listen(PORT, async () => {
    console.log(`[server] server is running at http://localhost:${PORT}`)
})

