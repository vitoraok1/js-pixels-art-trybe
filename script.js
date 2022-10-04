// Adicionar a cor preta como primeira cor da paleta de cores

window.onload = function firstColor() {
    let firstColor = document.getElementById('color-black');
    firstColor.style.backgroundColor = 'black';
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
}
getRandomButton.addEventListener('click', randomButton);
