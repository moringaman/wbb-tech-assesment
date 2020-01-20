const fs = require('fs')
import * as path from 'path'

export default class BookQuery {
  bookArray: string[]
  dictionary:any
  protected _book: string = "../../data/oliver-twist.txt" 
  
  constructor(public name: string) {
    this.name = name
    this.bookArray = []
    this.dictionary = {}
  }
// Gettter gives option to find out what book we are using
  get book() {
    return this._book 
  }
// Setter allows for changing reference book
  set book(value:string) {
    this._book = value
  }

  readBook() :Promise<string[]>{
    let self = this
    return new Promise((resolve, reject) =>{
      fs.readFile(path.join(__dirname, this._book), 'utf8', function (error:{}, data:string) {
        if (error) reject(error)
        self.bookArray = data.split(/\r\n|\r|\n/).join(' ').split(/\W+/)
        resolve(self.bookArray)
      })
    })
  }


  nameSearch() :Promise<string> {
    let self = this
      return new Promise((resolve, reject) => {
        for(let word of this.bookArray) {
          if(word === this.name) {
            if(!this.dictionary[word]) {
              this.dictionary[word] = 1
            } else {
              this.dictionary[word]++
            }
          }
        }
        resolve(self.dictionary)
      })
  }

  async getNameOccurances() {
    await this.readBook()
    await this.nameSearch()
    return this.dictionary
  }
}