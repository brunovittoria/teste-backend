import { Router } from 'express'

import { endpoint } from '@/middlewares'

import { createUserController } from './createUser/controller'

const router = Router()

router.post('/', endpoint(createUserController))

export default router
