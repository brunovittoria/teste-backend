import { HTTPError } from '@/errors'
import { IUser, User, UserSchema } from '@/models/User'

export const createUserService = async (data: IUser) => {
  const {
    name,
    email,
    confirmEmail,
    cnpj,
    cpf,
    permissions,
    celular,
    telefone,
    cep,
    logradouro,
    numero,
    complemento,
    cidade,
    bairro,
    estado,
    termsAccepted
  } = UserSchema.parse(data)

  if (email !== confirmEmail) {
    throw new HTTPError('Emails do not match', 400)
  }

  if (!termsAccepted) {
    throw new HTTPError('You must accept the terms of service', 400)
  }

  const emailExists = await User.findOne({ where: { email } })
  if (emailExists) {
    throw new HTTPError('Email already registered', 409)
  }

  const identifierExists = await User.findOne({ where: { [cnpj ? 'cnpj' : 'cpf']: cnpj || cpf } })
  if (identifierExists) {
    throw new HTTPError(`${cnpj ? 'CNPJ' : 'CPF'} already registered`, 409)
  }

  const user = await User.create({
    name,
    email,
    confirmEmail,
    cnpj,
    cpf,
    permissions,
    celular,
    telefone,
    cep,
    logradouro,
    numero,
    complemento,
    cidade,
    bairro,
    estado,
    termsAccepted
  })
  return user
}
