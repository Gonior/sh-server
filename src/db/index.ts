import Datastore from "nedb";
import path from "path";
import {ADMIN, DEFAULT_CATEGORY} from '../types/constant'

const orderDb = new Datastore({
    filename: path.join(process.cwd(),'/database/orders.db'),
    autoload: true,
    timestampData: true
})
const userDb = new Datastore({
    filename: path.join(process.cwd(),'/database/users.db'),
    autoload: true,
})

const menuDb = new Datastore({
    filename: path.join(process.cwd(),'/database/menus.db'),
    autoload: true,
})

const categoryDb = new Datastore({
    filename: path.join(process.cwd(),'/database/categories.db'),
    autoload: true,
})

const activityDb = new Datastore({
    filename: path.join(process.cwd(),'/database/activities.db'),
    autoload: true,
    timestampData: true
})

const tempDb = new Datastore({
    filename: path.join(process.cwd(),'/database/temp.db'),
    autoload: true,
})

const storeInfoDb = new Datastore({
    filename: path.join(process.cwd(),'/database/storeInfo.db'),
    autoload: true,
})

categoryDb.findOne({ _id: DEFAULT_CATEGORY._id }, (err, doc) => {
	if (!doc) categoryDb.insert(DEFAULT_CATEGORY)
})
userDb.findOne({ _id: ADMIN._id }, (err, doc) => {
    if (!doc) userDb.insert(ADMIN)
})
orderDb.ensureIndex({ fieldName: 'createdAt', expireAfterSeconds: 2592000 })
activityDb.ensureIndex({ fieldName: 'createdAt', expireAfterSeconds: 2592000 })
menuDb.ensureIndex({ fieldName: 'upc', unique: true })
orderDb.ensureIndex({ fieldName: 'invoice', unique: true })
userDb.ensureIndex({ fieldName: 'passcode', unique: true })
tempDb.ensureIndex({ fieldName: 'invoice', unique: true })

export {
    orderDb,
    userDb,
    menuDb,
    categoryDb,
    activityDb,
    tempDb,
    storeInfoDb
}
// const menusDb = new Datastore({
//     filename : 
// })