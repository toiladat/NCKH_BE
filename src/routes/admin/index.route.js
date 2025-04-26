import { Router } from 'express'
import authRoute from './auth.route'
import userRoute from './user.route'
import neeHelpPointRoute from './needHelpPoint.route'
import accountRoute from './account.route'
import rescueHubPointRoute from './rescueHubPoint.route'


const adminRoute = Router()

adminRoute.use('/auth', authRoute)
adminRoute.use('/user', userRoute)
adminRoute.use('/need-help-point', neeHelpPointRoute)
adminRoute.use('/rescue-hub-point', rescueHubPointRoute)
adminRoute.use('/account', accountRoute)
export default adminRoute
