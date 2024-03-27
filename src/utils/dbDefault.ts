import {categoryDb, userDb, storeInfoDb, orderDb, activityDb, menuDb, tempDb, sortFormatDb} from '../db'
import {ADMIN, DEFAULT_CATEGORY, DEFAULT_STORE} from '../types/constant'

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
    storeInfoDb.findOne({ _id: DEFAULT_STORE._id}, (err, doc) => {
        if (!doc) storeInfoDb.insert(DEFAULT_STORE)
    })

    sortFormatDb.findOne({ _id: 'sortFormatId'}, (err, doc) => {
        if (!doc) sortFormatDb.insert({_id : "sortFormatId", values : [{value:"unsorted", id : "a0206a03-921a-489c-befd-449f5b4700a1"}]})
    })
}


export default init