import {join} from 'path'
import {User, Store, Tax, BankAccount, StoreConfig} from './index'

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

const DEFAULT_STORE_INFO : Store = {
    name: 'Nama Toko Anda',
    address: 'Alamat Toko Anda',
    phone: '0221234567',
    mobilePhone: '081234567890',
    footerNote: 'Terimakasih atas kunjunganya',
}

const DEFAULT_BANK_INFO : BankAccount = {
    bank : 'Bank Kotok',
    holder : 'Nama Anda',
    accountNumber : '1234567890'
}

const DEFAULT_TAX_INFO : Tax = {
    checked: false,
    name: '',
    value: 0
}

export const DEFAULT_STORE : StoreConfig = {
    _id: 'storeid',
    storeInfo: DEFAULT_STORE_INFO,
    taxInfo: DEFAULT_TAX_INFO,
    bankInfo: DEFAULT_BANK_INFO
}

export const envConfig = {
    path : join(process.cwd(), '.env')
}