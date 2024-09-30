import type { RequestHandler } from 'express'

export const termsMiddleware: RequestHandler = (req, res, next) => {
  const { termsAccepted } = req.body

  if (termsAccepted) {
    return next()
  }

  return res.status(400).json({ message: 'You must accept the terms of service.' })
}
