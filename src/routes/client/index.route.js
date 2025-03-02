import { Router } from 'express'
import userRoute from './user.route'
import needHelp from './need-help.route'
import rescueHub from './rescue-hub.route'
const clientRoute = Router()

clientRoute.use('/user', userRoute)
clientRoute.use('/need-help', needHelp)
clientRoute.use('/rescue-hub', rescueHub)
export default clientRoute
