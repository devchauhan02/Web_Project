const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text");

let currentWord, wordGuessCount = 0;
const maxGuesses = 6;

const getRandomWord = () => {
    //selecting a random word and hint from the wordList
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word.toLowerCase(); // Ensure the word is in lowercase
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const initGame = (button, clickedLetter) => {
    // Disable the button after it's clicked
    button.disabled = true;

    if (currentWord.includes(clickedLetter)) {
       [...currentWord].forEach((letter,index) => {
        if(letter === clickedLetter){
            wordDisplay.querySelectorAll("li")[index].innerText = letter
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
       })
    } else {
        wordGuessCount++;
    }
    guessesText.innerText = `Incorrect Guesses : ${wordGuessCount}  / ${maxGuesses}`;

    if (wordGuessCount >= maxGuesses) {
        console.log("Game Over!");
    }
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
