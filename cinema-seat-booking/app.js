// helper function for querySelector & querySelectorAll
const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const seats = $$(".row .seat:not(.occupied)");
let movieTicketPrice = +$("#movie").value;

function init() {
  populateUI();
  updSelectedCountTotal();
}
// update selected seats count
function updSelectedCountTotal() {
  // get counts of all selected seats by getting its length
  const selectedSeats = $$(".row .seat.selected");

  // get index of seats in array using spread operator. then iterate over selectedSeats
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  //console.log(seatsIndex);

  // store index of seats in localStorage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  $("#count").innerText = selectedSeatsCount;
  $("#total").innerText = selectedSeatsCount * movieTicketPrice;
}
// save movie data in localstorage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// poulate Ui from localStorage. then display the stored selected seats and selected movie
function populateUI() {
  const selectedSetas = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSetas !== null && selectedSetas.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSetas.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    $("#movie").selectedIndex = selectedMovieIndex;
  }
}

//event for selecting movie
$("#movie").addEventListener("change", (e) => {
  movieTicketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);

  updSelectedCountTotal();
});

// event for clicking seat to toggle each seat with class selected
$(".screen-container").addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    //console.log(e.target);
    e.target.classList.toggle("selected");
    updSelectedCountTotal();
  }
});

window.addEventListener("load", init);
