const lesson = document.querySelector('#lesson');
const input = document.querySelector('#input');

input.addEventListener('input', symbolTyped);

let letterIndex = 0;
function symbolTyped(){

    const symbol = getLastLetter(input.value);
    const target = getCurrentLetter();
    show(target);
    letterIndex++;
}



function show(text){
    const display = document.querySelector('#display');
    display.innerHTML = text;
}

function getLastLetter(text){
    return text.charAt(text.length - 1);
}

function getCurrentLetter(){
    return lesson.innerHTML[letterIndex];
}

