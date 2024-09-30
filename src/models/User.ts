import { DataTypes, Model } from 'sequelize'
import { z } from 'zod'
import { weFitDbSequelize, setDefaultSettingsSchema } from '@/shared'
import { collectionsData } from '@/config'

const userPermissions = ['user', 'admin'] as const

export const UserSchema = z.object({
  name: z.string(),
  permissions: z.enum(userPermissions),
  cnpj: z.string().nullable().optional(),
  cpf: z.string().optional(),
  email: z.string().email(),
  confirmEmail: z.string().email(),
  celular: z.string().optional(),
  telefone: z.string().optional(),
  cep: z.string(),
  logradouro: z.string(),
  numero: z.string(),
  complemento: z.string().optional(),
  cidade: z.string(),
  bairro: z.string(),
  estado: z.string(),
  termsAccepted: z.boolean() // validacao do termo de uso
})

export type IUser = z.infer<typeof UserSchema> // Definicao do type do user do ZOD

// Crieando o modelo do sequelize para a table "User"
export class User extends Model<IUser> {
  declare id: number
  declare name: string
  declare permissions: (typeof userPermissions)[number]
  declare cnpj?: string | null
  declare cpf?: string | null
  declare email: string
  declare celular?: string
  declare telefone?: string
  declare cep: string
  declare logradouro: string
  declare numero: string
  declare complemento?: string
  declare cidade: string
  declare bairro: string
  declare estado: string
  declare termsAccepted: boolean

  // Getter virtual para retornar o nome completo, por exemplo
  get fullName(): string {
    return `${this.name}` // Exemplo simples para retornar o nome como "nome completo"
  }
}

// iniciando o model com sequelize
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    confirmEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: true
    },
    permissions: {
      type: DataTypes.ENUM(...userPermissions),
      allowNull: false,
      defaultValue: 'user'
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    termsAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize: weFitDbSequelize,
    tableName: collectionsData.User.collection,
    timestamps: true
  }
)

// Aplicando as config padrão ao model user
setDefaultSettingsSchema(User)
