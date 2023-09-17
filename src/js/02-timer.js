import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-notify-aio-3.2.6.min.js';

const DELAY = 1000;
//Посилання на елементи
const startBtn = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minsField = document.querySelector('[data-minutes]');
const secsField = document.querySelector('[data-seconds]');
// ________________________________________________________________________
startBtn.addEventListener('click', startTimer);

//______________________________________________________________________
//Фіча вибору дати і часу для початку відліку + попередження про неправильну дату
startBtn.setAttribute('disabled', 'true');
let startTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (isPastTime()) {
      //після завершення таймеру в разі повторного вибору дати, якщо вона некоректна - деактивуємо кнопку
      startBtn.setAttribute('disabled', 'true');
      //_________________________________________________
      Notify.failure('Please choose a date in the future');
      return;
    }

    startTime = selectedDates[0].getTime();
    startBtn.removeAttribute('disabled', 'true');
  },
};

const datePicker = flatpickr('#datetime-picker', options);

//______________________________________________________________________

function isPastTime() {
  let currentDate = Date.now();
  let selectedDate = datePicker.selectedDates[0].getTime();
  return selectedDate - currentDate < 0;
}

function startTimer() {
  startBtn.setAttribute('disabled', 'true');
  const currentTime = Date.now();
  const deltaTime = startTime - currentTime;

  const timeComponents = convertMs(deltaTime);

  updateReverseTimerFields(timeComponents);

  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;

    const timeComponents = convertMs(deltaTime);

    if (deltaTime <= 0) {
      stopTimer(intervalId);
      return;
    }

    updateReverseTimerFields(timeComponents);
  }, DELAY);
}

function stopTimer(intervalId) {
  clearInterval(intervalId);
  Notify.success('Countdown is over!');
  startBtn.removeAttribute('disabled', 'true');
}

function updateReverseTimerFields(timeComponents) {
  daysField.textContent = addLeadingZero(timeComponents.days);
  hoursField.textContent = addLeadingZero(timeComponents.hours);
  minsField.textContent = addLeadingZero(timeComponents.minutes);
  secsField.textContent = addLeadingZero(timeComponents.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
