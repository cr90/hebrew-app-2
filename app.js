function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 2999); // Generate a number between 0 and 999
    document.getElementById('number-display').innerText = 'Number: ' + randomNumber;

    // Call Google Translate API to get the number in Hebrew and read it aloud
    readAloud(randomNumber);
}

async function readAloud(number) {
    const translatedText = await translateToHebrew(number);
    const utterance = new SpeechSynthesisUtterance(translatedText);
    speechSynthesis.speak(utterance);
}

async function translateToHebrew(number) {
    // Call Google Translate API to convert the number to Hebrew
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=he&dt=t&q=${number}`);
    const result = await response.json();
    return result[0][0][0]; // Get the translated Hebrew number
}
