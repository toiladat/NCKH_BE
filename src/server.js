import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import roomRoute from './routes/room.route'
import { connect } from './config/mongodb'
import userRoute from './routes/user.route'

dotenv.config()

const port = process.env.PORT || 5000
const app = express()

// mac dinh khi chuyen data qua api la dang json ??
// chuyen json tu fe thanh js ben be luon nen khi nhan req.body la js luon
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded dùng để post từ form
app.use(bodyParser.urlencoded({ extended: false }))


const corsOptions = {
  origin: process.env.CLIENT_URL, // Chỉ định client có thể truy cập
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Các phương thức được phép
  allowedHeaders: ['Content-Type', 'Authorization'] // Các headers được phép
}
app.use(cors(corsOptions))


app.use(express.json({
  limit:'10mb'
}))

//Route
app.use('/room', roomRoute)

app.use('/user', userRoute)

app.get('/', (req, res) => res.json({
  message:'Welcome to our API'
}))

app.use((req, res) => res.status(404).json({
  success:false,
  message:'Not Found'
}))

//End Route


const startServer = async () => {
  try {
    // connect to MongoDB
    await connect()
    app.listen(port, () => console.log(`Server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
startServer()