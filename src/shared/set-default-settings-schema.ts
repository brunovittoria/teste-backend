import { Model, ModelStatic } from 'sequelize'

export const setDefaultSettingsSchema = (model: ModelStatic<Model>) => {
  // Configurar getters virtuais, se necessário
  model.prototype.toJSON = function () {
    const attributes = { ...this.get() }

    // Excluir atributos sensíveis ou indesejados no JSON de resposta
    delete attributes.password // Ex: remove pwd do return JSON
    delete attributes.versionKey // Ex: Se houver uma chave de versão manual

    return attributes
  }

  // Adicionei getters virtuais
  Object.defineProperty(model.prototype, 'fullName', {
    get() {
      // ex de campo virtual: retornar 'nome completo' a partir de outros atributos
      return `${this.firstName} ${this.lastName}`
    }
  })
}
