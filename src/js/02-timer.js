import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
// import 'dist/notiflix-3.2.6.min.css';

//Фіча вибору дати і часу для початку відліку
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);
