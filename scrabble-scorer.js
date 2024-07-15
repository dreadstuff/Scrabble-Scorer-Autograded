// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   //let word = ''; //declare word 
   //word = input.question("Let's play some scrabble! Enter a word:"); //added input.question instead of console.log to take input data from user
   //return word; //returning word for initializing with oldscrabblescorer function
   console.log("Let's play some scrabble!");
   let word = input.question("Enter a word to get a score: ")
   return word;
};

let newPointStructure = transform(oldPointStructure); //setting to transform(oldPointStructure) based on assignment instructions

let simpleScorer = function (word){ //declaring simpleScorer with anonymous function + word parameter
   return word.length; //return the length of word (number of chars)
}

let vowelBonusScorer = function (word) { //declaring vowerlBonusScorer - with anonymous function + word parameter
   let score = 0; //initializes variable to 0/zero score, variable for totalling score of word
   word = word.toLowerCase(); //converting word to lowercase (upper could work too I think?)
   for (let i = 0; i < word.length; i++) { //looping through characters
      if ("aeiou".includes(word[i])) { //checks if word contains aeiou in string - .include method + word[i]
         score += 3; //add three points if containing aeiou
      } else { 
         score += 1; //add one point if not containing aeiou
      }
   }
   return score; //return total score after loop finishes interating through word's characters
}

let scrabbleScorer = function (word) { //declare scrabbleScorer function with parameter "word"
   let score = 0; //initialize score to 0 - holder for total score
   word = word.toLowerCase(); //convert the input word to lower case
   for(let i = 0; i < word.length; i++) { //loop through each character in word from 0 or i=0 to length of word
      score += Number(newPointStructure[word[i]]); //setting the score variable, += for adding values, number type conversion to convert value from newpointstructure, word[i] to find letter within word at index of i, which is zero
   }
   return score; //sets the score for later pull
}

const scoringAlgorithms = [ //decale constant variable "scoringAlgorithms" using [] for an array assignment
   { name: "Simple Score", description: "Each letter is worth 1 point.", scorerFunction: simpleScorer }, //Simple Score, three keys name/description/scorerFunction
   { name: "Bonus Vowels", description: "Vowels are 3 pts, consonants are 1 pt.", scorerFunction: vowelBonusScorer }, //Bonus Vowels, three keys name/description/scorerFunction
   { name: "Scrabble", description: "The traditional scoring algorithm.", scorerFunction: scrabbleScorer} //Scrabble, three keys name/description/scorerFunction
];

function scorerPrompt() {
   console.log("Select a scoring algorithm that you would like to use!");
   console.log("0 - Output a score using the Simple Scorer (1 point per character)");
   console.log("1 - Use the Vowel bonus scoring function (3 points per vowel)");
   console.log("2 - Use the Scrabble Scoring option (Default Scabble)");
   let choice = input.question("Enter 0, 1, or 2: "); //local declaring choice, providing question, then returning to constant function scoringAlgorithms
   //bonus mission to not accept other choices tbd here or original question function

   return scoringAlgorithms[choice];
}

function transform(oldStructure) { //defining transform function with parameter for oldStructure
   let newPointStructure = {}; //initializing an empty object as newStructure
   for (let pointValue in oldStructure) { //loops over each key for pointValue in oldStructure object, open bracket for loop/next loop
     for (let letter of oldStructure[pointValue]) { //inner loop, iterates through each letter with current pointValue
       newPointStructure[letter.toLowerCase()] = Number(pointValue); //maps letters in lowercase to point value in new structure/sets = to pointValue for output points
     }
   }
   return newPointStructure; //returns value for letters to point values
 }
 

function runProgram() {
   let word = initialPrompt(); //prompting usr from intialprompt function after index is ran
   let scoringAlgorithms = scorerPrompt(); //declaring scoringAlgorithms locally within function, setting to scorerPrompt function (type of game in this case)
   let score = scoringAlgorithms.scorerFunction(word); //declaring score locally within function, setting to scorerFunction(word) value within scoringAlgorithms key
   console.log(`Score for word ${word} using ${scoringAlgorithms.name}: ${score}`); //literal for 
} 

//Bonus mission (Code with Carrie) to play again on loop
//function playAgain() {
//   let playAgain;

//}

   //let letterPoints = oldScrabbleScorer(word); //call oldscrabblescorer function to grade the letters 
   //console.log(letterPoints); //logging the results for letterpoints from oldscrabblescorer
//}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
