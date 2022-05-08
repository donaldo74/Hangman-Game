const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-buttona');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

// Create array of words
const words = ['application', 'programming', 'interface', 'wizard'];

// Randomly select 1 word from above array, put into selectWord var
let selectedWord = words[Math.floor(Math.random()* words.length)];

// Create arrays to store correct and wrong letters
const correctLetters = [];
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

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Draw the figure parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    
    if(index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if user has lost the game
  if(wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕'
    popup.style.display = 'flex';
  }
}

// Show notification
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}



// Keydown letter press
window.addEventListener('keydown', e => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    // Check if the letter is included in the selected word
    if(selectedWord.includes(letter)) {
      // Check that letter is not included in the correctLetters array
      if (!correctLetters.includes(letter)) {
        // If it's not, push the latter onto the array
        correctLetters.push(letter);

        // Update the word element to show the new letter
        displayWord();
      } else {
        showNotification();
      }
    } else {
      // Check that letter is not included in the wrongLetters array
      if(!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        // Display the letter in the wrongLetters element
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }

});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display='none';
});

displayWord();