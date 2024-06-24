const words = ['javascript', 'wellcode', 'programming', 'hangman', 'computer', 
    'website', 'application', 'coffee', 'flower'];
let chosenWord = '';
let guessedWord = []; 
let lives = 7; 
let message = document.getElementById('message');
let wordDisplay = document.getElementById('word-display');
let alphabetDiv = document.getElementById('alphabet');
let restartBtn = document.getElementById('restart-btn');
let hearts = document.querySelectorAll('#lives span');

function initializeGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = [];
    for (let i = 0; i < chosenWord.length; ++i) {
        guessedWord.push('_');
    }
    displayWord();
    lives = 7;
    for (let heart of hearts) {
           heart.style.visibility = 'visible';
    }
    message.textContent = '';
    restartBtn.style.display = 'none';
    let buttons = alphabetDiv.getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = false;
        button.classList.remove('disabled'); 
    }
}

function createAlphabetButtons() {
    for (let i = 0; i < 26; ++i) {
        let letter = String.fromCharCode(65 + i);
        let button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', function() {
            if (!button.disabled) {
                checkLetter(letter.toLowerCase(), button);
            }
        });
        button.classList.add('alphabet-button');
        alphabetDiv.appendChild(button);
    }
}

function displayWord() {
    wordDisplay.textContent = guessedWord.join(' ');
}

function checkLetter(letter, button) {
    let found = false;
    for (let i = 0; i < chosenWord.length; ++i) {
        if (chosenWord[i] === letter) {
            guessedWord[i] = letter.toUpperCase();
            found = true;
        }
    }
    if (!found) {
        --lives;
        hearts[lives].style.visibility = 'hidden';
    }
    displayWord();
    checkWin();
    checkLose();
    button.disabled = true;
    button.classList.add('disabled');
}

function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function checkWin() {
    if (guessedWord.join('') === chosenWord.toUpperCase()) {
        message.textContent = 'Well done!';
        message.className = 'win bounce';
        disableAlphabet()
        launchConfetti();
        restartBtn.style.display = 'inline-block';
    }
}

function checkLose() {
    if (lives === 0) {
        message.textContent = 'Game over! The correct word was ' + chosenWord + '.';
        message.className = 'lose'; 
        disableAlphabet();
        restartBtn.style.display = 'inline-block';
    }
}

function disableAlphabet() {
    let buttons = alphabetDiv.getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = true;
        button.classList.add('disabled');
    }
}

initializeGame();
createAlphabetButtons();
