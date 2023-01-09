const inputEmail = document.querySelector('#input-email');
const evalForm = document.querySelector('#evaluation-form');
const lastName = document.querySelector('#input-lastname');
const nameHouse = document.querySelector('#house');
const nameInput = document.querySelector('#input-name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const buttonSubmit = document.querySelector('#submit-button');
const buttonSend = document.getElementById('submit-btn');
const checkBoxAgree = document.querySelector('#agreement');
const textArea = document.querySelector('#textarea');
const pCounter = document.querySelector('#counter');
const formsSubstitute = document.querySelector('#form-data');
const comma = ', ';
const space = ' ';
const twoDots = ':';
buttonSend.disabled = true;

function createElement() {
  const elementCreate = document.createElement('p');
  formsSubstitute.appendChild(elementCreate);
}

function displayEvaluationValue() {
  const ele = document.getElementsByName('rate');
  for (let i = 0; i < ele.length; i += 1) {
    if (ele[i].checked) {
      return ele[i].value;
    }
  }
}

function displayCheckBoxValue() {
  const arrayOfSubjects = [];
  let value = '';
  const ele = document.getElementsByClassName('subject');
  for (let i = 0; i < ele.length; i += 1) {
    if (ele[i].checked) {
      arrayOfSubjects.push(ele[i].value);
    }
  }
  [value] = arrayOfSubjects;
  for (let i = 1; i < arrayOfSubjects.length; i += 1) {
    value += comma + arrayOfSubjects[i];
  }
  return value;
}

function displayRadioValue() {
  const ele = document.getElementsByName('family');
  for (let i = 0; i < ele.length; i += 1) {
    if (ele[i].checked) {
      return ele[i].value;
    }
  }
}
function sendLocalStorage() {
  const name = nameInput.value + space + lastName.value;
  const email = inputEmail.value;
  const house = nameHouse.options[nameHouse.selectedIndex].value;
  const family = displayRadioValue();
  const subjects = displayCheckBoxValue();
  const evaluation = displayEvaluationValue();
  const observations = textArea.value;
  const objectForm = {
    Nome: name,
    Email: email,
    Casa: house,
    Família: family,
    Matérias: subjects,
    Avaliação: evaluation,
    Observações: observations,
  };
  localStorage.setItem('allForm', JSON.stringify(objectForm));
}

function turnCheck() {
  buttonSend.disabled = !this.checked;
}

function contaCaracteres() {
  const contador = 500 - textArea.value.length;
  pCounter.innerHTML = contador.toString();
}

function validaInformacoes() {
  if (emailInput.value === 'tryber@teste.com' && passwordInput.value.toString() === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}
function newForm(event) {
  event.preventDefault();
  sendLocalStorage();
  evalForm.style.display = 'none';
  const objectList = JSON.parse(localStorage.getItem('allForm'));
  const key = Object.keys(objectList);
  const value = Object.values(objectList);

  for (let i = 0; i < key.length; i += 1) {
    createElement();
    formsSubstitute.lastElementChild.innerHTML = key[i] + twoDots + space + value[i];
  }
}

function clicaBotao(evento) {
  evento.preventDefault();
  validaInformacoes();
}
buttonSubmit.addEventListener('click', clicaBotao);

textArea.addEventListener('keyup', contaCaracteres);
textArea.addEventListener('keydown', contaCaracteres);
checkBoxAgree.addEventListener('change', turnCheck);
buttonSend.addEventListener('click', newForm);
