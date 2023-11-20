'use strict'

const timeDisplay = document.querySelector('#nowTime');
const btnSetAlarm = document.querySelector('#btnSetAlarm');
let alarmHour = -1;
let alarmMinute = -1;
let isTimeUp = false;

function updateTime() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const hours = String(currentHour).padStart(2, '0');
  const minutes = String(currentMinute).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  timeDisplay.textContent = `${hours}:${minutes}:${second}`;


  if (!isTimeUp && alarmHour === currentHour && alarmMinute === currentMinute) {
    showDialog();
    isTimeUp = true;
    alarmSound.play();
  }   
}

document.getElementById('hour').value = '';
document.getElementById('minute').value = '';

function setAlarm() {
    const alarmHour2 = parseInt(document.getElementById('hour').value);
    const alarmMinute2 = parseInt(document.getElementById('minute').value);
    if (alarmHour2 < 0 || alarmHour2 > 23 || alarmMinute2 < 0 || isNaN(alarmHour2)
        || alarmMinute2 > 59 || isNaN(alarmMinute2)) {
        alert('Please enter valid hour (0-23) and minute (0-59)');
        return;
    }
    alarmHour = alarmHour2;
    alarmMinute = alarmMinute2;
    isTimeUp = false;
    const alarmP = document.querySelector('#alarmP');
    alarmP.innerText = `${alarmHour2}:${alarmMinute2}`;
    document.getElementById('hour').value = '';
    document.getElementById('minute').value = '';
}

updateTime(); // Initial display of time
setInterval(updateTime, 1000); // Update time every second

btnSetAlarm.addEventListener('click', setAlarm);

function showDialog() {
    Swal.fire({
      title: 'Time is up',
      text: 'Time is up!',
      icon: 'info', // 'info', 'success', 'error', 'warning', 'question'
      confirmButtonText: 'OK',
    });
  }