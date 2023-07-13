// Get elements
const playBtn = document.querySelector(".play-btn");
const progress = document.querySelector(".progress");
const progressFill = document.querySelector(".progress-fill");
const volumeSlider = document.querySelector(".volume-slider");
const player = document.getElementById("musicPlayer");
const durationLabel = document.querySelector(".duration");

// Play/pause
playBtn.addEventListener("click", () => {
  if (player.paused) {
    player.play();
    playBtn.innerHTML =
      '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAg1JREFUSEuVV1uOwyAMNNKiQk/RozQnb47SU2xoulJWvA3YPPLTNhDG4xnbqYClSwDABeA+BAi47Ae+lb+7c8MigSH4pbyb2zPzbMYvd9tfRGDtpovLTIOOU8Cn0wMP0rKkRkzvIB0M4546VRhBbyfuAgGWMQ44f59TNcdCnJKMiTTGAM6xBIMuNLHYM+aCykTtUKXiK6zRJJPxUk5d3+N44o1S690+/Hscjx+Ah1u7AOT9vlOwbRhDWM/y+zEx9/aJXSq9WQanMS8ASEFJpfqVEjXmyrCO52tMbFk2T7u86c0FhIEFgLxpMXa47XrDKzB2wP5I4Rirzf4ugAGgZlzrmoquKUNcjSgdPtX+GA+MGYtnZCkVZsyXNmogZc3hSAMzbNQKmNO4bEQFAt0o0gBK0+ZszIVTjRljc/E6thoTLTC4NzN25lKb3Xp+zAuuwNiZi3d1TbIMixHduzpd2VwN8IrGGJppe+cMMHY1p2Fow0yqW1O0wAuuptrnWgMhUs11rsE0QeXEd3tnoukGQmhMDox0s1tY4IeE71t/AG+t9dvVNzE8Mg4vdPGyR2enm7Nhww1eqgaWAAQcXleJndPQMxvjdMI4M0br9vZBWdbLw3SNJWCKP770M74t7RXO4MDq4TGMut6Azid9TR/IizgjUy1rOYr4Edr85aDBuODK+23L5Awy6EQzL3iY8T/o+Cw3e+5R+gAAAABJRU5ErkJggg=="/>'; // Pause symbol
    // playBtn.innerHTML = '&#10074;&#10074;'; // Pause symbol
  } else {
    player.pause();
    playBtn.innerHTML =
      '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAi5JREFUSEudVkt2wyAMlBK3TeilsuylfIKcIqdodzmBl112lTvEzfOz6QODESABaTbxBwtpNDMCYfshIGjQ9h4BzJX7C2voo/hluKNx3HohjovLvOV3pE/j60qINBwTSC7VvpE2YIAqLa1WQD+uFyW1IAbWrGqDmvZeTpXnR5at4QHhUhavAmn2LbOBJSlTGtZ7Vge3BIAUP4LayikhyPT7+OiW+Rvf1S1lVUtK/ybXdL+fAHdfsCz9i1LnZ9tB9R1gR1ihLmA1jXbj62omOCDovjscPlvh5eN7chWUPI3jCRCvkfgRL/t56VEdb+vzosWx9kUq5tXvoPYVUyt9WPjf1bkIGQtNE9TjSSNeCQtTJxhQQwR/sX2+Pt6VwtOtx1JT3dId4mW3zD0e1Qo/A2Du1dIiBJjucY8NEb3rmFmWIPGARfev6njmCBsVSekexmLIzZCLh5qFYO07J7tkeZQwp7mN1e4lrTiyQ8v0uUfloGYEHwyq5tUAwMkpUc+AgH13eNu0LWk39W1Whj7heOMoZDOsUfGET8WxyBoI4GW/UANJFca7YaogmfqO1YRcA0LQbHGyFWe2V0ZWc8CjOiQKdlvqoZekPUjRU6a/NlB3Wv+IbK0YRWoaXt+5E0qmL1XW4o/Ct0VyCR5fnqWV/lpHpQTJDKQ2rIUNMjfkpmZz7JaF0ppsEnEHgSfIEgqmH2W7iOcE/oQgHIla7JDvgFNN5FxtSSYFxim0oEwT+gPwWSQ0cPQzXAAAAABJRU5ErkJggg=="/>'; // Play symbol
    // playBtn.innerHTML = '&#9654;'; // Play symbol
  }
});

// Update progress bar and duration label
player.addEventListener("timeupdate", () => {
  const progressPercent = (player.currentTime / player.duration) * 100;
  progressFill.style.width = `${progressPercent}%`;

  // Update duration label
  const currentMinutes = Math.floor(player.currentTime / 60);
  const currentSeconds = Math.floor(player.currentTime % 60);
  const durationMinutes = Math.floor(player.duration / 60);
  const durationSeconds = Math.floor(player.duration % 60);

  durationLabel.textContent = `${currentMinutes}:${currentSeconds
    .toString()
    .padStart(2, "0")} / ${durationMinutes}:${durationSeconds
    .toString()
    .padStart(2, "0")}`;
});

// Change volume
volumeSlider.addEventListener("input", () => {
  player.volume = volumeSlider.value / 100;
});

// Progress bar manipulation
progress.addEventListener("click", (event) => {
  const progressWidth = progress.clientWidth;
  const clickX = event.offsetX;
  const duration = player.duration;
  const skipToTime = (clickX / progressWidth) * duration;

  player.currentTime = skipToTime;
});

// Update progress bar and duration label while dragging progressFill
let isDragging = false;

progress.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    player.currentTime =
      (progressFill.clientWidth / progress.clientWidth) * player.duration;
  }
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const progressWidth = progress.clientWidth;
    const clickX = event.offsetX;
    const progressPercent = (clickX / progressWidth) * 100;

    progressFill.style.width = `${progressPercent}%`;
  }
});

player.src = "/music/Bachata_Heightz_Complicado_Amor.mp3";
