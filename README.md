# List Endpoint

### Login
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :----:   |
>| `POST`|`/login`|`{ pasccode : <string> }`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <USER>, token : <JWTTOKEN>}`| 
>| `400`|`{ success : false, message : <string>}`| 
>| `500`|`{ success : false, message : <string>}`| 
------------------------------------------------------------------------------------------
### User
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :----:   |
>| `GET`|`/user`|N/A| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <USER[]> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :---   |
>| `POST`|`/user`| `{data : { name : <string>, passcode : <string>}}`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <USER> }`| 
>| `400`|`{ success : false , messsage : <string> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :---   |
>| `DELETE`|`/user`| `{ id : <string>}`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , message : <string> }`| 
>| `400`|`{ success : false , messsage : <string> }`| 
>| `500`|`{ success : false, message : <string>}`| 
------------------------------------------------------------------------------------------
### Category
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :----:   |
>| `GET`|`/category`|N/A| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <CATEGORY[]> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :---   |
>| `POST`|`/category`| `{data : { name : <string>, printer : <string> \| <Printer> \| undefined}}`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <CATEGORY> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :---   |
>| `PATCH`|`/category`| `{id : <string>, {data : { name : <string>, printer : <string> \| <Printer> \| undefined}}}`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <CATEGORY> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :---   |
>| `DELETE`|`/category`| `{ id : <string>}`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , message : <string> }`| 
>| `400`|`{ success : false , messsage : <string> }`| 
>| `500`|`{ success : false, message : <string>}`| 
------------------------------------------------------------------------------------------
### Menu
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :----:   |
>| `GET`|`/menu`|N/A| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <MENU[]> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :---   |
>| `POST`|`/menu`| `{data : { name : <string>, category : <string>, upc : <number>, price : <number>}`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <MENU> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :---   |
>| `PATCH`|`/menu`| `{id : <string>, {data : { name : <string>, category : <string>, upc : <number>, price : <number>}}}`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <MENU> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :---   |
>| `DELETE`|`/menu`| `{ id : <string>}`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , message : <string> }`| 
>| `400`|`{ success : false , messsage : <string> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <MENU> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :---   |
>| `POST`|`/menu/search`| `{ <key> : <value>}`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , dara : <MENU[]> }`| 
>| `400`|`{ success : false , messsage : <string> }`| 
>| `500`|`{ success : false, message : <string>}`| 
-----------------------
### Activity
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :----:   |
>| `POST`|`/activity`| `{orderId : <string> }`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <ACTIVITY[]> }`| 
>| `500`|`{ success : false, message : <string>}`| 
-----------
### Activity
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :----:   |
>| `POST`|`/activity`| `{orderId : <string> }`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <ACTIVITY[]> }`| 
>| `500`|`{ success : false, message : <string>}`| 
-----------
### Order
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :----:   |
>| `POST`|`/order`| `{today : <DATESTRING> }`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <ORDER[]> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :---   |
>| `PATCH`|`/order`| `{id : <string>, {data : { invoice : <string>, customer:<string>, status : <string>, ..., orders :MENUORDERS[]}}}`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <ORDER[]> }`| 
>| `400`|`{ success : false , message : <string> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :----:   |
>| `POST`|`/order/id`| `{ membersId: <string[]> }`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <MENU> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :----:   |
>| `POST`|`/order/batchStatus`| `{status : <string>, arrayId : <string[]> }`| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <ORDER[]> }`| 
>| `400`|`{ success : false, message : <string>}`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :----:   |
>| `get`|`/order/last`| N/A| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <ORDER[]> }`| 
>| `500`|`{ success : false, message : <string>}`| 
##### Request
>|method| Endpoint | body | 
>| :--:|:---:|    :----:   |
>| `get`|`/order/notPaid`| N/A| 
##### Responses
>|status| respones | 
>| :--:|:---|
>| `200`|`{ success : true , data : <ORDER[]> }`| 
>| `500`|`{ success : false, message : <string>}`| 
-----------

# socket.io
##### Request
>|event | body | 
>| :--:| :---|
>| `orders`| `{customer : <string>, status : <string>, invoice : <string>, ..., orders:<MENUORDERS[]> }`| 
>| `update-order`| `{id : <>string, data : {customer : <string>, status : <string>, invoice : <string>, ..., orders:<MENUORDERS[]> }}`| 