import {tempDb} from '../db'
import type {Order} from '../types'

export const insertEditing = (data : Order) : Promise<Order> => {
	return new Promise((resolve, reject) => {
		tempDb.insert(data, (err, doc) => {
			err ? reject(err) : resolve(doc)
		})
	})
}

export const findEditing = (_id : string) : Promise<Order> => {
	return new Promise((resolve, reject) => {
		tempDb.findOne({_id:_id}, (err, doc) => {
			err ? reject(err) : resolve(doc)
		})
	})
}

export const deleteEditing = (_id : string) : Promise<number> => {
	return new Promise((resolve, reject) => {
		tempDb.remove({_id:_id},{multi : true}, (err, numRemoved) => {
			err ? reject(err) : resolve(numRemoved)
		})
	})
}