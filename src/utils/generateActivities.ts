import { Order, User, Record, Acitivity } from "../types"
import checkObject from "./checkObject"
const generateActivities = (initValue: Order , newValue :Order, user :User) => {
    
	if(!initValue || !newValue || Object.keys(initValue).length <=1 || Object.keys(initValue).length <=1) return
	let recordingActivity : Acitivity
	let activities: Record[] = []

	try {

		for(let prop in initValue) {

			if( prop === "customer" || prop === "status" || prop === "downpayment" || prop === "discount") {
				let result = checkObject(initValue, newValue, prop)
				if(result) activities.push(result)
			}
		}


		let ordersId = [...initValue.orders.map((order) => {
			let str = order._id
			return str
		})]
		let newOrdersId = [...newValue.orders.map((order) => {
			let str = order._id
			return str
		})]
		let sameOrdersId = [...initValue.orders.filter(order => newOrdersId.indexOf(order._id) !== -1).map(order => order._id)]
		let addOrders = [...newValue.orders.filter(order => ordersId.indexOf(order._id) === -1)]
		let deletedOrders = [...initValue.orders.filter(order => newOrdersId.indexOf(order._id)===-1)]

		if(addOrders.length > 0) {
			addOrders.forEach((order) => {
				let record : Record = {
                    action: "Menambahkan",
					value : ''
                }
				if(!order.forId) {
					record.prefix = 'menu' 
					record.value = `${order.qty} ${order.name}`
				} else {
					record.prefix = 'catatan menu '+ newValue.orders.find(o => o._id === order.forId)?.name
					record.value = order.name
				}
				activities.push(record)
			})
		}
		if(deletedOrders.length > 0) {
			deletedOrders.forEach((order) => {
				let record : Record = {
                    action: "Menghapus",
					value : ''
                }
				if(!order.forId) {
					record.prefix = 'menu' 
					record.value = `${order.qty} ${order.name}`
				} else {
					record.prefix = 'catatan menu '+ newValue.orders.find(o => o._id === order.forId)?.name
					record.value = order.name
				}
				activities.push(record)
			})
		}
		if(sameOrdersId.length > 0) {
			let fromOrder = initValue.orders.filter(order => sameOrdersId.indexOf(order._id) !== -1)
			let toOrder = newValue.orders.filter(order => sameOrdersId.indexOf(order._id) !== -1)
			for(let i = 0; i<fromOrder.length;i++) {
				for(let prop in toOrder[i]) {
					let test = checkObject(fromOrder[i], toOrder[i], prop)
					
					if(test) {
						if (toOrder[i].forId) test.item = toOrder.find(order => order._id === test.item)?.name 
						activities.push(test)
					}
				}
			}
		}
		if(activities.length > 0) {
            recordingActivity = { orderId : initValue._id, user, records : activities, createdAt : new Date()}
            return recordingActivity
        } else return 

	} catch (error) {

		return
	}
}

export default generateActivities