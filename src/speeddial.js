// Copyright (C) Brendan Caluneo

var newTabUrl = browser.browserSettings.newTabPageOverride.get({});
var createDialModal = document.getElementById("createModal");

// let dials = new Map([
//   ["https://www.hackforums.net/", "Hackforums"],
//   ["https://www.youtube.com/", "YouTube"],
//   ["https://www.ebay.com/", "Ebay"],
//   ["https://www.reddit.com/", "Reddit"],
//   ["https://www.news.google.com/", "Google News"],
//   ["https://www.my.sc.edu/", "SSC"],
//   ["https://dropbox.cse.sc.edu/login/index.php/", "CSE Dropbox"],
//   ["https://blackboard.sc.edu/", "Blackboard"],
//   ["https://github.com/bcaluneo", "Github"]
// ]);

let dials = new Map();

function updateClock() {
  var currentClockDiv = document.getElementById("clock");
  if (currentClockDiv != null) currentClockDiv.remove();
  var current = new Date();
  var currentTime = current.toLocaleTimeString();
  currentClockDiv = document.createElement("div");
  currentClockDiv.id = "clock";
  currentClockDiv.innerHTML = currentTime;
  document.body.prepend(currentClockDiv);
}

function reloadDials() {
  var gridContainer = document.getElementsByClassName("grid-container")[0];
  if (gridContainer != null) gridContainer.remove();
  gridContainer = document.createElement("div");
  gridContainer.className = "grid-container";
  if (dials.size == 0) {
    var gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.innerHTML = "";
    var gridItemPreview = document.createElement("div");
    gridItemPreview.id = "preview";

    gridItem.appendChild(gridItemPreview);
    gridContainer.appendChild(gridItem);
    gridItem.addEventListener('click', function() {
      createDialModal.style.display = "block";
    });
  } else {
    dials.forEach((value, key) => {
      var link = document.createElement("a");
      link.href = key;

      var gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.innerHTML = value;
      var gridItemPreview = document.createElement("div");
      gridItemPreview.id = "preview";
      gridItemPreview.innerHTML = "<img src=\"https://bcaluneo.com/assets/previews/hf.png\">"

      gridItem.appendChild(gridItemPreview);
      link.appendChild(gridItem);
      gridContainer.appendChild(link);
    });

    if (dials.size < 9) {
      var gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.innerHTML = "";
      var gridItemPreview = document.createElement("div");
      gridItemPreview.id = "preview";

      gridItem.appendChild(gridItemPreview);
      gridContainer.appendChild(gridItem);
      gridItem.addEventListener('click', function() {
        createDialModal.style.display = "block";
      });
    }
  }
  document.body.appendChild(gridContainer);
}

function createDial() {
  var dialName = document.getElementById('dialName').value;
  var dialURL = "https://www." + document.getElementById('dialURL').value;
  dials.set(dialURL, {dialName});
  browser.tabs.create({url: dialURL});
  document.documentElement.requestFullscreen();
  html2canvas(document.body).then(canvas => {
    // document.body.appendChild(canvas);
  });
  browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
  .then(tabs => browser.tabs.get(tabs[0].id))
  .then(tab => {
    browser.tabs.remove(tab.id);
  });
  document.exitFullscreen();
  reloadDials();
  closeModal();
}

function closeModal() {
  document.getElementById('dialName').value = document.getElementById('dialURL').value = "";
  createDialModal.style.display = "none";
}

function init() {
  updateClock();
  setInterval(updateClock, 1000);
  reloadDials();
  var closeModalButton = document.getElementById("closeModal");
  closeModalButton.onclick = closeModal;

  document.getElementById("createDial").addEventListener('click', createDial);
  document.getElementById("cancelDial").addEventListener('click', closeModal);

  // html2canvas(document.body).then(canvas => {
  //   document.body.appendChild(canvas)
  // });
}

init();
