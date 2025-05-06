import { Router } from 'express'
import { evaluateInfor, evaluateLevel, getEvaluateLevel, login, patchEvaluateLevel, register, updateProfile } from '~/controllers/client/user.controller'
import authUser from '~/middlewares/auth.middleware'

const userRoute=Router()

userRoute.post('/register', register)
userRoute.post('/login', login)
userRoute.patch('/update-profile', authUser, updateProfile)
userRoute.patch('/evaluate-infor', authUser, evaluateInfor)
userRoute.get('/evaluate-level', authUser, getEvaluateLevel)
userRoute.patch('/evaluate-level', authUser, patchEvaluateLevel)

export default userRoute