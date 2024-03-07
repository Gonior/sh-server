import * as dotenv from 'dotenv'
dotenv.config()
import { validateEnv } from './utils'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import userRoute from './routes/userRoutes'
import loginRoute from './routes/loginRoutes'
import categoryRoute from './routes/categoryRoutes'
import menuRoute from './routes/menuRoutes'
import orderRoute from './routes/orderRoutes'
import activityRoute from './routes/activityRoutes'
import authenticationToken from './middleware/authToken'
const app = express()

validateEnv()

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
app.use('/acitivity',authenticationToken, activityRoute)
app.use('/order',authenticationToken, orderRoute)

export default app


