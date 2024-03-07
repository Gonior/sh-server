
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

export const createMenu = (data : Menu) : Promise<Menu> => {
	return new Promise((resolve, reject) => {
		menuDb.insert(data, (err, doc : Menu) => {
			err ? reject(err) : resolve(doc)
		})
	})
}

export const findAllMenus = () : Promise<Menu[]|any>=> {
	return new Promise((resolve, reject) => {
		menuDb.find({}, (err:any, docs:Menu[]) => {
			err ? reject(err) : resolve(docs)
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

export const updateMenu = (id : string, data : Menu) : Promise<number> => {
	return new Promise((resolve, reject) => {
		menuDb.update({ _id: id }, data, {}, (err, numReplaced : number) => {
			err ? reject(err) : resolve(numReplaced)
		})
	})
}


