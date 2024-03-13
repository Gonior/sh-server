import {MenuOrders, Order, Record} from '../types'

function checkObject<T extends MenuOrders|Order> (obj1 :T, obj2 : T, prop : string) : Record|undefined {
	let propname : string
	switch (prop) {
		case "qty":propname = "Kuantitas"
		break;
		case "price": propname = "Harga"
		break;
		case "name": {
			if(!obj1['forId']) propname = "Nama Menu"
			else propname = "Catatan"
		}
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
            action: 'Mengubah',
            props : propname,
			item : 'pesanan',
			value : `${obj2[prop]} -> ${obj2[prop]}`
        }
		if(Object.prototype.hasOwnProperty.call(obj1, "name")) {
			if(!obj1['forId']) record.item = obj1['name'] 
			else {
				record.item = obj2['name']
			}
		}
		
        return record
	} else return
	
}

export default checkObject