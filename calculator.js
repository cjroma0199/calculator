const MAX_CHARACTERS = 12;
const buttons = document.querySelectorAll('.button');
const currentScreen = document.querySelector('#currentScreen');
const previousScreen = document.querySelector('#previousScreen');
const deleteImg = document.querySelector('#deleteImg');
const allClearButton = document.querySelector('#allClear');

deleteImg.addEventListener('click', deleteChar);
allClearButton.addEventListener('click', allClear);

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
  app(e);
});

function operate({ firstNum, operator, secondNum }) {
  firstNum = +firstNum;
  secondNum = +secondNum;
  switch (operator) {
    case '+':
      ans = firstNum + secondNum;
      break;
    case '-':
      ans = firstNum - secondNum;
      break;
    case '*':
      ans = firstNum * secondNum;
      break;
    case '/':
      ans = firstNum / secondNum;
      break;
    case '%':
      ans = firstNum % secondNum;
      break;
    default:
      ans = null;
      break;
  }
  if (ans.toString().length > 10) return ans.toExponential(4);
  return ans;
}

function app(e) {
  let char = getChar(e);

  if (isDelete(e)) return deleteChar();

  if (isOperator(e)) {
    if (!operandsAndOperator.operator) operandsAndOperator.operator = getChar(e);
    if (previousScreen.textContent && !currentScreen.textContent.includes('=')) {
      operandsAndOperator.secondNum = currentScreen.textContent;
    } else {
      operandsAndOperator.firstNum = currentScreen.textContent.includes('=')
        ? currentScreen.textContent.slice(1)
        : currentScreen.textContent;
      updatePreviousScreen(operandsAndOperator);
      clearScreen(currentScreen);
    }

    if (operandsAndOperator.secondNum) {
      operandsAndOperator.firstNum = operate(operandsAndOperator);
      operandsAndOperator.operator = getChar(e);
      operandsAndOperator.secondNum = null;
      updatePreviousScreen(operandsAndOperator);
      clearScreen(currentScreen);
    }
  }

  if (isEquals(e)) {
    if (currentScreen.textContent && operandsAndOperator.operator) {
      operandsAndOperator.secondNum = currentScreen.textContent;
    }
    if (!Object.values(operandsAndOperator).includes(null)) {
      updatePreviousScreen(operandsAndOperator);
      operandsAndOperator.firstNum = operate(operandsAndOperator);
      currentScreen.textContent = `= ${operandsAndOperator.firstNum}`;
      operandsAndOperator.operator = null;
      operandsAndOperator.secondNum = null;
    }
  }

  if (isScreenFull()) return;
  if (isNumber(char) || (char == '.' && !isDecimalPresent())) {
    addToLowerScreen(char);
  }
}

function updatePreviousScreen({ firstNum, operator, secondNum }) {
  if (!secondNum) {
    return (previousScreen.textContent = `${firstNum} ${operatorCon.convert(operator)}`);
  }
  return (previousScreen.textContent = `${firstNum} ${operatorCon.convert(
    operator
  )} ${secondNum}`);
}

const operatorCon = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷',
  '%': '%',
  convert(operator) {
    return this[operator];
  },
};

function allClear() {
  currentScreen.textContent = '0';
  previousScreen.textContent = '';
  operandsAndOperator.firstNum = null;
  operandsAndOperator.operator = null;
  operandsAndOperator.secondNum = null;
}

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

function isEquals(e) {
  if (e instanceof MouseEvent) return e.target.id == 'equals';
  return e.key == 'Enter';
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
  if (currentScreen.textContent === '' && char == '.') {
    return (currentScreen.textContent = `0${char}`);
  }
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
  currentScreen.textContent = screenValue.slice(0, screenValue.length - 1);
}
