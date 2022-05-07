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
  console.log('Update wrong')
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
displayWord();