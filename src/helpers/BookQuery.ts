const fs = require('fs')

export default class BookQuery {
  bookArray: string[]
  name: string
  // dictionary:{[count:number]:number, name:string}
  dictionary:any
  book: string
  
  constructor(book: string, name: string) {
    this.book = book
    this.name = name
    this.bookArray = []
    this.dictionary = {}
  }

  readBook() :Promise<string[]>{
    let self = this
    return new Promise((resolve, reject) =>{
      fs.readFile(this.book, 'utf8', function (error:{}, data:string) {
        if (error) reject(error)
        self.bookArray = data.split(/\r\n|\r|\n/).join(' ').split(/\W+/)
        resolve(self.bookArray)
      })
    })
  }


  wordSearch() :Promise<string> {
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
}