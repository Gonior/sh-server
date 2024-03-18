import {categoryDb} from '../db'
import type {Category} from '../types'

export const createCategory = (data) : Promise<Category> => {
	return new Promise((resolve, reject) => {
		categoryDb.insert(data, (err :any, doc:Category) => {
			err ? reject(err) : resolve(doc)
		})
	})
}
export const updateCategory = (id : string, data ) : Promise<number>=> {
	return new Promise((resolve, reject) => {
		categoryDb.update({ _id: id }, data, {}, (err : any, numReplaced : number) => {
			err ? reject(err) : resolve(numReplaced)
		})
	})
}

export const findAllCategories = () : Promise<Category[]> => {
	return new Promise((resolve, reject) => {
		categoryDb.find({}).sort({name : 1}).exec((err : Error, docs) => {
			err ? reject(err) : resolve(docs as Category[])
		})
	})
	// categoryDb.findAsync({}).sort({name : 1})
}

// export const searchCategory = (n : string) : Promise<Category[]|any> => {
// 	return new Promise((resolve, reject) => {
// 		categoryDb.find({ name: n }, (err : any, docs : Category[]) => {
// 			err ? reject(err) : resolve(docs)
// 		})
// 	})
// }

export const searchCategory = (id:string) : Promise<Category|any> => {
	return new Promise((resolve, reject) => {
		categoryDb.findOne({ _id: id }, (err :any, doc:Category) => {
			err ? reject(err) : resolve(doc)
		})
	})
}

export const deleteCategory = (id:string) : Promise<number> => {
	return new Promise((resolve, reject) => {
		categoryDb.remove({ _id: id }, (err, numRemoved:number) => {
			err ? reject(err) : resolve(numRemoved)
		})
	})
}