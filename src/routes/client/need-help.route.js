import { Router } from 'express'
import { createNeedHelp, getNeedHelps } from '~/controllers/client/need-help.controller'
import authUser from '~/middlewares/auth.middleware'
const needHelp = Router()
needHelp.post('/', authUser, createNeedHelp)
needHelp.get('/', getNeedHelps)
export default needHelp