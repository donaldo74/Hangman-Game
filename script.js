const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

// Create array of words
const words = ['application', 'programming', 'interface', 'wizard'];

// Randomly select 1 word from above array, put into selectWord var
let selectedWord = words[Math.floor(Math.random()* words.length)];

// Create arrays to store correct and wrong letters
const correctLetters = ['w', 'i', 'z', 'a', 'r', 'd'];
const wrongLetters = [];

// Show the hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter =>`
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `)
      .join('')}
  `;
  // Replace empty character globally using regex
  const innerWord = wordEl.innerText.replace(/\n/g, '')

  // Check if innerWord is equal to selectedWord
  if(innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations!, You won! 😃';
    popup.style.display= 'flex';
  }
}

displayWord();