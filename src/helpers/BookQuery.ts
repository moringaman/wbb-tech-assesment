const fs = require('fs')
import * as path from 'path'
// import * as fs from 'fs'

export default class BookQuery {
  bookArray: string[]
  name: string
  dictionary:any
  book: string 
  
  constructor(name: string) {
    this.book = "../../data/oliver-twist.txt"
    this.name = name
    this.bookArray = []
    this.dictionary = {}
  }

  readBook() :Promise<string[]>{
    let self = this
    return new Promise((resolve, reject) =>{
      fs.readFile(path.join(__dirname, this.book), 'utf8', function (error:{}, data:string) {
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