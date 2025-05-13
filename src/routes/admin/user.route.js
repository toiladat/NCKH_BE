import { Router } from 'express'
import { createUser, getUsers, getUsersByMonth, updateUser } from '~/controllers/admin/user.controller'
import authUser from '~/middlewares/auth.middleware'
const userRoute=Router()

userRoute.get('/get-user-by-month', authUser, getUsersByMonth)
userRoute.get('/get-users', authUser, getUsers)
userRoute.post('/create-user', authUser, createUser)
userRoute.patch('/update-user', authUser, updateUser )
export default userRoute