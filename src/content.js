let rateLimitDuration = 10500000; // 10,500,000 milliseconds
let maxActions = 50;

const handleAction = function() {
    const currentTime = Date.now();
    const expirationTime = currentTime - rateLimitDuration;
    let actionTimestamps = JSON.parse(localStorage.getItem('actionTimestamps')) || [];
    actionTimestamps = actionTimestamps.filter(entry => entry.timestamp >= expirationTime);

    const currentDate = new Date(currentTime);
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentTimeString = `${currentHour}:${currentMinute}`;

    if (actionTimestamps.length >= maxActions) {
        alert(`You have reached the limit of ${maxActions} actions within the specified time limit.`);
        return false;
    }

    const firstWarningThreshold = Math.floor(maxActions * 0.5);
    const secondWarningThreshold = Math.floor(maxActions * 0.8);

    if (actionTimestamps.length >= firstWarningThreshold) {
        alert(`You are approaching the limit. You have ${maxActions - actionTimestamps.length} actions left within the specified time limit.`);
    }

    if (actionTimestamps.length >= secondWarningThreshold) {
        alert(`You are approaching the limit. You have ${maxActions - actionTimestamps.length} actions left within the specified time limit.`);
    }

    const actionEntry = { timestamp: currentTime, timeString: currentTimeString };
    actionTimestamps.push(actionEntry);
    localStorage.setItem('actionTimestamps', JSON.stringify(actionTimestamps));

    const displayTimes = actionTimestamps.map(entry => entry.timeString);
    console.info(`Action triggered at ${currentTimeString}. Updated actionTimestamps (HH:MM):`, displayTimes);  // Debugging information

    return true;
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const enterTimeString = `${new Date().getHours()}:${new Date().getMinutes()}`;
        console.info(`Enter key pressed at ${enterTimeString}.`);  // Debugging information
        if (!handleAction()) {
            event.preventDefault();
        }
    }
});

document.body.addEventListener('click', function(event) {
    const clickedElement = event.target;
    if (clickedElement.closest('button[data-testid="send-button"]')) {
        const buttonClickTimeString = `${new Date().getHours()}:${new Date().getMinutes()}`;
        console.info(`Button clicked at ${buttonClickTimeString}.`);  // Debugging information
        if (!handleAction()) {
            event.preventDefault();
        }
    }
});
