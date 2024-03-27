import { sortFormatDb } from '../db'

const id = "sortFormatId"

export const findSortFormat = () => {
	return new Promise((resolve, reject) => {
		sortFormatDb.findOne({_id : id}, (err:any, doc) => {
			err ? reject(err) : resolve(doc.values)
		})
	})
}

export const updateSortFormat = (data : {value : string, id :string}[]) : Promise<number> => {
	return new Promise((resolve, reject) => {
		sortFormatDb.update({ _id: id }, {$set : { values : data } }, {}, (err, numReplaced : number) => {
			err ? reject(err) : resolve(numReplaced)
		})
	})
}
