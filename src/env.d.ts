import { number, string } from 'zod'

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // string(development | production), example: development
      NODE_ENV: 'development' | 'production'

      MYSQLDB_PASSWORD: string

      MYSQLDB_PORT: number

      SERVER_PORT: number

      MYSQLDB_DATABASE: string
    }
  }
}
