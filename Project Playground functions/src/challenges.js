// Desafio 1
function compareTrue(Value1, Value2) {
  if (Value1 === true && Value2 === true) {
    return true;
  }
  return false;
}

// Desafio 2
function calcArea(base, height) {
  let TriangleArea = (base * height) / 2;
  return (TriangleArea);
}

// Desafio 3
function splitSentence(Str) {
  let resultado = 0;
  for (let i of Str) {
    if (i === ' ') {
      resultado += 1;
    }
  }

  let splitStr = Str.split(' ', resultado + 1);
  return splitStr;
}

// Desafio 4
function concatName(ArrayName) {
  let lastName = ArrayName[ArrayName.length - 1];
  let firstName = ArrayName[0];
  return (`${lastName}, ${firstName}`);
}
// Desafio 5
function footballPoints(WinnedGames, TiedGames) {
  let CountPoint = WinnedGames * 3 + TiedGames * 1;
  return CountPoint;
}
// Desafio 6
function highestCount(ArrayTest) {
  let resultado = 0;
  let MaxValueArray = Math.max.apply(null, ArrayTest);
  for (let i = 0; i < ArrayTest.length; i += 1) {
    if (MaxValueArray === ArrayTest[i]) {
      resultado += 1;
    }
  }
  return resultado;
}
function Distance(DistObjetct, DistRefer) {
  if (DistObjetct - DistRefer < 0) {
    return (DistObjetct - DistRefer) * (-1);
  }
  return DistObjetct - DistRefer;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  if (Distance(cat1, mouse) === Distance(cat2, mouse)) {
    return 'os gatos trombam e o rato foge';
  } if (Distance(cat1, mouse) < Distance(cat2, mouse)) {
    return 'cat1';
  }
  return 'cat2';
}

// Desafio 8
function fizz(Number) {
  if (Number % 3 === 0 && Number % 5 !== 0) {
    return 'fizz';
  }
}
function buzz(Number) {
  if (Number % 3 !== 0 && Number % 5 === 0) {
    return 'buzz';
  }
  return fizz(Number);
}
function fizzAndBuzz(Number) {
  if (Number % 3 === 0 && Number % 5 === 0) {
    return 'fizzBuzz';
  }
  return buzz(Number);
}
function Bug(Number) {
  if (Number % 3 !== 0 && Number % 5 !== 0) {
    return 'bug!';
  }
  return fizzAndBuzz(Number);
}

function fizzBuzz(ArrayTest) {
  let ArrayStrings = [];
  for (let i = 0; i < ArrayTest.length; i += 1) {
    ArrayStrings.push(Bug(ArrayTest[i]));
  }
  return ArrayStrings;
}

// Desafio 9
function encode(StringTest) {
  let ArrayTest = [];
  let ArrayVogals = ['a', 'e', 'i', 'o', 'u'];
  let ArrayNumbers = ['1', '2', '3', '4', '5'];
  for (let i = 0; i < 5; i += 1) {
    StringTest = StringTest.replaceAll(ArrayVogals[i], ArrayNumbers[i]);
    ArrayTest.push(StringTest);
  }
  return ArrayTest[4];
}
function decode(StringTest) {
  let ArrayTest = [];
  let ArrayVogals = ['a', 'e', 'i', 'o', 'u'];
  let ArrayNumbers = ['1', '2', '3', '4', '5'];
  for (let i = 0; i < 5; i += 1) {
    StringTest = StringTest.replaceAll(ArrayNumbers[i], ArrayVogals[i]);
    ArrayTest.push(StringTest);
  }
  return ArrayTest[4];
}
// Desafio 10
function techList(NameTech, NamePerson) {
  if (NameTech.length > 0 && NamePerson.length > 0) {
    let NameTechOrdered = NameTech.sort();
    let NewArray = [];
    for (let i = 0; i < NameTech.length; i += 1) {
      NewArray.push({ tech: NameTechOrdered[i], name: NamePerson });
    }
    return NewArray;
  }
  return ('Vazio!');
}
module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
