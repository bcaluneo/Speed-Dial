
var dialCount:number = 0;

export function getLetterIndex(letter:string): number {
  var alpha:string = "abcdefghijklmnopqrstuvwxyz";
  return alpha.indexOf(letter) + 1;
}

export function getRandomColor(seed:string=""): [number, number, number] {
  var rand;
  var total:number = seed.length * 26;
  var offset:number = 0;
  if (total > 0) {
    for (let i = 0; i < seed.length; i++) {
      var character:string = seed.charAt(i);
      offset += getLetterIndex(character);
    }

    // offset /= total;
    rand = require('random-seed').create(offset*100000);
  } else {
    rand = require('random-seed').create();
  }

  var r:number = Math.floor(rand.random() * 255);
  var g:number = Math.floor(rand.random() * 255);
  var b:number = Math.floor(rand.random() * 255);
  return [r, g, b];
}

export function createDial(url:string, title:string, isAdd:boolean) {
  if (dialCount >= 9) return;

  var link:HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
  var cell:HTMLDivElement = document.createElement('div');
  link.href = url;
  cell.className = "grid-item";

  if (!isAdd) {
    cell.textContent = title;
    var color: [number, number, number] = getRandomColor();
    cell.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1`;
  } else {
    cell.textContent = "Add a site";
  }

  link.appendChild(cell);
  document.getElementById("grid").appendChild(link);
  dialCount++;
}

export function createSpeedDial() {
  createDial("https://google.com", "", true);
}
