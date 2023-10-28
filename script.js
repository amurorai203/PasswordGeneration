// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];


// Define varaibles to be used
var pickedGenType = [];
var lengthOfPassword = 8;
var promptMsg = ["Length of Password(8-128): (Q to quit) ", 
                "Include Lowercase? (Q to quit) ", 
                "Include Uppercase? (Q to quit) ", 
                "Include Numeric? (Q to quit)", 
                "Include Special characters? (Q to quit)"];


// Function to prompt user for password options
function getPasswordOptions() {
  var resultPrompt;
  var processString;
  var canPass = false;

  // Loop to prompt user selection
  for (let i=0; i < 5; i++){
    canPass = false;
    while(!canPass){
      resultPrompt = prompt(promptMsg[i]);
      processString = resultPrompt.toUpperCase();
      // If user selection is Q, exit program
      if (processString === "Q"){
        i = 5;
        break;
      }
      // Assign password length
      if (i == 0) {
        var inputLength = parseInt(processString);
        if (inputLength >= 8 && inputLength <= 128){
          lengthOfPassword = inputLength;
          canPass = true;
        }
      }  else {
        if (processString === "Y" || processString === "N"){
          if (processString === "Y"){
            //Assign array selection for password generation
            switch (i){
              case 1:
                includeLowerCase = processString;
                pickedGenType.push("includeLowerCase");
                break;
              case 2:
                includeUppercase = processString;
                pickedGenType.push("includeUpperCase");
                break;
              case 3:
                includeNumeric = processString;
                pickedGenType.push("includeNumeric");
                break;
              default:
                includeSpecialChar = processString;
                pickedGenType.push("includeSpecialChar");
            }
          }
          canPass = true;
          // Make sure at least one character type is seleceted
          if (processString === "N" && i == 4 && pickedGenType.length == 0){
            alert("Try again! You selected with no character type.");
            canPass = false;
          }
        }
      }
    }
  }
}

function pickArray(){
  var returnArray;
  var indexArray = Math.floor(Math.random() * pickedGenType.length);
  returnArray = pickedGenType[indexArray];
  
  // Pass corresponding selected array for password generation
  switch (returnArray){
    case "includeLowerCase":
      returnArray = lowerCasedCharacters;
      break;
    case "includeUpperCase":
      returnArray = upperCasedCharacters;
      break;
    case "includeNumeric":
      returnArray = numericCharacters;
      break;
    default:
      returnArray = specialCharacters;
  }
  // console.log(returnArray);
  return returnArray;
}

// Function for getting a random element from an array
function getRandom(arr) {
  var resultString = "";
  var indexRandom = 0;
  resultString = Object.values(arr);
  indexRandom = Math.floor(Math.random() * resultString.length) + 1;
  // console.log(resultString[indexRandom - 1]);
  return resultString[indexRandom - 1];
}

// Function to generate password with user input
function generatePassword() {
  var returnPassword = "";
  // Get user input of password generation options
  getPasswordOptions();
  // console.log(pickedGenType);
  // Generate password using selected password generation options
  if (pickedGenType.length > 0){
    for (let i=0; i< lengthOfPassword; i++){
      returnPassword = returnPassword + getRandom(pickArray());
    }
  }
  return returnPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  pickedGenType = [];
  lengthOfPassword = 8;
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);