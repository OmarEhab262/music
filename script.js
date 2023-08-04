let currentMusic = 0;
const music = document.querySelector("#audio");
const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration-time");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");
const playBtn = document.querySelector(".play-btn");
const pause = document.querySelector(".fa-pause");
const play = document.querySelector(".fa-play");
playBtn.addEventListener("click", () => {
  disk.classList.toggle("play");
  if (pause.classList.contains("show")) {
    pause.classList.remove("show");
    play.classList.add("show");
    music.pause();
  } else {
    music.play();
    pause.classList.add("show");
    play.classList.remove("show");
  }
});

const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  disk.style.backgroundImage = `url("${song.cover}")`;
  currentTime.innerHTML = "00:00";
  setTimeout(() => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
  }, 300);
};
setMusic(0);
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
};
setInterval(() => {
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
}, 500);
seekBar.addEventListener("change", () => {
  music.currentTime = seekBar.value;
});
forwardBtn.addEventListener("click", () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playBtn.click();
});
backwardBtn.addEventListener("click", () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playBtn.click();
});
