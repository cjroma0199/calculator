const MAX_CHARACTERS = 12;
const buttons = document.querySelectorAll('.button');
const currentScreen = document.querySelector('#currentScreen');
const previousScreen = document.querySelector('#previousScreen');
const deleteImg = document.querySelector('#deleteImg');

deleteImg.addEventListener('click', deleteChar);

const operandsAndOperator = {
  firstNum: null,
  operator: null,
  secondNum: null,
};

buttons.forEach((button) =>
  button.addEventListener('click', (e) => {
    app(e);
  })
);
window.addEventListener('keydown', (e) => {
  if (isScreenFull) return;
  if (isNumber(getChar(e)) || (getChar(e) == '.' && isDecimalPresent())) {
  }
});

function operate({ firstNum, operator, secondNum }) {
  firstNum = +firstNum;
  secondNum = +secondNum;
  console.log([firstNum, operator, secondNum]);
  switch (operator) {
    case '+':
      return firstNum + secondNum;
    case '-':
      return firstNum - secondNum;
    case '*':
      return firstNum * secondNum;
    case '/':
      return firstNum / secondNum;
    case '%':
      return firstNum % secondNum;
    default:
      return null;
  }
}

function app(e) {
  let char = getChar(e);

  if (isDelete(e)) return deleteChar();

  if (isOperator(e)) {
    if (!operandsAndOperator.operator) operandsAndOperator.operator = getChar(e);
    if (previousScreen.textContent) {
      operandsAndOperator.secondNum = currentScreen.textContent;
    } else {
      operandsAndOperator.firstNum = currentScreen.textContent;
      updatePreviousScreen(operandsAndOperator);
      clearScreen(currentScreen);
    }

    if (operandsAndOperator.firstNum && operandsAndOperator.secondNum) {
      operandsAndOperator.firstNum = operate(operandsAndOperator);
      operandsAndOperator.operator = getChar(e);
      updatePreviousScreen(operandsAndOperator);
      clearScreen(currentScreen);
    }
  }
  console.log(e);
  if (isScreenFull()) return;
  if (isNumber(char) || (char == '.' && !isDecimalPresent())) {
    addToLowerScreen(char);
  }
}

function updatePreviousScreen(data) {
  return (previousScreen.textContent = `${data.firstNum} ${operator.convert(
    data.operator
  )}`);
}

const operator = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷',
  '%': '%',
  convert(operator) {
    return this[operator];
  },
};

function clearScreen(screen) {
  return (screen.textContent = '');
}

function isScreenFull() {
  return currentScreen.textContent.length == MAX_CHARACTERS;
}

function isDelete(e) {
  if (e instanceof MouseEvent) return e.target.id == 'delete';
  return e.key == 'Backspace';
}

function isNumber(char) {
  return '1234567890'.includes(Math.abs(char));
}

function isDecimalPresent() {
  return currentScreen.textContent.includes('.');
}

function getChar(e) {
  if (e instanceof MouseEvent) return e.target.dataset.button;
  return e.key;
}

function isOperator(e) {
  let operators = '+-*/%';
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
