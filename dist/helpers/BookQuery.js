"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = __importStar(require("path"));
// import * as fs from 'fs'
class BookQuery {
    constructor(name) {
        this.book = "../../data/oliver-twist.txt";
        this.name = name;
        this.bookArray = [];
        this.dictionary = {};
    }
    readBook() {
        let self = this;
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, this.book), 'utf8', function (error, data) {
                if (error)
                    reject(error);
                self.bookArray = data.split(/\r\n|\r|\n/).join(' ').split(/\W+/);
                resolve(self.bookArray);
            });
        });
    }
    nameSearch() {
        let self = this;
        return new Promise((resolve, reject) => {
            for (let word of this.bookArray) {
                if (word === this.name) {
                    if (!this.dictionary[word]) {
                        this.dictionary[word] = 1;
                    }
                    else {
                        this.dictionary[word]++;
                    }
                }
            }
            resolve(self.dictionary);
        });
    }
    getNameOccurances() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readBook();
            yield this.nameSearch();
            return this.dictionary;
        });
    }
}
exports.default = BookQuery;
