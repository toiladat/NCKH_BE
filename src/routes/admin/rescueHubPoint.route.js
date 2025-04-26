import { Router } from 'express'
import { getRescueHubPoints, getRescueHubPointsByMonth } from '~/controllers/admin/rescueHubPoint.controller'
import authUser from '~/middlewares/auth.middleware'
const rescueHubPointRoute=Router()

rescueHubPointRoute.get('/get-rescue-hub-points', authUser, getRescueHubPoints )
rescueHubPointRoute.get('/get-rescue-hub-points-by-month',authUser, getRescueHubPointsByMonth )

export default rescueHubPointRoute