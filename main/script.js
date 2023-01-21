const DEFAULT_TEXT_COLOR = 'black';
const INCORRECT_COLOR = 'red';
const CORRECT_COLOR = 'green';

const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';

const lesson = document.querySelector('#lesson');
const input = document.querySelector('#input');

let lessonText = "";

input.value = "";
let letterIndex = 0;
let timeStarted;


goToNextQuote();
input.addEventListener('input', symbolTyped);

async function goToNextQuote() {
    const quote = await loadQuote();
    lesson.textContent = quote;
    lessonText = quote;
    initLetterColorSpans();
}

function loadQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content);
}

function symbolTyped() {
    const symbol = getLastLetter(input.value);
    const target = getCurrentLetter();
    markLetter(symbol === target);
    letterIndex++;
    if (letterIndex === 1) {
        timeStarted = new Date();
    }
    if (letterIndex === lessonText.length) {
        finish();
    }
}

function finish() {
    const timeFinished = new Date();
    const timePassedSec = (timeFinished.getTime() - timeStarted.getTime()) / 1000;
    const lps = lessonText.length / timePassedSec * 60;
    show(`Twoje tempo wynosi: ${lps}`);

}

function initLetterColorSpans() {
    let result = "";
    for (let i = 0; i < lessonText.length; i++) {
        const letter = lessonText[i];
        const spansText = `<span id="lesson-letter-${i}" style="color:${DEFAULT_TEXT_COLOR};">${letter}</span>`;
        result += spansText;
    }
    lesson.innerHTML = result;
}


function show(text) {
    const display = document.querySelector('#display');
    display.innerHTML = text;
}

function markLetter(correct) {
    let color = correct ? CORRECT_COLOR : INCORRECT_COLOR;
    let letterElement = document.querySelector(`#lesson-letter-${letterIndex}`);
    letterElement.setAttribute('style', `color:${color}`);
}

function getLastLetter(text) {
    return text.charAt(text.length - 1);
}

function getCurrentLetter() {
    return lessonText[letterIndex];
}

