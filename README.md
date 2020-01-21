# We Build Bots Technical Assessment

## Introduction

This repo contains two parts of a technical assessment which can be run via the npm scripts outlined in the package.json file.

### Part 1

Part1 of the assessment is written in javascript and calculates how many times each name within ./data/first-names.txt appears in the file ./data/oliver-twist.txt. The results of which are written to a text file called results.txt as key value pairs.

### Part 2 

Part 2 of the assessment is a simple express server API exposing a single endpoint
called /name-count which responds by providing the amount of occurances of any given name (as a url parameter) in the text file ./data/oliver-twist.txt. This part of the assesment is written in typescript.

### Installation

Install the required dependancies by running `npm i` in root of this project

### Operation

#### Part1

To run part 1 of the assessment use command `npm run part1` and check file ./data/results.txt for the output

#### Part 2

*. Run the API server in part 2 of the assessment by running `npm build` followed by `npm start` 
*. To test enter url http://localhost:3000/name-count?name=name-choice in the browser as a search term
