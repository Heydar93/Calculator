const resultInput = document.getElementById('input');

function clearInput() {
  resultInput.value = '0';
}

function appendCharacter(character) {
  if (resultInput.value === '0') {
    resultInput.value = '';
  }
  resultInput.value += character;
}

function calculateResult() {
  const expression = resultInput.value.trim();

  if (expression === '') {
    resultInput.value = 'Please enter a valid expression.';
    return;
  }

  const result = evaluateExpression(expression);

  if (result === null) {
    resultInput.value = 'Invalid expression. Please enter a valid expression.';
    return;
  }

  resultInput.value = formatResult(result);
}

function evaluateExpression(expression) {
  const operands = extractOperands(expression);
  const operator = extractOperator(expression);

  if (operands.length !== 2 || !operator) {
    return null;
  }

  const x = parseFloat(operands[0]);
  const y = parseFloat(operands[1]);

  switch (operator) {
    case '+':
      return add(x, y);
    case '-':
      return subtract(x, y);
    case '*':
      return multiply(x, y);
    case '/':
      return divide(x, y);
    default:
      return null;
  }
}

function extractOperands(expression) {
  const operands = [];
  let currentOperand = '';
  let isDecimal = false;

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (isNumeric(char) || (char === '.' && !isDecimal)) {
      currentOperand += char;
      if (char === '.') {
        isDecimal = true;
      }
    } else {
      operands.push(currentOperand);
      currentOperand = '';
      isDecimal = false;
    }
  }

  operands.push(currentOperand);

  return operands;
}

function extractOperator(expression) {
  const operators = ['+', '-', '*', '/'];

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (operators.includes(char)) {
      return char;
    }
  }

  return null;
}

function isNumeric(char) {
  return !isNaN(parseFloat(char)) && isFinite(char);
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === 0) {
    return null;
  }
  return x / y;
}

function formatResult(result) {
  if (Number.isInteger(result)) {
    return result.toString();
  }
  return result.toFixed(2);
}

function handleKeyboardEvent(event) {
  const keyPressed = event.key;

  if (keyPressed === 'Enter') {
    calculateResult();
  } else if (/^[0-9+\-*/.\r\n]$/.test(keyPressed)) {
    appendCharacter(keyPressed);
  }
}

document.addEventListener('keydown', handleKeyboardEvent);
