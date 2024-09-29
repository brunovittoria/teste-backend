import app from './app'

const port = process.env.PORT

try {
  app.listen(port, () => console.log(`Application running on port ${port}`))
} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error)
}
