import { Router } from 'express'
import { getRegions } from '~/controllers/admin/regions.controller'

const regionRoute=Router()

regionRoute.get('/', getRegions)

export default regionRoute