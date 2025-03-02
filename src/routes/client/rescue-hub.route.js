import { Router } from 'express'
import { createRescueHub, getRescueHubs } from '~/controllers/client/rescue-hub.controller'
import authUser from '~/middlewares/auth.middleware'
const rescueHub = Router()
rescueHub.post('/', authUser, createRescueHub)
rescueHub.get('/',getRescueHubs)
export default rescueHub