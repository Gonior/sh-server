import {orderDb} from '../db'
import type {Order} from '../types'

export const createtOrder = (data : Order) : Promise<any> => {
	return new Promise((resolve, reject) => {
		orderDb.insert(data, (err, doc : Order) => {
			err ? reject(err) : resolve(doc)
		})
	})
}

export const updateOrder = (id : string, data : Order) : Promise<number> => {
	// Setting the value of a non-existing field in a subdocument by using the dot-notation
	// query : { $set: { "data.satellites": 2, "data.red": true }
	// or { $set: { data: { satellites: 3 } } }
	return new Promise((resolve, reject) => {
		orderDb.update({ _id: id }, data,{}, (err, numReplaced : number) => {
			err ? reject(err) : resolve(numReplaced)
		})
	})
}

export const updateBatchOrderStatus = (arrayId:string[], status:string) : Promise<number> => {
	// Setting the value of a non-existing field in a subdocument by using the dot-notation
	// query : { $set: { "data.satellites": 2, "data.red": true }
	// or { $set: { data: { satellites: 3 } } }
	return new Promise((resolve, reject) => {
		orderDb.update(
			{
				_id: {
					$in: arrayId
				}
			},
			{ $set: { status } },
			{ multi: true },
			(err, numReplaced) => {
				err ? reject(err) : resolve(numReplaced)
			}
		)
	})
}

export const findLastOrder = () => {
	return new Promise((resolve, reject) => {
		orderDb
			.find({})
			.sort({ createdAt: -1 })
			.limit(1)
			.exec((err, docs) => {
				err ? reject(err) : resolve(docs)
			})
	})
}

export const findAllOrdersByDate = (date:Date) => {
	let startDate = new Date(date)
	let endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)

	return new Promise((resolve, reject) => {
		orderDb
			.find({ createdAt: { $gte: startDate, $lte: endDate } })
			.sort({ createdAt: -1 })
			.exec((err, docs) => {
				err ? reject(err) : resolve(docs)
			})
	})
}

export const findOrdersById = (arrayId : string[]) => {
	return new Promise((resolve, reject) => {
		orderDb
			.find({
				_id: {
					$in: arrayId
				}
			})
			.exec((err, docs) => {
				err ? reject(err) : resolve(docs)
			})
	})
}

export const findOrderById = (_id : string) => {
	return new Promise((resolve, reject) => {
		orderDb.findOne({ _id: _id },(err, docs) => {
			err ? reject(err) : resolve(docs)
		})
	})
}

export const findOrdersNotPaid = ()=> {
	let date = new Date()
	let startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
	let endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
	return new Promise((resolve, reject) => {
		orderDb
			.find({
				$or: [{ status: 'tunda' }, { status: 'arsip' }],
				$not: { createdAt: { $gte: startDate, $lte: endDate } }
			})
			.sort({ createdAt: -1 })
			.exec((err, docs) => {
				err ? reject(err) : resolve(docs)
			})
	})
}

export const deleteOrders = (id:string):Promise<number> => {
	return new Promise((resolve, reject) => {
		orderDb.remove({ _id: id }, (err, numRemoved) => {
			err ? reject(err) : resolve(numRemoved)
		})
	})
}