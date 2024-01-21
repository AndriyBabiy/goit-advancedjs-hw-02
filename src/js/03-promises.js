import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = {
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}
const button = document.querySelector('button[type="submit"]');

button.addEventListener('click', handlerClick);

function handlerClick(evt) {
  evt.preventDefault();

  setTimeout(() => {
    for (let i = 1; i <= input.amount.value; i++) {
      createPromise(i, input.delayStep.value * i)
        .then(value => iziToastPopup(value, 'success'))
        .catch(reason => iziToastPopup(reason, 'fail'));
    }

  }, input.firstDelay.value );
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        res(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        rej(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay)
  })
}

function iziToastPopup(text, type) {
  let color = type === "success" ? 'green' : 'red';

  return iziToast.show({
      message: `${text}`,
      color: `${color}`,
      position: 'topRight',
    })
}
