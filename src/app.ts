import express, { Application, Request, Response, NextFunction, response} from 'express'
import nameController from './controllers/nameController'

const app: Application = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res:Response ) => {
  res.send('Welcome to the Oliver Name Counter API')
})

app.get('/name-count', nameController)

app.listen(port, () => {
  console.log("server up on port: ", port)
})