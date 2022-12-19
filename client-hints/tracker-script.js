// tracker-script.js

document.addEventListener('DOMContentLoaded', init);

function init() {
  fetch('http://localhost:3001/client-hints');
}
