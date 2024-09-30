import { Router } from 'express'

import { endpoint } from '@/middlewares'

import { createUserController } from './createUser/controller'
import { termsMiddleware } from '../../middlewares/termsMiddlewares'

const router = Router()

router.post('/register', termsMiddleware, endpoint(createUserController))

export default router
