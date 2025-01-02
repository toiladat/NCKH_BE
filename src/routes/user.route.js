import { Router } from 'express'
import { login, register, updateProfile } from '~/controllers/user.controller'
import authUser from '~/middlewares/auth.middleware'

const userRoute=Router()

userRoute.post('/register', register)
userRoute.post('/login', login)
userRoute.patch('/updateProfile', authUser, updateProfile)
export default userRoute