import {User, Store} from './index'
import { join } from 'path'
export const DEFAULT_CATEGORY = {
    _id : 'defaultcategory',
    name : 'Umum',
    printer : ''
}

export const ADMIN : User = {
    _id : 'imsuperadmin',
    name : 'Admin',
    passcode : '123456'
}

export const DEFAULT_STORE_INFO : Store = {
    _id : 'storeid',
    name : 'Nama Toko Anda',
    address : 'Alamat Toko Anda',
    phone : '021-23456789',
    mobilePhone : '08123456789',
    footerNote : 'Terima Kasih',
    bank : 'BANK KOTOK',
    holder : 'Nama Anda',
    norek : '1234567890'
    
}

export const envConfig = {
    path : join(process.cwd(), '.env')
}