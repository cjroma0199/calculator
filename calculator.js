const MAX_CHARACTERS = 13;
const buttons = document.querySelectorAll('.button');
const currentScreen = document.querySelector('#currentScreen');

buttons.forEach((button) =>
  button.addEventListener('click', (e) => console.log(isOperator(e)))
);
window.addEventListener('keydown', (e) => console.log(isOperator(e)));

function isScreenFull() {
  return currentScreen.textContent.length == MAX_CHARACTERS;
}

function isDelete(e) {
  if (e instanceof MouseEvent) return e.target.id == 'delete';
  return e.key == 'Backspace';
}

function getChar(e) {
  if (e instanceof MouseEvent) return e.target.dataset.button;
  return e.key;
}

function isOperator(e) {
  let operators = '+-*/';
  return operators.includes(getChar(e));
}
