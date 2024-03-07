//Importing Libraries 
require("dotenv").config();

import { createServer } from 'http'
import { Server } from 'socket.io'
import authenticationToken from './middleware/socketMiddleware'
import { createtOrder, updateOrder, findOrderById } from './controllers/orderController'
import { insertActivities } from './controllers/activityController'
import { generateActivities } from './utils'
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
                    user: socket.decoded,
                    records: [],
                    _id: null,
                    createdAt: new Date()
                }
				let record : Record = {
                    item: undefined,
                    action: 'create',
                    name: undefined,
                    qty: undefined,
                    type: undefined,
                    forId: undefined,
                    prop: undefined,
                    from: undefined,
                    to: undefined
                }
				record.action = "create"
				activity.records.push(record)
				await insertActivities(activity)
				io.emit('orders', response)
			}
			else io.emit('error', "Gagal Memasukan data")
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
							let activity = generateActivities(oldData, newData, socket.decoded)
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

//Listing to the app and running it on PORT 5000
httpServer.listen(PORT, async () => {
    console.log(`[server] server is running at http://localhost:${PORT}`)
})