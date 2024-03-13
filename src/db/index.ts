import Datastore from "nedb";
import path from "path";

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

export {
    orderDb,
    userDb,
    menuDb,
    categoryDb,
    activityDb,
    tempDb,
    storeInfoDb
}