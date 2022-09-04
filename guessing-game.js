/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
const winningNumber = Math.ceil(Math.random() * 100);
let pastGuesses = document.getElementById("guesses")
let title = document.getElementById('title');
const hintButton = document.getElementById('help');
let message = document.getElementById('message');
const button = document.getElementById('submit');
let hints = document.getElementsByClassName('hint');
let listGuesses = document.getElementsByClassName('past_guesses');
const resetGameButton = document.getElementById('reset1');
const game = document.getElementsByClassName('resetTime');
let counter = 0;
button.onclick = function(){
    let guessNumber = document.getElementById('guessBox').value;
    document.getElementById('guessBox').value = "";
    hintReset();
    const temp = tempCheck(winningNumber, guessNumber);
    if(isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100){
        alert("Please choose a number from 1 to 100.");
        return;
    }
    for(let i = 0; i < listGuesses.length; i++){
        if(guessNumber == listGuesses[i].innerText){
            message.innerText = "You guessed that already, try again!"
            return;
        }
    }
    listGuesses[counter].innerText = guessNumber;
    tempChange(temp);
    if(guessNumber == winningNumber){
        message.innerText = `Wow. You actually guessed it! ${guessNumber} was the winning number!!`;
        document.getElementById("guessBox").placeholder = "You Win!"
        document.getElementById('guessBox').disabled = true;
    } else if(guessNumber < winningNumber){
        message.innerText = temp + "Try guessing a number higher than " + guessNumber;
        document.getElementById("guessBox").placeholder = `Guess ${guessNumber}-100`
    } else if(guessNumber > winningNumber){
        message.innerHTML = temp + "Try guessing a number less than " + guessNumber;
        document.getElementById("guessBox").placeholder = `Guess 1-${guessNumber}`
    }
    counter++;
    if(counter === 5 && guessNumber != winningNumber){
        document.getElementById('guessBox').disabled = true;
        message.innerText = "Sorry! You lost! Reset to play again!";
        document.getElementById("guessBox").placeholder = "Reset";
    } 
    
}
hintButton.onclick = function() {
    message.innerText = "The winning Number is one of these.";
    rightHint = Math.floor(Math.random() * hints.length)
    for(let i = 0; i < hints.length; i++){
        hints[i].style.backgroundColor = 'white';
        hints[i].style.border = "2px solid black";
    let hintNum = Math.ceil(Math.random() * 100)
    if(rightHint == i){
        hints[i].innerText = winningNumber
    } else
        hints[i].innerText = hintNum;
    }
}
function tempCheck(target, num){
    if(Math.abs(target - num) < 10){
        return "You're close! "
    } else if(Math.abs(target - num) < 20){
        return "You're kinda close! "
    } else {
        return "You're not that close..."
    }
}
function tempChange(string){
    if(string === "You're close! "){
        listGuesses[counter].style.boxShadow = "0 2px 10px 2px red"
    } else if(string === "You're kinda close! "){
        listGuesses[counter].style.boxShadow = "0 2px 10px 2px orange"
    } else {
        listGuesses[counter].style.boxShadow = "0 2px 10px 2px blue"
    }
}
function hintReset(){
    for(let i = 0; i < hints.length; i++){
        hints[i].innerText = "";
        hints[i].style.backgroundColor = 'initial';
        hints[i].style.border = "initial";
    }
}
resetGameButton.onclick = function(){
    message.innerText = "New Round!";
    document.getElementById("guessBox").placeholder = "Next try! 1-100 ";
    document.getElementById('guessBox').disabled = false;
    counter = 0;
    hintReset();
    for(let i = 0; i < listGuesses.length; i++){
        listGuesses[i].innerText = "?";
        listGuesses[i].style.boxShadow = "initial";
    }
};

