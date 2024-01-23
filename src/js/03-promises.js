import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const button = document.querySelector('button[type="submit"]');

const { delay, step, amount } = form.elements;

button.addEventListener('click', handlerClick);

function handlerClick(evt) {
  evt.preventDefault();

  for (let i = 0; i < amount.value; i++) {
    createPromise(
      i + 1,
      step.value * i + Number(delay.value)
    )
    .then(({ position, delay }) =>
      iziToastPopup(
        `✅ Fulfilled promise ${position} in ${delay}ms`,
        'success'
        )
    )
    .catch(({ position, delay }) =>
      iziToastPopup(
        `❌ Rejected promise ${position} in ${delay}ms`,
        'fail'
      )
    );
  }

  form.reset();
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        res({
          position,
          delay,
        });
      } else {
        rej({
          position,
          delay,
        });
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
