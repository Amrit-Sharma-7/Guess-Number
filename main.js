let randomNumber = parseInt((Math.random()*100+1));

const submit = document.querySelector('.submitButton');
const inputField = document.querySelector('#inputGuess');
const previousGuesses = document.querySelector('#previousGuesses');
const remainingGuesses = document.querySelector('#remainingGuesses');
const lowOrHigh = document.querySelector('.lowOrHigh');
const startOver = document.querySelector('#resultContainer');


const p = document.createElement('p');

let prevGuesses=[];
let guessNumber = 1;

let playGame = true;

if(playGame){
  submit.addEventListener('click',(e)=>{
    e.preventDefault();
    const guess = parseInt(inputField.value);
    validateGuess(guess);
  });
}

function validateGuess(guess){
  if(isNaN(guess)){
    alert(`Please enter a valid number!`);
  }else if(guess<1){
    alert(`Please enter a number more than 1!`);
  }else if(guess>100){
    alert(`Please enter a number less than 100!`);
  }else{
    prevGuesses.push(guess);

    if(guessNumber === 10){
      displayGuess(guess);
      displayMessage(`Game Over! The number was ${randomNumber}`);
      endGame();
    }else{
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess){
  if(guess === randomNumber){
    displayMessage(`Congratulations! You've Guessed it right!`);
    endGame();
  }else if(guess<randomNumber){
    displayMessage(`Your Guess is a little low`);
  }else if(guess>randomNumber){
    displayMessage(`Your Guess is a lot higher`);
  }
}

function displayGuess(guess){
  inputField.value = '';
  previousGuesses.innerHTML += `${guess}   `;
  guessNumber++;
  remainingGuesses.innerHTML = `${11-guessNumber}`;
}

function displayMessage(message){
  lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

function endGame(){
  inputField.value = '';
  inputField.setAttribute('disabled', '');
  p.classList.add('button')
  p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
  startOver.appendChild(p);
  playGame=false;
  newGame();
}

function newGame(){
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click',()=>{
    randomNumber = parseInt((Math.random()*100+1));
    prevGuesses=[];
    previousGuesses.innerHTML = ``;
    guessNumber = 1;
    remainingGuesses.innerHTML = `${11-guessNumber}`;
    inputField.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  });
}