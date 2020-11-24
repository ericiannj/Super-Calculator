const globalCalculations = [
  {
    id: 1,
    description: 'Addition (a + b):',
    calculationFunction: function sum(a, b) {
      return a + b;
    },
    type: 'a_b',
  },

  {
    id: 2,
    description: 'Subtraction I (a - b):',
    calculationFunction: function subtract(a, b) {
      return a - b;
    },
    type: 'a_b',
  },

  {
    id: 3,
    description: 'Subtraction II (b - a):',
    calculationFunction: function subtract(b, a) {
      return b - a;
    },
    type: 'b_a',
  },

  {
    id: 4,
    description: 'Multiplication (a x b):',
    calculationFunction: function multiply(a, b) {
      return formatNumber(a * b);
    },
    type: 'a_b',
  },

  {
    id: 5,
    description: 'Division I (a ÷ b):',
    calculationFunction: function division(a, b) {
      return getDivisionFrom(a, b);
    },
    type: 'a_b',
  },

  {
    id: 6,
    description: 'Division II (b ÷ a):',
    calculationFunction: function division(b, a) {
      return getDivisionFrom(b, a);
    },
    type: 'b_a',
  },

  {
    id: 7,
    description: 'Square of A (a²):',
    calculationFunction: function square(a) {
      return formatNumber(a ** 2);
    },
    type: 'a',
  },

  {
    id: 8,
    description: 'Square of B (b²):',
    calculationFunction: function square(b) {
      return formatNumber(b ** 2);
    },
    type: 'b',
  },

  {
    id: 9,
    description: 'Integer Divisors of A:',
    calculationFunction: function divisorsFrom(a) {
      return getDivisorsFrom(a);
    },
    type: 'a',
  },

  {
    id: 10,
    description: 'Integer Divisors of B:',
    calculationFunction: function divisorsFrom(b) {
      return getDivisorsFrom(b);
    },
    type: 'b',
  },

  {
    id: 11,
    description: 'Factorial of A (a!):',
    calculationFunction: function factorial(a) {
      return getFactorialFrom(a);
    },
    type: 'a',
  },

  {
    id: 12,
    description: 'Factorial of B (b!):',
    calculationFunction: function factorial(b) {
      //A traditional example of Recursiviness is the factorial solution
      return formatNumber(getFactorialRecursive(b));
    },
    type: 'b',
  },

  {
    id: 13,
    description: 'Square root of A:',
    calculationFunction: function squareRoot(a) {
      return formatNumber(Math.sqrt(a));
    },
    type: 'a',
  },

  {
    id: 14,
    description: 'Square root of B:',
    calculationFunction: function squareRoot(b) {
      return formatNumber(Math.sqrt(b));
    },
    type: 'b',
  },
];

const globalInputA = document.querySelector('#inputA');
const globalInputB = document.querySelector('#inputB');

function start() {
  globalInputA.addEventListener('input', handleChangeInputA);
  globalInputB.addEventListener('input', handleChangeInputB);

  calculate();
}

function handleChangeInputA() {
  calculate();
}

function handleChangeInputB() {
  calculate();
}

function calculate() {
  const divCalculations = document.querySelector('#calculations');

  const innerCalculations = document.createElement('div');
  innerCalculations.classList.add('row');

  let a = parseInt(globalInputA.value, 10);
  let b = parseInt(globalInputB.value, 10);

  for (let i = 0; i < globalCalculations.length; i++) {
    let currentCalculation = globalCalculations[i];

    let type = currentCalculation.type;
    let calculationFunction = currentCalculation.calculationFunction;

    let id = 'input_' + currentCalculation.id;

    let value = getCalculationFrom(type, calculationFunction, a, b);

    let div = getMaterializeDiv();
    let input = getMaterializeInput(id, value);
    let label = getMaterializeLabel(id, currentCalculation.description);

    div.appendChild(label);
    div.appendChild(input);
    innerCalculations.appendChild(div);
  }

  divCalculations.innerHTML = '';
  divCalculations.appendChild(innerCalculations);
}

function getMaterializeDiv() {
  let div = document.createElement('div');
  div.classList.add('input-field', 'col', 's12', 'm6', 'l4');

  return div;
}

function getMaterializeInput(id, value) {
  var input = document.createElement('input');
  input.readOnly = true;
  input.type = 'text';
  input.id = id;
  input.value = value;

  return input;
}

function getMaterializeLabel(id, description) {
  var label = document.createElement('label');
  label.for = id;
  label.textContent = description;
  label.classList.add('active');

  return label;
}

function getCalculationFrom(type, calculationFunction, a, b) {
  var value = '';

  switch (type) {
    case 'a':
      value = calculationFunction(a);
      break;

    case 'b':
      value = calculationFunction(b);
      break;

    case 'a_b':
      value = calculationFunction(a, b);
      break;

    case 'b_a':
      value = calculationFunction(b, a);
      break;

    default:
      value = 'The type of calculation was not identified.';
  }

  return value;
}

function getDivisionFrom(number1, number2) {
  if (number2 === 0) {
    return 'Division by 0';
  }

  return formatNumber((number1 / number2).toFixed(2));
}

function formatNumber(number) {
  return new Intl.NumberFormat('pt-BR').format(number);
}

function getDivisorsFrom(number) {
  var divisors = [];

  for (var i = 1; i <= number; i++) {
    if (number % i === 0) {
      divisors.push(i);
    }
  }

  return divisors.join(', ') + ' (' + divisors.length + ')';
}

function getFactorialFrom(number) {
  if (number > 21) {
    return 'Very large number!';
  }

  var factorial = 1;

  for (var i = number; i > 1; i--) {
    factorial *= i;
  }

  return formatNumber(factorial);
}

function getFactorialRecursive(number) {
  if (number > 21) {
    return 'Very large number!';
  }

  if (number <= 1) {
    return 1;
  }

  return number * getFactorialRecursive(number - 1);
}

start();
