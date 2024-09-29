import { DataTypes, Model } from 'sequelize'
import { z } from 'zod'

import { weFitDbSequelize, setDefaultSettingsSchema } from '@/shared'
import { collectionsData } from '@/config'

const userPermissions = ['user', 'admin'] as const

export const UserSchema = z.object({
  name: z.string(),
  permissions: z.enum(userPermissions)
})

export type IUser = z.infer<typeof UserSchema> // Definicao do type do user do ZOD

// Crieando o modelo do sequelize para a table "User"
export class User extends Model<IUser> {
  declare id: number
  declare name: string
  declare permissions: (typeof userPermissions)[number]

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
    permissions: {
      type: DataTypes.ENUM(...userPermissions),
      defaultValue: 'user'
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
