
var dialCount:number = 0;
var grid:HTMLDivElement = document.getElementById("grid") as HTMLDivElement;
var dragged:HTMLAnchorElement;

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
    cell.textContent = `Dial ${dialCount + 1}`;
    var color: [number, number, number] = getRandomColor();
    cell.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1`;
    cell.draggable = true;
    link.addEventListener("dragstart", onDragDial);
    link.appendChild(cell);
    grid.replaceChild(link, grid.lastChild);
    dialCount++;
    createAddSiteDial();
  } else {
    cell.textContent = "Add a site";
    cell.id = "add-site";
    cell.addEventListener("click", addSiteOnClick);
    grid.appendChild(cell);
  }
}

function addSiteOnClick() {
  createDial("", "", false);
}

function onDragDial(event:DragEvent) {
  event.dataTransfer.setData('text/plain', null);
  dragged = event.target as HTMLAnchorElement;
  document.getElementById("footer").style.visibility = "visible";
}

function createAddSiteDial() {
  createDial("", "", true);
}

export function createSpeedDial() {
  createAddSiteDial();

  document.addEventListener("dragend", function(event:DragEvent) {
    event.preventDefault();
    document.getElementById("footer").style.visibility = "hidden";
  });

  document.addEventListener("dragover", function(event:DragEvent) {
      event.preventDefault();
  }, false);

  document.addEventListener("drop", function(event:DragEvent) {
    event.preventDefault();
    var div:HTMLDivElement = event.target as HTMLDivElement;
    if (div.id == "dropzone") {
      document.getElementById("footer").style.visibility = "hidden";
      document.getElementById("grid").removeChild(dragged);
      dialCount--;
      if (dialCount == 8) createAddSiteDial();
    }
    console.log(div.id);
  }, false);
}
