import { Router } from 'express'
import { login, register } from '~/controllers/user.controller'

const userRoute=Router()

userRoute.post('/register', register)
userRoute.post('/login', login)
export default userRoute