import {tempDb} from '../db'

export const insertEditing = <T extends {invoice : 'string', orderId : string, _id? : string}>(data : T) : Promise<T> => {
	return new Promise((resolve, reject) => {
		tempDb.insert(data, (err, doc : T) => {
			err ? reject(err) : resolve(doc)
		})
	})
}

export const findEditing = <T extends {invoice : 'string', orderId : string, _id? : string}>(_id : string) : Promise<T> => {
	return new Promise((resolve, reject) => {
		tempDb.findOne({orderId:_id}, (err, doc) => {
			err ? reject(err) : resolve(doc)
		})
	})
}

export const deleteEditing = (_id : string) : Promise<number> => {
	return new Promise((resolve, reject) => {
		tempDb.remove({orderdId:_id},{multi : true}, (err, numRemoved) => {
			err ? reject(err) : resolve(numRemoved)
		})
	})
}