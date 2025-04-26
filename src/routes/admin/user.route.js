import { Router } from 'express'
import { getUsers, getUsersByMonth } from '~/controllers/admin/user.controller'
import authUser from '~/middlewares/auth.middleware'
const userRoute=Router()

userRoute.get('/get-user-by-month', authUser, getUsersByMonth)
userRoute.get('/get-users', authUser, getUsers)

export default userRoute