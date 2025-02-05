import { Router } from 'express'
import userRoute from './user.route'
import needHelp from './need-help.route'
const clientRoute = Router()

clientRoute.use('/user', userRoute)
clientRoute.use('/need-help', needHelp)
export default clientRoute
