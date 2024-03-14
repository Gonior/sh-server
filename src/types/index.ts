type Connectivity = "local" | 'network'
type Action = 'Membuat' | 'Menghapus' | 'Menambahkan' | 'Mengubah'
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
    invoice : string,
    createdAt : Date,
    updateAt : Date,
    status : Status
    user : User,
    customer : string,
    orders : MenuOrders[]
    totalitems : number,
    subtotal : number,
    discount : number,
    tax : number,
    downpayment : number,
    grandtotal : number,
    cash : number
    change : number
}

export interface Record {
    action : Action,
    value : any
    prefix? : 'pesanan' | 'menu' | 'catatan' | string
    props? : string
    item? : 'pesanan' | string
}

export interface Acitivity {
    _id?: string,
    user : User,
    createdAt : Date,
    records : Record[]
    orderId : string
}

export interface Store {
    _id : 'storeid'
    name : string
    address : string
    phone : string
    mobilePhone? : string
    footerNote : string
    norek : string | number
    holder : string
    bank : string
    
}