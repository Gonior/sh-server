import {categoryDb, userDb, storeInfoDb, orderDb, activityDb, menuDb, tempDb} from '../db'
import {ADMIN, DEFAULT_CATEGORY, DEFAULT_STORE_INFO} from '../types/constant'

const init = () => {
    orderDb.ensureIndex({ fieldName: 'createdAt', expireAfterSeconds: 2592000 })
    activityDb.ensureIndex({ fieldName: 'createdAt', expireAfterSeconds: 2592000 })
    menuDb.ensureIndex({ fieldName: 'upc', unique: true, sparse : true })
    orderDb.ensureIndex({ fieldName: 'invoice', unique: true })
    userDb.ensureIndex({ fieldName: 'passcode', unique: true })
    tempDb.ensureIndex({ fieldName: 'orderId', unique: true })

    categoryDb.findOne({ _id: DEFAULT_CATEGORY._id }, (err, doc) => {
        if (!doc) categoryDb.insert(DEFAULT_CATEGORY)
    })
    userDb.findOne({ _id: ADMIN._id }, (err, doc) => {
        if (!doc) userDb.insert(ADMIN)
    })
    storeInfoDb.findOne({ _id: DEFAULT_STORE_INFO._id}, (err, doc) => {
        if (!doc) storeInfoDb.insert(DEFAULT_STORE_INFO)
    })
}


export default init