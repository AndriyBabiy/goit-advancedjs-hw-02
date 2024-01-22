import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}
const button = document.querySelector('button[type="submit"]');

const { firstDelay, delayStep, amount} = input;

button.addEventListener('click', handlerClick);

function handlerClick(evt) {
  evt.preventDefault();

  setTimeout(() => {
    for (let i = 0; i < amount.value; i++) {
      createPromise(
        i,
        delayStep.value * i
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

      if (i === amount.value - 1) {
        input.form.reset();
      }
    }
  }, firstDelay.value );
}

function createPromise(position, delayStep) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        res({
          position: position + 1,
          delay: delayStep + Number(firstDelay.value),
        });
      } else {
        rej({
          position: position + 1,
          delay: delayStep + Number(firstDelay.value),
        });
      }
    }, delayStep)
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
