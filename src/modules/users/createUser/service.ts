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

  console.log('DATA:', data)

  // Valida se os emails coincidem
  if (email !== confirmEmail) {
    throw new HTTPError('Emails do not match', 400)
  }

  // Verifica se o usuário aceitou os termos de uso
  if (!termsAccepted) {
    throw new HTTPError('You must accept the terms of service', 400)
  }

  // Verifica se o e-mail já existe
  const emailExists = await User.findOne({ where: { email } })
  if (emailExists) {
    throw new HTTPError('Email already registered', 409)
  }

  // Verifica se o CPF ou CNPJ já existe
  const identifierExists = await User.findOne({ where: { [cnpj ? 'cnpj' : 'cpf']: cnpj || cpf } })
  if (identifierExists) {
    throw new HTTPError(`${cnpj ? 'CNPJ' : 'CPF'} already registered`, 409)
  }

  // Criação do usuário
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
