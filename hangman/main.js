import { words } from "./dict.js";
// helper querySelector
const $ = (el) => document.querySelector(el);

const figureParts = document.querySelectorAll(".figure-part");

// array of words for generating random words
// const words = [
//   "programming",
//   "designing",
//   "application",
//   // "interface",
//   "wizard",
// ];

// let selectedWord = "";
let selectedWord = Object.keys(words)[
  Math.floor(Math.random() * Object.keys(words).length)
];

let synonymWord = words[selectedWord];

console.log(selectedWord, synonymWord);
let correctLetters = [];
let wrongLetters = [];

// show hidden word, selectedWord, check if it includes any letter, add it, otherwise return empty
function displayWord() {
  $(
    "#synonymWord"
  ).innerHTML = ` <span class="synonymWord">${synonymWord}</span>`;

  $("#word").innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) => `
      
    <span class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
    )
    .join("")}
  `;

  // replace any new line character with empty string, to remove new line char, so keep it on one line
  const innerWord = $("#word").innerText.replace(/\n/g, "");
  // console.log(innerWord);

  // check if innerWord equal to correctLetters, show message you won
  if (innerWord === selectedWord) {
    $(".final-message").innerText = "Congratulations, You Won 😀!";
    $("#popup-container").style.display = "flex";
  }
}
//show notification
function showNotification() {
  $("#notification-container").classList.add("show");

  // duration to show notification
  setTimeout(() => {
    $("#notification-container").classList.remove("show");
  }, 2000);
}

// update wrongletters
function updateWrongLettersEl() {
  console.log("update wrong letters");
  $("#wrong-letters").innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  //display figure parts by iterating thru figureParts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    //check if more wrong letters less than figureparts index, show figure part, the 'hangman'
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //check if lost to show message lost,
  if (wrongLetters.length === figureParts.length) {
    $(".final-message").innerText = "Unfortunately, you lost!";
    $("#popup-container").style.display = "flex";
  }
}

// keydown letter press, for choosing letter from keyboard
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    // console.log(letter);
    // check if pressed letter inside selectedword, add it to correctedLetters (if not found in correctedLetters)
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord(); // update content to display that letter
      } else {
        showNotification();
      }
    } else {
      // if letter not found inside selectedWord, add it to wrongLetters arr
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl(); // update content to display that wrong letter
      } else {
        showNotification();
      }
    }
  }
});

//restart play game again btn, event
$("#play-btn").addEventListener("click", () => {
  //emty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // update random selectedWord
  selectedWord = Object.keys(words)[
    Math.floor(Math.random() * Object.keys(words).length)
  ];
  synonymWord = words[selectedWord];
  //display word again
  displayWord();

  //update wrongLetters
  updateWrongLettersEl();

  $("#popup-container").style.display = "none";
});

displayWord();
