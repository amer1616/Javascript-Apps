// helper for querySelector
const $ = (el) => document.querySelector(el);

// song titles and url
const suras = ["fati7a", "falak", "alnas"];

// keep track of sura
let suraIndex = 0;

// initially load suras to DOM
loadSuras(suras[suraIndex]);

// update suras details
function loadSuras(song) {
  $("#title").innerText = song;
  $("#audio").src = `audio/${song}.mp3`;
  $("#cover").src = `images/${song}.jpg`;
}

// play sura
function playSura() {
  $("#player-container").classList.add("play");
  $("#play").querySelector("i.fas").classList.remove("fa-play");
  $("#play").querySelector("i.fas").classList.add("fa-pause");
  $("#audio").play();
}

// previous sura func
function prevSura() {
  suraIndex--;
  if (suraIndex < 0) {
    suraIndex = suras.length - 1;
  }
  // updating new sura index
  loadSuras(suras[suraIndex]);
  playSura();
}

// next sura func
function nextSura() {
  suraIndex++;
  if (suraIndex > suras.length - 1) {
    suraIndex = 0;
  }
  // updating new sura index
  loadSuras(suras[suraIndex]);
  playSura();
}

//pause song
function pauseSura() {
  $("#player-container").classList.remove("play");
  $("#play").querySelector("i.fas").classList.add("fa-play");
  $("#play").querySelector("i.fas").classList.remove("fa-pause");
  $("#audio").pause();
}

// update sura progress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;
  // console.log(progressPercent);
  $(".progress").style.width = `${progressPercent}%`;
}

// set progress bar when u click on it
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = $("#audio").duration;

  $("#audio").currentTime = (clickX / width) * duration;
}

// event listeners
// play button click event listener
$("#play").addEventListener("click", () => {
  const isPlaying = $("#player-container").classList.contains("play");

  if (isPlaying) {
    pauseSura();
  } else {
    playSura();
  }
});

// prev & next click event handles
$("#prev").addEventListener("click", prevSura);
$("#next").addEventListener("click", nextSura);

// Time/ sura progress update
$("#audio").addEventListener("timeupdate", updateProgress);

// click on progress bar
$("#progress-container").addEventListener("click", setProgress);

// sura ended moves to next sura
$("#audio").addEventListener("ended", nextSura);
