import { Router } from 'express'
import { createRoom } from '~/controllers/room.controller'
import authUser from '~/middlewares/auth.middleware'
const roomRoute = Router()
roomRoute.post('/', authUser, createRoom)
export default roomRoute