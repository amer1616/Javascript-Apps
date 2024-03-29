// helper querySelector
const $ = (el) => document.querySelector(el);

const video = $("#video");

// toggle video status video.play/pause
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// update video play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    $("#play").innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    $("#play").innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

//stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// update progress bar
function updateProgress() {
  $("#progress").value = (video.currentTime / video.duration) * 100;

  //get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  // get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  $("#timestamp").innerHTML = `${mins}:${secs}`;
}
// set video progress value
function setVideoProgress() {
  video.currentTime = (+$("#progress").value * video.duration) / 100;
}
//event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

$("#play").addEventListener("click", toggleVideoStatus);

$("#stop").addEventListener("click", stopVideo);

$("#progress").addEventListener("change", setVideoProgress);
