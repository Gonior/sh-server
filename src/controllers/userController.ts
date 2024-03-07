import { userDb } from "../db"
import type { User } from '../types'

const findAllUsers = () : Promise<User[]> => {
	return new Promise((resolve, reject) => {
		userDb.find({}, (err: any, docs: User[]) => {
			err ? reject(err) : resolve(docs)
		})
	})
}

const findOneUser = (id:string) : Promise<User> => {
	return new Promise((resolve, reject) => {
		userDb.findOne({_id : id}, (err: any, doc: User) => {
			err ? reject(err) : resolve(doc)
		})
	})
}

const creatUser = (data : User) : Promise<User> => {
	return new Promise((resolve, reject) => {
		userDb.insert(data, (err : any, doc : User) => {
			err ? reject(err) : resolve(doc)
		})
	})
}


const loginUser = (passcode: string) : Promise<User|undefined> => {
	return new Promise((resolve, reject) => {
		userDb.findOne({ passcode }, (err: any, doc: User) => {
			err ? reject(err) : resolve(doc)
		})
	})
}

const deleteUser = (id: string) : Promise<number> => {
	return new Promise((resolve, reject) => {
		userDb.remove({ _id: id }, (err, numRemoved: number) => {
			err ? reject(err) : resolve(numRemoved)
		})
	})
}


export {
    findAllUsers,
    deleteUser,
    loginUser,
    findOneUser,
    creatUser
}