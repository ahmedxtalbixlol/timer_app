let timers = [];

document.getElementById('add-timer').addEventListener('click', function() {
    const time = document.getElementById('timer-time').value;
    const text = document.getElementById('timer-text').value;
    const imageFile = document.getElementById('timer-image').files[0];
    
    if (time && text && imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const timersContainer = document.getElementById('timers-container');
            const timerItem = document.createElement('div');
            timerItem.className = 'timer-item';
            
            const img = document.createElement('img');
            img.src = e.target.result;
            timerItem.appendChild(img);
            
            const timerDetails = document.createElement('div');
            timerDetails.innerHTML = `<strong>${time}</strong><br>${text}`;
            timerItem.appendChild(timerDetails);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = 'X';
            deleteBtn.addEventListener('click', function() {
                timersContainer.removeChild(timerItem);
                timers = timers.filter(t => t.time !== time || t.text !== text);
            });
            timerItem.appendChild(deleteBtn);
            
            timersContainer.appendChild(timerItem);
            
            // Save the timer details
            timers.push({ time, text });
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert('Please fill out all fields and select an image.');
    }
});

function checkTimers() {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    
    timers.forEach(timer => {
        if (timer.time === currentTime) {
            const alarmSound = document.getElementById('alarm-sound');
            alarmSound.play();
            alert(`Time for: ${timer.text}`);
            
            // Show the close button
            const closeButton = document.getElementById('close-alarm');
            closeButton.classList.remove('hidden');
            
            // Remove the timer to avoid multiple alerts
            timers = timers.filter(t => t !== timer);
        }
    });
}

// Check every minute
setInterval(checkTimers, 60000);

document.getElementById('close-alarm').addEventListener('click', function() {
    const alarmSound = document.getElementById('alarm-sound');
    alarmSound.pause();
    alarmSound.currentTime = 0;
    
    // Hide the close button
    const closeButton = document.getElementById('close-alarm');
    closeButton.classList.add('hidden');
});
