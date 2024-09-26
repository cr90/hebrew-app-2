let lastGeneratedHebrew = null; // Variable to store the last generated Hebrew translation

async function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 3000); // Generate a number between 0 and 2999

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
    const randomNumber = Math.floor(Math.random() * 3000); // Generate a number between 0 and 2999

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
        alert('No number has been generated yet!');
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

// Custom function to handle special cases and fall back to translation for others
async function customNumberToHebrew(number) {
    // Handle specific manual ranges
    if (
        (number >= 1001 && number <= 1009) || 
        (number >= 1020 && number <= 2000) || 
        (number >= 2001 && number <= 2009) || 
        (number >= 2020 && number <= 3000)
    ) {
        return manualNumberToHebrew(number); // Use manual conversion for these ranges
    } else {
        // For 0-999 and other numbers, convert to words in English and then translate to Hebrew
        const numberInWords = number.toString(); // Convert the number to a string
        return await translateToHebrew(numberInWords); // Translate the English words to Hebrew
    }
}

// Function to manually convert numbers in the specified ranges
function manualNumberToHebrew(number) {
    const ones = ["", "אחת", "שתיים", "שלוש", "ארבע", "חמש", "שש", "שבע", "שמונה", "תשע"];
    const tens = ["", "עשר", "עשרים", "שלושים", "ארבעים", "חמישים", "שישים", "שבעים", "שמונים", "תשעים"];
    const hundreds = ["", "מאה", "מאתיים", "שלוש מאות", "ארבע מאות", "חמש מאות", "שש מאות", "שבע מאות", "שמונה מאות", "תשע מאות"];
    const thousands = ["", "אלף", "אלפיים", "שלושת אלפים"];

    let words = "";

    if (number >= 1000) {
        words += thousands[Math.floor(number / 1000)] + " ";
        number %= 1000;
    }

    if (number >= 100) {
        words += hundreds[Math.floor(number / 100)] + " ";
        number %= 100;
    }

    if (number >= 20) {
        words += tens[Math.floor(number / 10)] + " ";
        number %= 10;
    }

    if (number > 0) {
        if (words) {
            words += " ו"; // Insert 'ו' (and) before the last part to ensure "ve" pronunciation
        }
        words += ones[number];
    }

    return words.trim();
}

// Add this to handle numbers between 11 and 19
const teens = ["", "אחת עשרה", "שתיים עשרה", "שלוש עשרה", "ארבע עשרה", "חמש עשרה", "שש עשרה", "שבע עשרה", "שמונה עשרה", "תשע עשרה"];

// Function to convert numbers to English words (0-999)
function manualNumberToHebrew(number) {
    const ones = ["", "אחת", "שתיים", "שלוש", "ארבע", "חמש", "שש", "שבע", "שמונה", "תשע"];
    const tens = ["", "עשר", "עשרים", "שלושים", "ארבעים", "חמישים", "שישים", "שבעים", "שמונים", "תשעים"];
    const hundreds = ["", "מאה", "מאתיים", "שלוש מאות", "ארבע מאות", "חמש מאות", "שש מאות", "שבע מאות", "שמונה מאות", "תשע מאות"];
    const thousands = ["", "אלף", "אלפיים", "שלושת אלפים"];

    let words = "";

    if (number >= 1000) {
        words += thousands[Math.floor(number / 1000)] + " ";
        number %= 1000;
    }

    if (number >= 100) {
        words += hundreds[Math.floor(number / 100)] + " ";
        number %= 100;
    }

    // Handle numbers between 11 and 19 separately
    if (number >= 11 && number <= 19) {
        words += teens[number - 10];
        return words.trim(); // Return early since it's a special case
    }

    if (number >= 20) {
        words += tens[Math.floor(number / 10)] + " ";
        number %= 10;
    }

    if (number > 0) {
        if (words) {
            words += " ו"; // Insert 'ו' (ve) before the last part for correct pronunciation
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
