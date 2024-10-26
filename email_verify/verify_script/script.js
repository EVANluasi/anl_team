const otpInputs = document.querySelectorAll('.otp');
const verifyButton = document.getElementById('verifyButton');
const sendCodeButton = document.getElementById('sendCodeButton');
const timerDisplay = document.getElementById('time');
const notification = document.getElementById('notification');

let timeLeft = 300; 
let timer;
let isTimerRunning = false; 

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (timeLeft <= 0) {
        clearInterval(timer);
        verifyButton.disabled = true;
        showNotification("Time's up! The OTP sent cannot be used anymore.");
        resetOTPInputs(); 
        isTimerRunning = false; 
    }
    timeLeft--;
}

function startTimer() {
    timeLeft = 300; 
    timerDisplay.textContent = '05:00'; 
    timer = setInterval(updateTimer, 1000);
    isTimerRunning = true;
}

function resetOTPInputs() {
    otpInputs.forEach(input => {
        input.value = '';
    });
    otpInputs[0].focus(); 
}

function moveToNext(currentInput, index) {
    if (currentInput.value.length >= 1) {
        if (index < otpInputs.length) {
            otpInputs[index].focus();
        }
    } else if (index > 0) {
        otpInputs[index - 1].focus();
    }
    
    const allFilled = Array.from(otpInputs).every(input => input.value.length === 1);
    verifyButton.disabled = !allFilled;
}

sendCodeButton.addEventListener('click', () => {
    if (!isTimerRunning) {
        showNotification("Verification code sent to your email!");
        startTimer();
        verifyButton.disabled = false;
    } else {
       showNotification("The timer is already running. Please enter your OTP before the time expires.");
    }
});

verifyButton.addEventListener('click', () => {
    const otpValue = Array.from(otpInputs).map(input => input.value).join('');

    if (otpValue.length === 6) {
        showNotification("OTP Verified Successfully!");
        clearInterval(timer);
        verifyButton.disabled = true;
    } else {
        showNotification("Please enter a valid 6-digit OTP.");
    }
});

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

verifyButton.disabled = true;
