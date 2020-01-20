import {Request, Response} from 'express'
import BookQuery from '../helpers/BookQuery'

const nameController = async(req: Request, res: Response) => {
  let nameGiven:string = req.query.name
  const bookQuery:any = new BookQuery(nameGiven)
  const name: string = await bookQuery.getNameOccurances()
  res.send(name)
}

export default nameController