const randomButton = document.getElementById('button-random-color');
const getColorElement = document.getElementsByClassName('color');

// let pixelList = document.querySelectorAll('.pixel');

const clearButton = document.getElementById('clear-board');
const Arraytype = JSON.parse(localStorage.getItem('pixelBoard')) || [];
console.log(Arraytype);
const boardSize = document.getElementById('generate-board');
const inputValue = document.getElementById('board-size');

getColorElement[0].style.backgroundColor = 'rgb(0,0,0)';
document.getElementsByClassName('color')[1].style.backgroundColor = 'rgb(255,255,0)';
document.getElementsByClassName('color')[2].style.backgroundColor = 'rgb(0,0,255)';
document.getElementsByClassName('color')[3].style.backgroundColor = 'rgb(0,128,0)';


function removeMethod() {

  pixelList = document.querySelectorAll('.pixel');
  if (pixelList.length !== 0) {
    for (let i = 0; i < pixelList.length; i++) {

      pixelList[i].remove();
    }
  }


}

function sizeBoard() {
  
  
  if (inputValue.value === '') {
    alert('Board inválido!')
  } else if (inputValue.value < 5) {
    inputValue.value=5;
    
    
  } else if (inputValue.value > 50) {
    inputValue.value=50;
    
  }
  let a = inputValue.value
  localStorage.setItem('boardSize',JSON.stringify(a));
    

  removeMethod();


  for (let i = 0; i < (a * a); i++) {
    let div = document.createElement('div');
    let board = document.getElementById('pixel-board');

    div.className = 'pixel';
    board.appendChild(div);
    pixelList = document.querySelectorAll('.pixel');
    pixelList[i].style.backgroundColor = 'rgb(255,255,255)';
  }
  pixelList = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixelList.length; i++) {


    pixelList[i].index = i;



    pixelList[i].addEventListener('click', function chooseBoard(event) {
      const pixelBoard = {
        color: '',
        position: '',
      };
      console.log(event.target);

      const colorValue = document.querySelector('.selected').style.backgroundColor;


      pixelList[i].style.backgroundColor = colorValue;

      pixelBoard.color = colorValue;
      pixelBoard.position = event.target.index
      console.log(pixelBoard)
      console.log(Arraytype)
      Arraytype.push(pixelBoard);
      localStorage.setItem('pixelBoard', JSON.stringify(Arraytype));

    }, false);
  }
  document.getElementById('pixel-board').style.gridTemplateColumns = 'repeat(' + `${inputValue.value}` + ',0.01fr)';
}
  




function initialFive() {
  
  
  if (localStorage.getItem('boardSize') === null) {
    localStorage.setItem('boardSize', JSON.stringify("5"));
  }
   let counter  = JSON.parse(localStorage.getItem('boardSize'));
   let a = counter[0];

   console.log(a);
   
  
  
  
  for (let i = 0; i < (a * a); i++) {
    let div = document.createElement('div');
    let board = document.getElementById('pixel-board');

    div.className = 'pixel';
    board.appendChild(div);
    let pixelList = document.querySelectorAll('.pixel');
    pixelList[i].style.backgroundColor = 'rgb(255,255,255)';
  }
  pixelList = document.querySelectorAll('.pixel');

 
console.log(pixelList)
  

  
  for (let i = 0; i < pixelList.length; i++) {


    pixelList[i].index = i;



    pixelList[i].addEventListener('click', function chooseBoard(event) {
      const pixelBoard = {
        color: '',
        position: '',
      };
      console.log(event.target);

      const colorValue = document.querySelector('.selected').style.backgroundColor;


      pixelList[i].style.backgroundColor = colorValue;

      pixelBoard.color = colorValue;
      pixelBoard.position = event.target.index
      console.log(pixelBoard)
      console.log(Arraytype)
      Arraytype.push(pixelBoard);
      localStorage.setItem('pixelBoard', JSON.stringify(Arraytype));

    }, false);
  }
  document.getElementById('pixel-board').style.gridTemplateColumns = 'repeat(' + `${a}` + ',0.01fr)';
}
















function clearBoard() {


  for (let i = 0; i < pixelList.length; i++) {
    pixelList[i].style.backgroundColor = 'rgb(255,255,255)';




  }
  Arraytype.slice(0, Arraytype.length);
  localStorage.removeItem('pixelBoard')

  localStorage.setItem('pixelBoard', JSON.stringify([]));








}





function RandomColor(event) {
  const arrayList = [];

  for (i = 1; i < 4; i++) {

    let color1 = (Math.floor((Math.random()) * 256)).toString();
    let color2 = (Math.floor((Math.random()) * 256)).toString();
    let color3 = (Math.floor((Math.random()) * 256)).toString();
    let inputValue = 'rgb' + '(' + `${color1}` + ',' + `${color2}` + ',' + `${color3}` + ')';

    getColorElement[i].style.backgroundColor = inputValue;

    arrayList.push(inputValue)



  }
  localStorage.setItem('colorPalette', JSON.stringify(arrayList));

}

function randomPixel(event) {
  const elementSelected = event.target;
  for (let j = 0; j < getColorElement.length; j++) {
    getColorElement[j].classList.remove('selected');

  }

  elementSelected.classList.add('selected');
  console.log(event.target);
}

// function clearBoard(event) {
//   const clearAll = event.target;
//   for (let i = 0; i < pixelList.length; i++) {
//     pixelList[i].style.backgroundColor = 'rgb(255,255,255)';
//     }

//     Arraytype=0;




// }

function initialRenderization() {



  if (localStorage.getItem('colorPalette') === null) {
    localStorage.setItem('colorPalette', JSON.stringify([]));
  } else {
    const colorList = JSON.parse(localStorage.getItem('colorPalette'));


    for (let i = 0; i < colorList.length; i++) {



      getColorElement[i + 1].style.backgroundColor = colorList[i];
    }



  }



  localStorage.setItem('status', JSON.stringify(['selected']));
  const initialPalleteColor = JSON.parse(localStorage.getItem('status'));
  getColorElement[0].classList.add(initialPalleteColor);



  // const pixelBoardSystem = JSON.parse(localStorage.getItem('pixelBoard'));

  if (localStorage.getItem('pixelBoard') === null) {
    localStorage.setItem('pixelBoard', JSON.stringify([]));
  } else {
    const colorListBoard = JSON.parse(localStorage.getItem('pixelBoard'));
    for (i = 0; i < colorListBoard.length; i++) {
      //  let pixelBoardColor = colorList[i]['color']  ;
      //  let pixelBoardPosition= colorList[i]['position'];
      pixelList[colorListBoard[i].position].style.backgroundColor = colorListBoard[i].color;
    }
  }


}





randomButton.addEventListener('click', RandomColor);

for (let i = 0; i < getColorElement.length; i++) {

  getColorElement[i].addEventListener('click', randomPixel);

}






clearButton.addEventListener('click', clearBoard);

boardSize.addEventListener('click', sizeBoard)









window.onload = function render() {
  initialFive();
  initialRenderization();
  
};

