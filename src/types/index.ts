type Connectivity = "local" | 'network'
type Action = 'create' | 'update' | 'delete' | 'add'
type TypeDoing = 'note' | 'menu'
type Status = 'tunda' | 'lunas' | 'arsip' | 'cancel'
export interface User {
    _id : string,
    name : string,
    passcode : string
}

export interface Printer {
    _id : string,
    name : string,
    connectivity : Connectivity,
    type : string
}

export interface Category {
    _id : string | undefined,
    name : string,
    printer : Printer | undefined | string
}
export interface Menu {
    _id : string,
    name : string,
    upc : number | null,
    category : string | Category,
    price : number
}
export interface MenuOrders {
    _id : string,
    name : string,
    upc : number | null,
    category : string | Category,
    price : number,
    total : number,
    forId : string | undefined,
    qty : number,
    printed : undefined | boolean

}
export interface Order {
    _id : string,
    user : User,
    customer : string,
    invoice : string,
    subtotal : number,
    tax : number,
    createdAt : Date,
    discount : number,
    downpayment : number,
    grandtotal : number,
    totalitems : number,
    updateAt : Date,
    status : Status
    orders : MenuOrders[]
}

export interface Record {
    item: string | undefined,
    action : Action,
    name : string | undefined,
    qty : undefined | number,
    type : TypeDoing | undefined
    forId : string | undefined
    prop : string | undefined,
    from : any | undefined,
    to : any | undefined
    
    
}
export interface Acitivity {
    _id : string|null,
    user : User,
    createdAt : Date,
    records : Record[]
    orderId : string
}