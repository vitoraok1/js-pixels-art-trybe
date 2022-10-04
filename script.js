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

function generateColor(color) {
    let paletteColors = document.getElementById('color-palette');
    let palette = document.createElement('div');
    palette.style.backgroundColor = color;
    palette.setAttribute('class', 'color');
    paletteColors.appendChild(palette);
}

generateColor(rgbGenerator());
generateColor(rgbGenerator());
generateColor(rgbGenerator());

// Implementação do botão para gerar cores aleatórias

let getRandomButton = document.getElementById('button-random-color');
function randomButton() {
    let allPaletteColors = document.querySelectorAll('.color');
    for (colorIndex = 1; colorIndex <= allPaletteColors.length - 1; colorIndex += 1) {
        let changeColors = allPaletteColors[colorIndex]; 
        changeColors.style.backgroundColor = rgbGenerator();
    }
    let saveColorPalette = document.querySelector('#color-palette').innerHTML;
    localStorage.setItem('colorPalette', JSON.stringify(saveColorPalette));
}
getRandomButton.addEventListener('click', randomButton);

// Implementação da função para armazenar a paleta de cores gerada no localStorage

function setColors() {
    let saveColorPalette = document.querySelector('#color-palette').innerHTML;
    let colorsPalette = JSON.parse(localStorage.getItem('colorPalette'));
    saveColorPalette = colorsPalette;
}
setColors();

// Adicionando a página um grid de pixels 5x5

function boardCreate(numberOfPixels) {
    const board = document.getElementById('pixel-board');
    for (let index = 0; index < numberOfPixels; index += 1) {
      const pixelSection = document.createElement('section');
      pixelSection.className = 'pixel-rows';
      board.appendChild(pixelSection);
      const arrPixel = document.getElementsByClassName('pixel-rows');
  
      for (let index2 = 0; index2 < numberOfPixels; index2 += 1) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.backgroundColor = 'white';
        arrPixel[index].appendChild(pixel);
      }
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
