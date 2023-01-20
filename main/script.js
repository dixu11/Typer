console.log('hello world');
const lesson = document.querySelector('#lesson');
const input = document.querySelector('#input');
input.addEventListener('input', symbolTyped);

function symbolTyped(){
    const symbol = input.value;
    show(symbol);
}




function show(text){
    const display = document.querySelector('#display');
    display.innerHTML = text;
}

