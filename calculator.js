const MAX_CHARACTERS = 13;
const buttons = document.querySelectorAll('.button');
const currentScreen = document.querySelector('#currentScreen');
const deleteImg = document.querySelector('#deleteImg');

deleteImg.addEventListener('click', deleteChar);

buttons.forEach((button) =>
  button.addEventListener('click', (e) => {
    let char = getChar(e);
    console.log(e);
    if (isScreenFull() && !isDelete(e)) return;
    if (isNumber(char) || (char == '.' && !isDecimalPresent())) {
      addToLowerScreen(char);
    }

    if (isDelete(e)) return deleteChar();
  })
);
window.addEventListener('keydown', (e) => {
  if (isScreenFull) return;
  if (isNumber(getChar(e)) || (getChar(e) == '.' && isDecimalPresent())) {
  }
});

function isScreenFull() {
  return currentScreen.textContent.length == MAX_CHARACTERS;
}

function isDelete(e) {
  if (e instanceof MouseEvent) return e.target.id == 'delete';
  return e.key == 'Backspace';
}

function isNumber(char) {
  return Boolean(Number(char));
}

function isDecimalPresent() {
  return currentScreen.textContent.includes('.');
}

function getChar(e) {
  if (e instanceof MouseEvent) return e.target.dataset.button;
  return e.key;
}

function isOperator(e) {
  let operators = '+-*/';
  return operators.includes(getChar(e));
}

function addToLowerScreen(char) {
  if (currentScreen.textContent === '0' && char != '.') {
    currentScreen.textContent = char;
    return;
  }

  currentScreen.textContent += char;
  return;
}

function deleteChar() {
  let screenValue = currentScreen.textContent;
  if (screenValue.length === 1) return (currentScreen.textContent = 0);
  console.log(screenValue);
  currentScreen.textContent = screenValue.slice(0, screenValue.length - 1);
}
