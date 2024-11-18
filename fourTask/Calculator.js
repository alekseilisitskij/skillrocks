class Calculator {
  add = (a, b) => {
    return a + b;
  };

  subtract = (a, b) => {
    return a - b;
  };

  multiply = (a, b) => {
    return a * b;
  };

  divide = (a, b) => {
    if (a === 0 || b === 0) {
      return "Ошибка";
    }
    return a / b;
  };
}

const res = new Calculator();
console.log(res.add(4, 9));
console.log(res.subtract(4, 9));
console.log(res.multiply(4, 9));
console.log(res.divide(4, 0));
