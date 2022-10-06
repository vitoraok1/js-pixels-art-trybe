// Constante de array para armazenar as cores atuais

const actualColors = [];
actualColors[0] = 'black';

// Determinando a cor black como a primeira cor da paleta e a que inicia selecionada

window.onload = function() {
    let firstColor = document.getElementById('color-black');
    firstColor.style.backgroundColor = 'black';
    firstColor.classList.add('selected');
    
    if (localStorage.getItem('colorPalette') === null) {
        generateColor();
        savePaletteColors();
        pickColor();

    } else {
        getColors();
        pickColor();
    }

    if (localStorage.getItem('pixelBoard') !== null) {
        recoverPaintedColors();
    }
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

// Implementação do botão para gerar cores aleatórias

let getRandomButton = document.getElementById('button-random-color');
function randomButton() {
    let allPaletteColors = document.querySelectorAll('.color');
    let arrayColors = ['black'];
    for (colorIndex = 1; colorIndex <= allPaletteColors.length - 1; colorIndex += 1) {
        let changeColors = allPaletteColors[colorIndex]; 
        arrayColors.push(rgbGenerator());
        changeColors.style.backgroundColor = arrayColors[colorIndex];
    }
    localStorage.setItem('colorPalette', JSON.stringify(arrayColors));
}
getRandomButton.addEventListener('click', randomButton);

// Implementação da função para resgatar a paleta de cores gerada no localStorage

function getColors() {
    let paletteColors = document.getElementById('color-palette');
    let savedColors = JSON.parse(localStorage.getItem('colorPalette'));
    for (let index = 1; index < 4; index += 1 ) {
        palette = document.createElement('div');
        palette.style.backgroundColor = savedColors[index];
        palette.setAttribute('class', 'color');
        paletteColors.appendChild(palette);
    }

}

function savePaletteColors() {
    let paletteElements = document.getElementsByClassName('color');
    let colorsArray = [];
    for(let index = 0; index < paletteElements.length; index += 1) {
        let number = paletteElements[index].style.backgroundColor;
        colorsArray.push(number);
    }
    localStorage.setItem('colorPalette', JSON.stringify(colorsArray));
}

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

// Pintar pixel com a cor escolhida

let pixelSelector = document.querySelector('#pixel-board');

pixelSelector.addEventListener('click', function(event) {
    let paintedPixel = event.target;
    if (paintedPixel.className === 'pixel') {
        let pickedColor = document.querySelector('.selected');
        let color = getComputedStyle(pickedColor).backgroundColor;
        paintedPixel.style.backgroundColor = color;
        let getPixelElements = document.getElementsByClassName('pixel');
        let recolorsArray = [];
        for (let index = 0; index < getPixelElements.length; index += 1) {
            recolorsArray.push(getPixelElements[index].style.backgroundColor);
        }
        localStorage.setItem('pixelBoard', JSON.stringify(recolorsArray));
    }
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

// Função para selecionar a cor da paleta

function pickColor() {
    let colors = document.getElementsByClassName('color');
    // console.log(colors);
    for (let colorPosition = 0; colorPosition < colors.length; colorPosition += 1) {
        // console.log('teste');
        colors[colorPosition].addEventListener('click', function(event) {
            for (let secondColorPosition = 0; secondColorPosition < colors.length; secondColorPosition += 1) {
                colors[secondColorPosition].classList.remove('selected');
            }
            event.target.className = 'color selected';
        })
    }
} 

function recoverPaintedColors() {
    const getPixelColors = JSON.parse(localStorage.getItem('pixelBoard'));  
    const getEachPixel = document.getElementsByClassName('pixel');

    for (index = 0; index < getEachPixel.length; index += 1) {
        getEachPixel[index].style.backgroundColor = getPixelColors[index];
    }
}

// Chamada de funções

boardCreate(5);
resetGrid();