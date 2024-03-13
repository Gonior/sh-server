import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import userRoute from './routes/userRoutes'
import loginRoute from './routes/loginRoutes'
import categoryRoute from './routes/categoryRoutes'
import menuRoute from './routes/menuRoutes'
import orderRoute from './routes/orderRoutes'
import activityRoute from './routes/activityRoutes'
import storeInforRoute from './routes/storeInfoRoutes'
import tempRoute from './routes/tempRoutes'
import authenticationToken from './middleware/authToken'
import dbDefault from './utils/dbDefault'
import {envConfig} from './types/constant'
dotenv.config(envConfig)
const app = express()
try {
    dbDefault()
} catch (error) {
    console.log(error)
}
app.use(helmet())
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.status(200).json({success : true, message : "Berhasil terkoneksi dengan server"});
});

app.use('/login',loginRoute)
app.use('/user',authenticationToken, userRoute)
app.use('/category',authenticationToken, categoryRoute)
app.use('/menu',authenticationToken, menuRoute)
app.use('/activity',authenticationToken, activityRoute)
app.use('/order',authenticationToken, orderRoute)
app.use('/store',authenticationToken, storeInforRoute)
app.use('/temp', authenticationToken, tempRoute )
export default app


