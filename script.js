let workTime = 25 * 60;
let breakTime = 5 * 60;
let currentTime = workTime;
let timer;
let isRunning = false;
let isWorkMode = true;

const timeDisplay = document.getElementById("time");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const workBtn = document.getElementById("workBtn");
const breakBtn = document.getElementById("breakBtn");
const progressCircle = document.getElementById("progressCircle");
const message = document.getElementById("message");

const circleLength = 2 * Math.PI * 100; // 628 approx

function updateDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timeDisplay.textContent =
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  let totalTime = isWorkMode ? workTime : breakTime;
  let progress = currentTime / totalTime;
  progressCircle.style.strokeDashoffset = circleLength * (1 - progress);
}

function startPauseTimer() {
  if (!isRunning) {
    timer = setInterval(() => {
      currentTime--;
      updateDisplay();

      if (currentTime <= 0) {
        clearInterval(timer);
        isRunning = false;
        alert(isWorkMode ? "Work session done! 🌸 Time for a break!" : "Break over! 🍅 Back to work!");
        switchMode();
      }
    }, 1000);
    startPauseBtn.textContent = "Pause";
  } else {
    clearInterval(timer);
    startPauseBtn.textContent = "Start";
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startPauseBtn.textContent = "Start";
  currentTime = isWorkMode ? workTime : breakTime;
  updateDisplay();
}

function switchMode(mode) {
  if (mode === "work") {
    isWorkMode = true;
  } else if (mode === "break") {
    isWorkMode = false;
  } else {
    isWorkMode = !isWorkMode;
  }

  workBtn.classList.toggle("active", isWorkMode);
  breakBtn.classList.toggle("active", !isWorkMode);

  currentTime = isWorkMode ? workTime : breakTime;
  message.textContent = isWorkMode 
    ? "Stay focused 🌷 You’re doing amazing!" 
    : "Relax & recharge 🌈✨";
  
  resetTimer();
}

startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);
workBtn.addEventListener("click", () => switchMode("work"));
breakBtn.addEventListener("click", () => switchMode("break"));

updateDisplay();
