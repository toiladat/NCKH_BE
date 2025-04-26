import { Router } from 'express'
import { evaluateInfor, login, register, updateProfile } from '~/controllers/client/user.controller'
import authUser from '~/middlewares/auth.middleware'

const userRoute=Router()

userRoute.post('/register', register)
userRoute.post('/login', login)
userRoute.patch('/updateProfile', authUser, updateProfile)
userRoute.patch('/evaluate-infor', authUser, evaluateInfor)
export default userRoute