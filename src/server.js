import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import roomRoute from './routes/room.route'

dotenv.config()

const port = process.env.PORT || 5000
const app = express()

const corsOptions = {
  origin: process.env.CLIENT_URL, // Chỉ định client có thể truy cập
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức được phép
  allowedHeaders: ['Content-Type', 'Authorization'] // Các headers được phép
}
app.use(cors(corsOptions))


app.use(express.json({
  limit:'10mb'
}))


app.use('/room', roomRoute)

app.use('/', (req, res) => res.json({
  message:'Welcome to our API'
}))

app.use((req, res) => res.status(404).json({
  success:false,
  message:'Not Found'
}))

const startServer = async () => {
  try {
    // connect to MongoDB
    app.listen(port, () => console.log(`Server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
startServer()