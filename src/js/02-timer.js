import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-notify-aio-3.2.6.min.js';

const startBtn = document.querySelector('[data-start]');
startBtn.setAttribute('disabled', 'true');
//______________________________________________________________________
//Фіча вибору дати і часу для початку відліку + попередження про неправильну дату
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (isPastTime()) {
      Notify.warning('Please choose a date in the future');
      return;
    }
    startBtn.removeAttribute('disabled', 'true');
  },
};
const datePicker = flatpickr('#datetime-picker', options);
let currentDate = new Date();

function isPastTime() {
  return datePicker.selectedDates[0].getTime() - currentDate.getTime() < 0;
}
//______________________________________________________________________
