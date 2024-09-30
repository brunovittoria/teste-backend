import { HTTPError } from '@/errors'
import { IUser, User, UserSchema } from '@/models/User'

export const createUserService = async (data: IUser) => {
  //valda dados de entrada usando o Zodschema
  const { name, permissions } = UserSchema.parse(data)

  const existingUser = await User.findOne({ where: { name } })
  if (existingUser) {
    throw new HTTPError('User already exists', 409)
  }

  // Cria o new usuario
  const user = await User.create({ name, permissions }).catch(() => {
    throw new HTTPError('Failed to create user', 500)
  })

  return user // Retorna o usuário criado
}
