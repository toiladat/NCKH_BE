import { Router } from 'express'
import { getAdmins } from '~/controllers/admin/admin.controller'
import authUser from '~/middlewares/auth.middleware'
const accountRoute=Router()

accountRoute.get('/get-admins', authUser, getAdmins)

export default accountRoute