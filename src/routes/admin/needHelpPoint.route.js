import { Router } from 'express'
import { getNeedHelpPointByMonth, getNeedHelpPoints } from '~/controllers/admin/needHelpPoint.controller'
import authUser from '~/middlewares/auth.middleware'
const neeHelpPointRoute=Router()

neeHelpPointRoute.get('/get-need-help-points', authUser, getNeedHelpPoints )
neeHelpPointRoute.get('/get-need-help-points-by-month', authUser, getNeedHelpPointByMonth )

export default neeHelpPointRoute