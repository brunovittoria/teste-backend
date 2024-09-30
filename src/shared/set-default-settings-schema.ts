import { Model, ModelStatic } from 'sequelize'

export const setDefaultSettingsSchema = (model: ModelStatic<Model>) => {
  model.prototype.toJSON = function () {
    const attributes = { ...this.get() }

    delete attributes.password
    delete attributes.versionKey

    return attributes
  }

  Object.defineProperty(model.prototype, 'fullName', {
    get() {
      return `${this.firstName} ${this.lastName}`
    }
  })
}
