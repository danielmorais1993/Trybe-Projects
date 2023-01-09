function phoneNumberFormation(ArrayTest) {
  let PhoneNumberA = ['('] + ArrayTest[0] + ArrayTest[1] + [') '];
  let PhoneNumberB = [] + ArrayTest[2] + ArrayTest[3] + ArrayTest[4] + ArrayTest[5] + ArrayTest[6];
  let PhoneNumberC = ['-'] + ArrayTest[7] + ArrayTest[8] + ArrayTest[9] + ArrayTest[10];

  let PhoneNumber = PhoneNumberA + PhoneNumberB + PhoneNumberC;
  return PhoneNumber;
}
function checkNumberRepeatitions(ArrayTest) {
  let Result = ArrayTest.filter((elem, index, array) => array.indexOf(elem) !== index);
  let Result2 = Result.filter((elem, index, array) => array.indexOf(elem) !== index);

  if (Result2.length > 0) {
    return 'não é possível gerar um número de telefone com esses valores';
  }
  return phoneNumberFormation(ArrayTest);
}

// Desafio 11
function generatePhoneNumber(ArrayTest) {
  if (ArrayTest.length !== 11) {
    return 'Array com tamanho incorreto.';
  }

  for (let i = 0; i < ArrayTest.length; i += 1) {
    if (ArrayTest[i] < 0 || ArrayTest[i] > 9) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
  }
  return checkNumberRepeatitions(ArrayTest);
}
// Desafio 12
function checkSum(sideA, sideB, sideC) {
  if (sideA < sideB + sideC && (sideC < sideA + sideB) && (sideB < sideA + sideC)) {
    return true;
  }
  return false;
}
function checkDiff(sideA, sideB, sideC) {
  let diffBC = sideB - sideC;
  let diffAB = sideA - sideB;
  let diffAC = sideA - sideC;
  if (sideA > Math.abs(diffBC) && sideC > Math.abs(diffAB) && sideB > Math.abs(diffAC)) {
    return true;
  }
  return false;
}
function triangleCheck(lineA, lineB, lineC) {
  let diffCheck = checkDiff(lineA, lineB, lineC);
  let SumCheck = checkSum(lineA, lineB, lineC);
  return (diffCheck && SumCheck);
}
// Desafio 13

function sumArray(ArrayTest) {
  let resultado = 0;
  for (let i = 0; i < ArrayTest.length; i += 1) {
    resultado += ArrayTest[i];
  }
  return resultado;
}

function hydrate(StringTest) {
  let numbersOnString = [];
  let numberVerify = (/\d+/g);

  let numberExtracted = StringTest.match(numberVerify);
  let pluralDrinkWater = ' copos de água';
  let singularDrinkwater = ' copo de água';

  for (let i = 0; i < numberExtracted.length; i += 1) {
    numbersOnString.push(parseInt(numberExtracted[i], 10));
  }
  if (sumArray(numbersOnString) > 1) {
    return sumArray(numbersOnString) + pluralDrinkWater;
  }
  return sumArray(numbersOnString) + singularDrinkwater;
}
module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};
