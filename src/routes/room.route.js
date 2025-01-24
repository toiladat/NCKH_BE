import { Router } from 'express'
import { createRoom, getRooms } from '~/controllers/room.controller'
import authUser from '~/middlewares/auth.middleware'
const roomRoute = Router()
roomRoute.post('/', authUser, createRoom)
roomRoute.get('/', getRooms)
export default roomRoute