import * as dotenv from 'dotenv'
import validateEnv from '@/utils/validateEnv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

dotenv.config()
validateEnv()
const app = express()
console.log(process.env)
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

export default app
