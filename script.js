/**
 * Golden Bloom - Interactive Focus Companion Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Timer State Variables
  const WORK_TIME = 25 * 60; // 25 minutes
  const REST_TIME = 5 * 60;  // 5 minutes

  let timeLeft = WORK_TIME;
  let timerId = null;
  let isRunning = false;
  let currentMode = 'work'; // 'work' | 'rest'

  const display = document.getElementById('timer-display');
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');
  const modeToggleBtn = document.getElementById('mode-toggle-btn');
  const statusText = document.getElementById('timer-status');

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function updateDisplay() {
    display.textContent = formatTime(timeLeft);
  }

  function startTimer() {
    if (isRunning) {
      // Pause
      clearInterval(timerId);
      isRunning = false;
      startBtn.textContent = 'Resume Focus';
      startBtn.classList.remove('btn-secondary');
      startBtn.classList.add('btn-primary');
      statusText.textContent = 'Session paused. Click resume to continue.';
    } else {
      // Start
      isRunning = true;
      startBtn.textContent = 'Pause';
      statusText.textContent = currentMode === 'work' 
        ? '🌱 Focus session in progress... Breathe and stay present.' 
        : '☕ Rest interval active. Stretch, relax, or gaze at the sunflowers.';

      timerId = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateDisplay();
        } else {
          clearInterval(timerId);
          isRunning = false;
          handleTimerCompletion();
        }
      }, 1000);
    }
  }

  function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    timeLeft = currentMode === 'work' ? WORK_TIME : REST_TIME;
    updateDisplay();
    startBtn.textContent = currentMode === 'work' ? 'Start Focus Session' : 'Start Rest Interval';
    statusText.textContent = currentMode === 'work'
      ? 'Ready to begin a 25-minute Pomodoro focus block.'
      : 'Ready for a 5-minute restorative pause.';
  }

  function toggleMode() {
    clearInterval(timerId);
    isRunning = false;

    if (currentMode === 'work') {
      currentMode = 'rest';
      timeLeft = REST_TIME;
      modeToggleBtn.textContent = 'Switch to 25-Min Focus';
      startBtn.textContent = 'Start Rest Interval';
      statusText.textContent = 'Switched to 5-minute rest mode.';
    } else {
      currentMode = 'work';
      timeLeft = WORK_TIME;
      modeToggleBtn.textContent = 'Switch to 5-Min Rest';
      startBtn.textContent = 'Start Focus Session';
      statusText.textContent = 'Switched to 25-minute focus mode.';
    }
    updateDisplay();
  }

  function handleTimerCompletion() {
    if (currentMode === 'work') {
      statusText.textContent = '🎉 Great job! Focus session completed. Take a 5-minute break.';
      toggleMode();
    } else {
      statusText.textContent = '✨ Break completed! Ready for your next focus round?';
      toggleMode();
    }
  }

  if (startBtn && resetBtn && modeToggleBtn) {
    startBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);
    modeToggleBtn.addEventListener('click', toggleMode);
  }

  updateDisplay();
});
