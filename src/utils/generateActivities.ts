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
                    action: "create",
                    name: undefined,
                    qty: undefined,
                    type: undefined,
                    forId: undefined,
                    prop: undefined,
                    from: undefined,
                    to: undefined,
                    item: undefined
                }
				record.action = "add"
				record.name = order.name
				record.type = order.qty ? "menu" : 'note'
				if(record.type === "note") {
					record.forId = order.forId
					record.item = newValue.orders.find(o => o._id === record.forId)?.name
				}
				record.qty = order.qty ? order.qty : undefined
				activities.push(record)
			})
		}
		if(deletedOrders.length > 0) {
			deletedOrders.forEach((order) => {
				let record : Record = {
                    item: undefined,
                    action: "delete",
                    name: undefined,
                    qty: undefined,
                    type: undefined,
                    forId: undefined,
                    prop: undefined,
                    from: undefined,
                    to: undefined
                }
				record.action = "delete"
				record.name = order.name
				if(order.forId) {
					record.type = 'note'
					record.forId = order.forId
					record.item = initValue.orders.find(o => o._id === record.forId)?.name
				} else {
					record.type = "menu"
					record.qty = order.qty
				}
				activities.push(record)
			})
		}
		if(sameOrdersId.length > 0) {
			let fromOrder = initValue.orders.filter(order => sameOrdersId.indexOf(order._id) !== -1)
			let toOrder = newValue.orders.filter(order => sameOrdersId.indexOf(order._id) !== -1)
			for(let i = 0; i<fromOrder.length;i++) {
				for(let prop in fromOrder[i]) {
					let test = checkObject(fromOrder[i], toOrder[i], prop)
					if(test) activities.push(test)

				}
			}
		}
		if(activities.length > 0) {
            recordingActivity = {_id : null, orderId : initValue._id, user, records : activities, createdAt : new Date()}
            return recordingActivity
        } else return 

	} catch (error) {

		return
	}



}

export default generateActivities