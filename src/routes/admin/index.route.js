import { Router } from 'express'

const adminRoute = Router()

adminRoute.get( '/', (req, res) => {
  res.json({
    message: 'admin'
  })
})
export default adminRoute