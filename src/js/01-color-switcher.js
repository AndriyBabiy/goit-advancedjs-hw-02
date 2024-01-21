const body = document.querySelector('body')
const button = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]')
}
let bgColor = null;

button.start.addEventListener('click', handlerStart);
button.stop.addEventListener('click', handlerStop);
button.stop.disabled = true;

function handlerStart(evt) {
  button.stop.disabled = false;
  button.start.disabled = true;
  setBackgroundColor(getRandomHexColor());

  bgColor = setInterval(() => {
    let color = getRandomHexColor();

    setBackgroundColor(color);
  }, 1000);
};

function handlerStop(evt) {
  clearInterval(bgColor);
  button.start.disabled = false;
  button.stop.disabled = true;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function setBackgroundColor(color) {
  body.setAttribute("style", `background-color: ${color}`);
}