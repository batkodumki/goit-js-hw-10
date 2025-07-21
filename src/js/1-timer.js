import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



let userSelectedDate = null;

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0].getTime();

        if (userSelectedDate <= Date.now()) {
            iziToast.error({ message: "Please choose a date in the future" });
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
        console.log(selectedDates[0]);
    },
};

flatpickr("#datetime-picker", options);


function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}
  
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

startBtn.addEventListener("click", startTimer);

const dateInput = document.querySelector("#datetime-picker");

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minEl = document.querySelector('[data-minutes]');
const secEl = document.querySelector('[data-seconds]');


function startTimer() {
    if (!userSelectedDate) return;
    startBtn.disabled = true;
    dateInput.disabled = true;

    const timerId = setInterval(() => {
        const currentTime = Date.now();
        const delta = userSelectedDate - currentTime;

        if (delta <= 0) {
            clearInterval(timerId);
            updateInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            dateInput.disabled = false;
            return;
        }
        const time = convertMs(delta);
        updateInterface(time);
      }, 1000);
};

function updateInterface({ days, hours, minutes, seconds }) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minEl.textContent = addLeadingZero(minutes);
    secEl.textContent = addLeadingZero(seconds);
  }




