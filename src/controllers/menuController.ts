
import {menuDb} from '../db'
import type {Menu} from '../types'

export const searchMenuQuery = (query:any) : Promise<Menu[]>=> {
	return new Promise((resolve, reject) => {
		menuDb.find(query, (err:any, docs : Menu[]) => {
			err ? reject(err) : resolve(docs)
		})
	})
}

export const searchMenu = (id : string) : Promise<Menu>=> {
	return new Promise((resolve, reject) => {
		menuDb.findOne({_id : id}, (err:any, doc : Menu) => {
			err ? reject(err) : resolve(doc)
		})
	})
}

export const createMenu = (data) : Promise<Menu> => {
	return new Promise((resolve, reject) => {
		menuDb.insert(data, (err, doc : Menu) => {
			err ? reject(err) : resolve(doc)
		})
	})
}

export const findAllMenus = () : Promise<Menu[]>=> {
	return new Promise((resolve, reject) => {
		menuDb.find({}).sort({name : 1}).exec((err : Error, docs) => {
			err ? reject(err) : resolve(docs as Menu[])
		})
	})
}

export const deleteMenu = (id : string) : Promise<number> => {
	return new Promise((resolve, reject) => {
		menuDb.remove({ _id: id }, (err, numRemoved) => {
			err ? reject(err) : resolve(numRemoved)
		})
	})
}

export const updateMenu = (id : string, data) : Promise<number> => {
	return new Promise((resolve, reject) => {
		menuDb.update({ _id: id }, data, {}, (err, numReplaced : number) => {
			err ? reject(err) : resolve(numReplaced)
		})
	})
}


