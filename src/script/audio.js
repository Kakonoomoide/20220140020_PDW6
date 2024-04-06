const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "./assets/audio/Dream lantern.mp3",
    displayName: "Dream lantern (夢灯籠)",
    cover: "./assets/image/cover/Dream lantern.jpg",
    artist: "RADWIMPS",
  },
  {
    path: "./assets/audio/Katawaredoki.mp3",
    displayName: "Katawaredoki (彼は誰)",
    cover: "./assets/image/cover//Katawaredoki.jpg",
    artist: "RADWIMPS",
  },
  {
    path: "./assets/audio/Nandemonaiya.mp3",
    displayName: "Nandemonaiya (なんでもないや)",
    cover: "./assets/image/cover/Nandemonaiya.jpeg",
    artist: "RADWIMPS",
  },
  {
    path: "./assets/audio/sparkle.mp3",
    displayName: "sparkle (スパークル)",
    cover: "./assets/image/cover/sparkle.jpeg",
    artist: "RADWIMPS",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  // Change play button icon
  playBtn.classList.replace("fa-play", "fa-pause");
  // Set button hover title
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  // Change pause button icon
  playBtn.classList.replace("fa-pause", "fa-play");
  // Set button hover title
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  music.preload = "auto"; // Preloading audio
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();

  progress.style.width = "0%";
  pauseMusic(); // Pause music jika sedang bermain
  playBtn.classList.replace("fa-pause", "fa-play"); // Ubah ikon tombol menjadi play
  playBtn.setAttribute("title", "Play"); // Set judul tombol saat dihover menjadi Play
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
