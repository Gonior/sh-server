import { storeInfoDb } from '../db'
import type {Store} from '../types'
import {DEFAULT_STORE_INFO} from '../types/constant'
const id = DEFAULT_STORE_INFO._id

export const findStoreInfo = () : Promise<Store> => {
	return new Promise((resolve, reject) => {
		storeInfoDb.findOne({_id : id}, (err:any, doc) => {
			err ? reject(err) : resolve(doc)
		})
	})
}

export const updateStoreInfo = (data) : Promise<number> => {
	return new Promise((resolve, reject) => {
		storeInfoDb.update({ _id: id }, data, {}, (err, numReplaced : number) => {
			err ? reject(err) : resolve(numReplaced)
		})
	})
}
