import express, { Application, Request, Response, NextFunction} from 'express'

const server: Application = express()
const port = process.env.PORT || 3000

server.get('/', (req: Request, res:Response, next: NextFunction) => {
  res.send('Hello there')
})

server.listen(port, () => {
  console.log("server up on port: ", port)
})