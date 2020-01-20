const fs = require('fs')

// read book and turn into array of words
// read names list into array of names
// go through the array of names and find how many times each name appears in book word array

// createWordArray function
// readBookFunction


class BookQuery {
  constructor(book, names) {
    this.book = book
    this.names = names
    this.bookArray = []
    this.namesArray = []
    this.dictionary = {}
    this.sortedData = []
  }

  readBook() {
    let self = this
    return new Promise((resolve, reject) => {
      fs.readFile(this.book, 'utf8', function (error, data) {
        if (error) {
          reject(error)
        }
        self.bookArray = data.split(/\r\n|\r|\n/).join(' ').split(/\W+/)
        resolve(self.bookArray)
      })
    })
  }

  readNames() {
    let self = this
    return new Promise((resolve, reject) => {
      fs.readFile(this.names, 'utf8', function (error, data) {
        if (error) reject(error)
        self.namesArray = data.split(/\r\n|\r|\n/).join(' ').split(/\W+/)
        resolve(self.namesArray)
      })
    })
  }

  wordSearch(name) {
    return new Promise((resolve, reject) => {
      for (let word of this.bookArray) {
        if (word === name) {
          if (!this.dictionary[word]) {
            this.dictionary[word] = 1
          } else {
            this.dictionary[word]++
          }
        }
      }
      resolve(this.dictionary)
    })
  }

  majorLoop() {
    return new Promise((resolve, reject) => {
      for (let name of this.namesArray) {
        this.wordSearch(name)
      }
      resolve(this.dictionary)
    })
  }

  sortResults() {
    var sortable = [];
    for (var name in this.dictionary) {
      sortable.push([name, this.dictionary[name]]);
    }
    sortable.sort((a,b) => b[1] - a[1])
    this.sortedData = sortable
  }
}



////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


async function runTasks() {
  console.time('Operation')
  const OliverTwist = new BookQuery('./data/oliver-twist.txt', './data/first-names.txt')
  await Promise.all([OliverTwist.readBook(), OliverTwist.readNames()])
  await OliverTwist.majorLoop()
  OliverTwist.sortResults()
  console.timeEnd('Operation')
  writeToFile(OliverTwist.sortedData)
}

function writeToFile(dataArray) {
  for (element of dataArray) {
      fs.appendFile('./data/results.text', element + '\r\n', (error) => {
          if (error) console.log(error)
      })
  }
}

runTasks()
