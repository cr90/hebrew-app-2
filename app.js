let lastGeneratedNumber = null; // Variable to store the last generated number in words

function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 3000); // Generate a number between 0 and 2999

    // Update the number display with the numeric value
    document.getElementById('numeric-number').innerText = randomNumber;
    
    // Convert the number to words and store it
    const numberInWords = numberToWords(randomNumber);
    lastGeneratedNumber = numberInWords; // Store the last generated number in words
    
    // Translate and read aloud the number
    readAloud(numberInWords);
}

function repeatNumber() {
    if (lastGeneratedNumber) {
        // If a number was generated, repeat it
        readAloud(lastGeneratedNumber);
    } else {
        alert('No number has been generated yet!'); // Alert if no number was generated yet
    }
}

async function readAloud(numberInWords) {
    const translatedText = await translateToHebrew(numberInWords);

    // Update the Hebrew number display
    document.getElementById('hebrew-number').innerText = translatedText;

    const utterance = new SpeechSynthesisUtterance(translatedText);

    // Set the language to Hebrew
    utterance.lang = 'he-IL';

    // Speak the text in Hebrew
    speechSynthesis.speak(utterance);
}

async function translateToHebrew(words) {
    // Call Google Translate API to convert the words to Hebrew
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=he&dt=t&q=${encodeURIComponent(words)}`);
    const result = await response.json();
    return result[0][0][0]; // Return the translated Hebrew text
}

// Function to convert numbers to words
function numberToWords(number) {
    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    let words = "";

    if (Math.floor(number / 1000) > 0) {
        words += ones[Math.floor(number / 1000)] + " thousand ";
        number %= 1000;
    }

    if (Math.floor(number / 100) > 0) {
        words += ones[Math.floor(number / 100)] + " hundred ";
        number %= 100;
    }

    if (number > 10 && number < 20) {
        words += teens[number - 11];
    } else {
        if (Math.floor(number / 10) > 0) {
            words += tens[Math.floor(number / 10)] + " ";
            number %= 10;
        }
        if (number > 0) {
            words += ones[number];
        }
    }

    return words.trim();
}
