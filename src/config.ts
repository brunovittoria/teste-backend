export const HOST_API = process.env.HOST_API || ''

export const MONGO_URL = process.env.MONGO_URI || ''

export const MYSQLDB_PASSWORD = process.env.MYSQLDB_PASSWORD || ''

export const MYSQLDB_PORT = process.env.MYSQLDB_PORT || ''

export const MYSQLDB_DATABASE = process.env.MYSQLDB_DATABASE || ''

export const collectionsData = {
  KanbanTask: {
    name: 'KanbanTask',
    collection: 'kanban_tasks'
  },
  KanbanBoard: {
    name: 'KanbanBoard',
    collection: 'kanban_boards'
  },
  KanbanColumn: {
    name: 'KanbanColumn',
    collection: 'kanban_columns'
  },
  KanbanHistory: {
    name: 'KanbanHistory',
    collection: 'histories_models'
  },
  Notifications: {
    name: 'Notifications',
    collection: 'notifications'
  },
  User: {
    name: 'User',
    collection: 'users'
  }
}
