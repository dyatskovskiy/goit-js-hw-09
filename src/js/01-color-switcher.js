// HTML містить кнопки «Start» і «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
// }

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;
const DELAY = 1000;

let intervalId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

stopBtn.setAttribute('disabled', 'true');

function onStartBtnClick() {
  intervalId = setInterval(changeBodyBgColor, DELAY);

  //   if (isColorChangeActive) {
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled', 'true');
  //   }
}

function onStopBtnClick() {
  clearInterval(intervalId);

  startBtn.removeAttribute('disabled', 'true');
  stopBtn.setAttribute('disabled', 'true');
}

function changeBodyBgColor() {
  body.style.backgroundColor = `${getRandomHexColor()}`;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
