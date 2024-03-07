import {MenuOrders, Order, Record} from '../types'

function checkObject<T extends MenuOrders|Order> (obj1 :T, obj2 : T, prop : string) : Record|undefined {
	let propname : string
	switch (prop) {
		case "qty":propname = "Kuantitas"
		break;
		case "price": propname = "Harga"
		break;
		case "name": propname = "Nama Menu"
		break;
		case "downpayment": propname = "DP"
		break;
		case "discount": propname = "Diskon"
		break;
		case "customer": propname = "Nama Pelanggan"
		break;
		case "status": propname = "Status Pesanan"
		break;
		default:
			propname = prop
			break;
	}
	if(obj1[prop] !== obj2[prop] && prop !== propname) {
        let record : Record = {
            action: 'update',
            name: undefined,
            prop: undefined,
            from: undefined,
            to: undefined,
            qty: undefined,
            type: undefined,
            forId: undefined,
            item: undefined
        }
		if(Object.prototype.hasOwnProperty.call(obj1, "name")) record.name = obj1['name'] 
		record.prop = propname
		record.action = "update"
		record.from = obj1[prop]
		record.to = obj2[prop]
        return record
	} else return
	
}

export default checkObject