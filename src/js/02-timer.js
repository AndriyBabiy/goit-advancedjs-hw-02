import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const divider = ':';

button.disabled = true;

const timer = {
  elem: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  label: document.getElementsByClassName('label'),
}

timer.elem.setAttribute('style', 'display: flex');
[timer.days, timer.hours, timer.minutes]
  .map(elem =>
    elem.insertAdjacentHTML('afterend', `<span class='divider'>${divider}</span>`)
  );
[...timer.label]
  .map(elem =>
    elem.setAttribute('style', 'display: none')
  );

const currentDateUnix = () => new Date().getTime();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (calendar.selectedDates[0] > currentDateUnix()) {
      button.disabled = false;
    } else {
      button.disabled = true;
      iziToast.show({
        message: "Please choose a date in the future",
        color: 'red',
        position: 'topRight'
      });
    }
  },
};

const calendar = flatpickr(input, options);

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

  button.addEventListener('click', handlerClick);

  function handlerClick(evt) {
    button.disabled = true;
    input.disabled = true;
    updateTimer(calendar.selectedDates[0] - currentDateUnix());

    let countdown = setInterval(() => {
      const timeDiff = calendar.selectedDates[0] - currentDateUnix();

      updateTimer(timeDiff);

      if (timeDiff <= 0) {
        clearInterval(countdown);

        timer.days.textContent = addLeadingZeroValue(0);
        timer.hours.textContent = addLeadingZeroValue(0);
        timer.minutes.textContent = addLeadingZeroValue(0);
        timer.seconds.textContent = addLeadingZeroValue(0);

        input.disabled = false;
      }
    }, 1000)
  }

  function updateTimer(timerRemaining) {
    timer.days.textContent = addLeadingZeroValue(convertMs(timerRemaining).days);
    timer.hours.textContent = addLeadingZeroValue(convertMs(timerRemaining).hours);
    timer.minutes.textContent = addLeadingZeroValue(convertMs(timerRemaining).minutes);
    timer.seconds.textContent = addLeadingZeroValue(convertMs(timerRemaining).seconds);
  }

  function addLeadingZeroValue(num) {
    let result = String(num);

    if (result.length < 2) {
      result = result.padStart(2, "0");
    }

    return result;
  }