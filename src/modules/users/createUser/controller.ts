import { Request, Response } from 'express'

import { createUserService } from './service'

export const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body)

  return res.status(201).json(user)
}
