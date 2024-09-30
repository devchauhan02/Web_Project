const hangmanImage = document.querySelector(".hangman-box img");
const keyboardDiv  = document.querySelector(".keyboard");
const wordDisplay  = document.querySelector(".word-display");
const guessesText  = document.querySelector(".guesses-text");
const gameModal    = document.querySelector(".game-modal");   
const playAgainBtn    = document.querySelector(".play-again");   

let currentWord,  correctLetters = [] ,  wordGuessCount = 0;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wordGuessCount = 0;
    hangmanImage.src = `hangman-${wordGuessCount}.svg`;
    guessesText.innerText = `Incorrect Guesses : ${wordGuessCount}  / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    //selecting a random word and hint from the wordList
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word.toLowerCase(); // Ensure the word is in lowercase
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();

} 

const gameOver  = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was`;
        gameModal.querySelector("img").src = `${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModal.classList.add("show");
    },300)
}

const initGame = (button, clickedLetter) => {
  //Checking if clickedLetter exist or not
    if (currentWord.includes(clickedLetter)) {
       [...currentWord].forEach((letter,index) => {
        if(letter === clickedLetter){
            correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText = letter
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
       })
        // Reveal the letter in the display (to be implemented if needed)
    } else {
        wordGuessCount++;
        hangmanImage.src = `hangman-${wordGuessCount}.svg`;
    }
    // Disable the button after it's clicked
    button.disabled = true;
    guessesText.innerText = `Incorrect Guesses : ${wordGuessCount}  / ${maxGuesses}`;

    //calling gameOver functions if any of these condition meets
    if(wordGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

//creating keyboard buttons and adding event listener
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);

    // Pass the correct clicked letter instead of relying on 'i'
    button.addEventListener("click", e => initGame(e.target, button.innerText.toLowerCase()));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);