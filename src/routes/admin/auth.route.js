import { Router } from 'express'
import { loginPost, registerPost } from '~/controllers/admin/auth.controller'

const authRoute=Router()

authRoute.post('/login', loginPost )
authRoute.post('/register', registerPost )

export default authRoute