// Adicionar a cor preta como primeira cor da paleta de cores

window.onload = function firstColor() {
    let firstColor = document.getElementById('color-black');
    firstColor.style.backgroundColor = 'black';
    firstColor.classList.add('selected');
}

//  Criando a paleta de cores das outras cores

function rgbGenerator() {
    let firstNum = Math.floor(Math.random() * 256);
    let middleNum = Math.floor(Math.random() * 256);
    let lastNum = Math.floor(Math.random() * 256);
    let rgbNumber = 'rgb(' + firstNum + ', ' + middleNum + ', ' + lastNum + ')';
    return rgbNumber 
}
//Utilização da propriedade Math.floor com o Math.random para gerar um rgb aleatório source: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/floor

// Função para retornar as cores
const actualColors = [];
actualColors[0] = 'black';
// console.log(actualColors);

function generateColor() {
    let paletteColors = document.getElementById('color-palette');
    let palette;
    for (let index = 1; index < 4; index += 1 ) {
        palette = document.createElement('div');
        palette.style.backgroundColor = rgbGenerator();
        palette.setAttribute('class', 'color');
        paletteColors.appendChild(palette);
        actualColors.push(paletteColors.childNodes[index].style.backgroundColor);
    }
}
generateColor();

// Implementação do botão para gerar cores aleatórias

let getRandomButton = document.getElementById('button-random-color');
function randomButton() {
    let allPaletteColors = document.querySelectorAll('.color');
    for (colorIndex = 1; colorIndex <= allPaletteColors.length - 1; colorIndex += 1) {
        let changeColors = allPaletteColors[colorIndex]; 
        changeColors.style.backgroundColor = rgbGenerator();
    }
    localStorage.setItem('colorPalette', JSON.stringify(actualColors));
}
getRandomButton.addEventListener('click', randomButton);

// Implementação da função para resgatar a paleta de cores gerada no localStorage

// function getColors() {
//     if (localStorage.getItem('colorPalette') === null) {
//         generateColor();
//     } 
//     // if (currentColors = JSON.parse(localStorage.getItem('colorPalette'))) 
//     //     currentColors = JSON.parse(localStorage.getItem('colorPalette'));

//     for (let index = 1; index <= 3; index += 1) {
//         let rgbValue = actualColors[index];
//         console.log(rgbValue);
//     }  
// }
// getColors();

// console.log(JSON.parse(localStorage.getItem('colorPalette')));

// Adicionando a página um grid de pixels 5x5

function boardCreate(numberOfPixels) {
    const board = document.getElementById('pixel-board');
    for (let index = 0; index < numberOfPixels; index += 1) {
      const pixelSection = document.createElement('section');
      pixelSection.className = 'pixel-lines';
  
      for (let index2 = 0; index2 < numberOfPixels; index2 += 1) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.backgroundColor = 'white';

        pixelSection.appendChild(pixel);
      }
        board.appendChild(pixelSection);

    }
}
boardCreate(5);

// Selecionar cores da paleta

let colors = document.querySelectorAll('.color');

function pickColor() {
    for (let colorPosition = 0; colorPosition < colors.length; colorPosition += 1) {
        colors[colorPosition].addEventListener('click', function(event) {
            for (let secondColorPosition = 0; secondColorPosition < colors.length; secondColorPosition += 1) {
                colors[secondColorPosition].classList.remove('selected');
            }
            event.target.classList.add('selected')
        })
    }
} 
pickColor();  
// classList.remove source: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

// Pintar pixel com a cor escolhida

let pixelSelector = document.querySelector('#pixel-board');

pixelSelector.addEventListener('click', function(event) {
    let pickedColor = document.querySelector('.selected');
    let color = getComputedStyle(pickedColor).backgroundColor;
    let paintedPixel = event.target;
    paintedPixel.style.backgroundColor = color;
})
// getComputedStyle source: https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle

// Criar botão para resetar o grid

function resetGrid() {
    let buttonResetGrid = document.getElementById('clear-board');
    let allPixels = document.querySelectorAll('.pixel');

    buttonResetGrid.addEventListener('click', function (){
        for(index = 0; index < allPixels.length; index += 1) {
            let changeColors = allPixels[index]; 
            changeColors.style.backgroundColor = 'white';
        }
  })
}
resetGrid();

