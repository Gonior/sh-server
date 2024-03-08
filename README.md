# List Endpoint

## Login
Endpoit : `POST` `/login`

### Request Body
```json
{
    "passcode" : "string" // required
}
```

### Responses : status `200`
```json
{
    "success" : true,
    "data" : {
        "_id" : "string",
        "name" : "string",
        "passcode" : "string"
    },
    "token" : "string"
}
```
### Responses : status `400`
```json
{
    "success" : false,
    "message" : "string"
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
-------------
## GET User
Endpoit : `GET` `/user`
### Request Header 
```javascript
{
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer <TOKEN>'
}
```
### Request Body
```json
{}
```

### Responses : status `200`
```json
{
    "success" : true,
    "data" : [
        {
            "_id" : "string",
            "name" : "string",
            "passcode" : "string" // unique
        },
        ...
    ]
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
## Insert User 
Endpoit : `POST` `/user`
### Request Header 
```javascript
{
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer <TOKEN>'
}
```
### Request Body
```json
{
    "name" : "string" , // required
    "passcode" : "string" // required
}
```

### Responses : status `200`
```json
{
    "success" : true,
    "data" : { 
        "_id" : "string",
        "name" : "string",
        "passcode" : "string"
    },
}
```
### Responses : status `400`
```json
{
    "success" : false,
    "message" : "string"
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```


## Delete User
Endpoit : `DELETE` `/user/:id`
### Request Header 
```javascript
{
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer <TOKEN>'
}
```
### Request Body
```json
{}
```

### Responses : status `200`
```json
{
    "success" : true,
    "message" : "string"
}
```
### Responses : status `400`
```json
{
    "success" : false,
    "message" : "string"
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
---------------
## GET Category 
Endpoit : `GET` `/category`
### Request Header 
```javascript
{
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer <TOKEN>'
}
```
### Request Body
```json
{}
```

### Responses : status `200`
```json
{
    "success" : true,
    "data" : [
        {
            "_id" : "string",
            "name" : "string",
            "printer" : "string" | ""
        },
        ...
    ]
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
## Insert Category 
Endpoit : `POST` `/category`
### Request Header 
```javascript
{
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer <TOKEN>'
}
```
### Request Body
```json
{
    "name" : "string" , // required
    "printer" : "string"
}
```

### Responses : status `200`
```json
{
    "success" : true,
    "data" : { 
        "_id" : "string",
        "name" : "string",
        "printer" : "string" | ""
    },
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```

## Edit Category 
Endpoit : `PATCH` `/category/:id`
### Request Header 
```javascript
{
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer <TOKEN>'
}
```
### Request Body
```json
{
    "name" : "string" , // required
    "printer" : "string"
}
```

### Responses : status `200`
```json
{
    "success" : true,
    "message" : "string"
}
```
### Responses : status `400`
```json
{
    "success" : false,
    "message" : "string"
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```

## Delete Category 
Endpoit : `DELETE` `/category/:id`
### Request Header 
```javascript
{
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer <TOKEN>'
}
```
### Request Body
```json
{}
```

### Responses : status `200`
```json
{
    "success" : true,
    "message" : "string"
}
```
### Responses : status `400`
```json
{
    "success" : false,
    "message" : "string"
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
---------------

## GET Menu 
Endpoit : `GET` `/menu`
### Request Header 
```javascript
{
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer <TOKEN>'
}
```
### Request Body
```json
{}
```

### Responses : status `200`
```json
{
    "success" : true,
    "data" : [
        {
            "_id" : "string",
            "name" : "string",
            "printer" : "string" | ""
        },
        ...
    ]
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
## Insert Menu 
Endpoit : `POST` `/menu`
### Request Header 
```javascript
{
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer <TOKEN>'
}
```
### Request Body
```json
{
    "name" : "string" , 
    "price" : 20000,
    "upc" : 33,
    "category" : "string"
}
```

### Responses : status `200`
```json
{
    "success" : true,
    "data" : { 
        "_id" : "string",
        "name" : "string",
        "price" : 20000,
        "upc" : 33,
        "category" : "string"
    },
}
```
### Responses : status `400`
```json
{
    "success" : false,
    "message" : "string"
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```

## Edit Category 
Endpoit : `PATCH` `/menu/:id`
### Request Header 
```javascript
{
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer <TOKEN>'
}
```
### Request Body
```json
{
    "name" : "string" , 
    "price" : 20000,
    "upc" : 33,
    "category" : "string"
}
```

### Responses : status `200`
```json
{
    "success" : true,
    "message" : "string"
}
```
### Responses : status `400`
```json
{
    "success" : false,
    "message" : "string"
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
## Delete Menu
Endpoit : `DELETE` `/menu/:id`
### Request Header 
```javascript
{
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer <TOKEN>'
}
```
### Request Body
```json
{}
```

### Responses : status `200`
```json
{
    "success" : true,
    "message" : "string"
}
```
### Responses : status `400`
```json
{
    "success" : false,
    "message" : "string"
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
-----------------------
## Activity
Endpoit : `GET` `/activity/:orderid`
### Request Header 
```javascript
{
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer <TOKEN>'
}
```
### Request Body
```json
{}
```

### Responses : status `200`
```json
{
    "success" : true,
    "data" : [
        {
            "_id" : "string",
            "createdAt" : "2024-03-08T05:14:00.629Z",
            "orderId" : "string",
            "user" : {
                "_id" : "string",
                "name" : "string",
                "passcode" : "string"
            },
            "records" : [
                {
                    "action" : "create" | "add" | "delete" | "update",
                    "item": "string" | undefined,
                    "name" : "string" | undefined,
                    "qty" : "number" | undefined,
                    "type" : "menu" | "note",
                    "forId" : "string" | undefined
                    "prop" : "string" | undefined,
                    "from" : "any" | undefined,
                    "to" : "any" | undefined
                }
            ],
            ...
        }
    ]
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```

-----------
## Get Order by date
Endpoit : `POST` `/order`

### Request Body
```json
{
    "today" : "datestring" // ex. "29-2-2024"
}
```

### Responses : status `200`
```json
{
    "success" : true,
    "data" : [
        ...
    ]
}
```

### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
## Get last order
Endpoit : `GET` `/order/last`

### Request Body
```json
{}
```

### Responses : status `200`
```json
{
    "success" : true,
    "data" : [
        ...
    ]
}
```

### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
## Get not paid order
Endpoit : `GET` `/order/notPaid`

### Request Body
```json
{}
```

### Responses : status `200`
```json
{
    "success" : true,
    "data" : [
        ...
    ]
}
```

### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
## Edit an Order
Endpoit : `PATCH` `/order/:id`

### Request Body
```json
{
    "customer" : "string", 
    "invoice" : "string", 
    "subtotal" : 0, 
    "tax" : 0,
    "discount" : 0, 
    "grandtotal" : 0, 
    "downpayment": 0, 
    "totalitems" : 0, 
    "status":  "arsip" | "tunda" | "lunas" | "cancel",
    "orders" : [
        {
            "_id" : "string",
            "name" : "string", 
            "price" : 20000,
            "upc" : 33,
            "category" : {
                "_id" : "string",
                "name" : "string",
                "printer" : "printer-adds-1"
            },
            "qty" : 2,
            "total" : 40000,
            "printed" : true
        },
        ...
    ], 
    "createdAt"  : "2024-03-08T05:14:00.629Z", 
    "updateAt" : "2024-03-08T05:14:00.629Z",
}
```

### Responses : status `200`
```json
{
    "success" : true,
    "data" : [
        ...
    ]
}
```

### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
## Get multiple order
Endpoit : `GET` `/order/batch?arrayId=id1,id2,..,idn`

### Request Body
```json
{}
```

### Responses : status `200`
```json
{
    "success" : true,
    "data" : [
        ...
    ]
}
```

### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
## Edit multiple order
Endpoit : `POST` `/order/batch?arrayId=id1,id2,..,idn`

### Request Body
```json
{
    "status":  "arsip" | "tunda" | "lunas" | "cancel"
}
```

### Responses : status `200`
```json
{
    "success" : true,
    "message" : "string"
}
```
### Responses : status `400`
```json
{
    "success" : false,
    "message" : "string"
}
```
### Responses : status `500`
```json
{
    "success" : false,
    "message" : "string"
}
```
---------

# socket.io
##### Request
>|event | body | 
>| :--:| :---|
>| `orders`| `{customer : <string>, status : <string>, invoice : <string>, ..., orders:<MENUORDERS[]> }`| 
>| `update-order`| `{id : <>string, data : {customer : <string>, status : <string>, invoice : <string>, ..., orders:<MENUORDERS[]> }}`| 