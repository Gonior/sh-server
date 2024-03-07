import {activityDb} from '../db'
import type {Acitivity} from '../types'

export const getActivities = (orderId : string) => {
	return new Promise((resolve, reject) => {
		activityDb
			.find({orderId})
			.sort({createdAt: 1})
			.exec((err, docs) => {

				err ? reject(err) : resolve(docs)
			})
	})
}

export const insertActivities = (data : Acitivity) => {
	return new Promise((resolve, reject) => {
		activityDb.insert(data, (err, doc:Acitivity) => {
			err ? reject(err) : resolve(doc)
		})
	})
}