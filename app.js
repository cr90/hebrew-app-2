let lastGeneratedHebrew = null; // Variable to store the last generated Hebrew translation
let maxRange = 100; // Default range is 1-100
let autoplayInterval = null; // Variable to store the interval ID

// Function to handle active button state
function setActiveButton(button) {
    // Remove 'active' class from all buttons
    document.querySelectorAll('.range-button').forEach(btn => {
        btn.classList.remove('active');
    });
    // Add 'active' class to the clicked button
    button.classList.add('active');
}

// Automatically set the default active button on page load
window.addEventListener('load', function() {
    const defaultButton = document.getElementById('range-0-100'); // Assuming 100 is the default
    setActiveButton(defaultButton); // Highlight the default button
    maxRange = 100; // Set the default range logic to 100
});

// Function to start autoplay
function startAutoplay() {
    const intervalTime = parseInt(document.getElementById('interval-time').value) * 1000; // Get interval time in milliseconds

    if (isNaN(intervalTime) || intervalTime <= 0) {
        return;
    }

    if (autoplayInterval) {
        clearInterval(autoplayInterval); // Clear any existing autoplay
    }

    autoplayInterval = setInterval(() => {
        generateNewRandomNumber(); // Generate a random number at each interval
    }, intervalTime);

    // Change the "Start Autoplay" button to the darker grey
    document.getElementById('start-autoplay').classList.add('active-autoplay');
}

// Function to stop autoplay
function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval); // Stop the autoplay
        autoplayInterval = null;
    } 
        // Revert the "Start Autoplay" button back to the original light grey
        document.getElementById('start-autoplay').classList.remove('active-autoplay');
}

// Event listeners for autoplay buttons
document.getElementById('start-autoplay').addEventListener('click', startAutoplay);
document.getElementById('stop-autoplay').addEventListener('click', stopAutoplay);


// Function to handle active button state
function setActiveButton(button) {
    // Remove 'active' class from all buttons
    document.querySelectorAll('.range-button').forEach(btn => {
        btn.classList.remove('active'); // Remove active state from all buttons
    });
    // Add 'active' class to the clicked button
    button.classList.add('active');
}

// Event listeners for range buttons
document.getElementById('range-0-100').addEventListener('click', (event) => {
    maxRange = 100;
    setActiveButton(event.target); // Set this button as active
});

document.getElementById('range-0-3000').addEventListener('click', (event) => {
    maxRange = 3000;
    setActiveButton(event.target); // Set this button as active
});

document.getElementById('range-0-10000').addEventListener('click', (event) => {
    maxRange = 10000;
    setActiveButton(event.target); // Set this button as active
});


async function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * maxRange) + 1; // Generate a number between 1 and the current maxRange

    // Update the number display with the numeric value
    document.getElementById('numeric-number').innerText = randomNumber;

    // Convert the number to Hebrew words
    const numberInHebrew = await customNumberToHebrew(randomNumber); // Await the result

    // Store the last generated Hebrew number for repeat functionality
    lastGeneratedHebrew = numberInHebrew;

    // Update the Hebrew number display and read aloud
    readAloud(numberInHebrew);
}

async function generateNewRandomNumber() {
    const randomNumber = Math.floor(Math.random() * maxRange) + 1; // Generate a number between 1 and the current maxRange

    // Update the number display with the numeric value
    document.getElementById('numeric-number').innerText = randomNumber;

    // Convert the number to Hebrew words
    const numberInHebrew = await customNumberToHebrew(randomNumber); // Await the result

    // Store the last generated Hebrew number for repeat functionality
    lastGeneratedHebrew = numberInHebrew;

    // Update the Hebrew number display and read aloud
    readAloud(numberInHebrew);
}

function repeatNumber() {
    if (lastGeneratedHebrew) {
        // If a Hebrew number was generated, repeat it
        readAloud(lastGeneratedHebrew);
    } else {
    }
}

async function readAloud(hebrewWords) {
    // Update the Hebrew number display
    document.getElementById('hebrew-number').innerText = hebrewWords;

    const utterance = new SpeechSynthesisUtterance(hebrewWords);

    // Set the language to Hebrew
    utterance.lang = 'he-IL';

    // Speak the text in Hebrew
    speechSynthesis.speak(utterance);
}

/// Custom function to handle special cases and fall back to translation for others
async function customNumberToHebrew(number) {
    // Handle specific manual ranges or numbers less than or equal to 1000
    if (
        number <= 10000 || // Handle all numbers up to 1000 manually
        (number >= 1001 && number <= 1009) || 
        (number >= 1020 && number <= 2000) || 
        (number >= 2001 && number <= 2009) || 
        (number >= 2020 && number <= 3000)
    ) {
        console.log(`Using manualNumberToHebrew for number: ${number}`);
        return manualNumberToHebrew(number); // Use manual conversion for these ranges
    } else {
        // For numbers outside of the above ranges, use Google Translate
        const numberInWords = number.toString(); // Convert the number to a string
        console.log(`Using Google Translate for number: ${number}`);
        return await translateToHebrew(numberInWords); // Translate the English words to Hebrew
    }
}

function manualNumberToHebrew(number) {
    const ones = ["", "אחת", "שתיים", "שלוש", "ארבע", "חמש", "שש", "שבע", "שמונה", "תשע"];
    const tens = ["", "עשר", "עשרים", "שלושים", "ארבעים", "חמישים", "שישים", "שבעים", "שמונים", "תשעים"];
    const hundreds = ["", "מאה", "מאתיים", "שלוש מאות", "ארבע מאות", "חמש מאות", "שש מאות", "שבע מאות", "שמונה מאות", "תשע מאות"];
    const thousands = ["", "אלף", "אלפיים", "שלושת אלפים", "ארבעת אלפים", "חמשת אלפים", "ששת אלפים", "שבעת אלפים", "שמונת אלפים", "תשעת אלפים", "עשרת אלפים"];

    let words = "";

    // Handle thousands
    if (number >= 1000) {
        words += thousands[Math.floor(number / 1000)] + " ";
        number %= 1000; // Process the remainder after removing the thousands part
    }

    // Handle hundreds
    if (number >= 100) {
        words += hundreds[Math.floor(number / 100)] + " ";
        number %= 100; // Process the remainder after removing the hundreds part
    }

    // Handle numbers between 11 and 19
    if (number >= 11 && number <= 19) {
        const teens = ["", "אחת עשרה", "שתיים עשרה", "שלוש עשרה", "ארבע עשרה", "חמש עשרה", "שש עשרה", "שבע עשרה", "שמונה עשרה", "תשע עשרה"];
        words += teens[number - 10];
        return words.trim(); // Return early since it's a special case
    }

    // Handle tens
    if (number >= 20) {
        words += tens[Math.floor(number / 10)] + " ";
        number %= 10;
    }

    // Handle exact tens like 10
    if (number === 10) {
        words += "עשר";
        return words.trim();
    }

    // Handle ones
    if (number > 0) {
        if (words) {
            words += " ו"; // Insert 'ו' (ve) for proper pronunciation
        }
        words += ones[number];
    }

    return words.trim();
}

// Fallback to using Google Translate for other numbers
async function translateToHebrew(words) {
    // Call Google Translate API to convert the words to Hebrew
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=he&dt=t&q=${encodeURIComponent(words)}`);
    const result = await response.json();
    return result[0][0][0]; // Return the translated Hebrew text
}
