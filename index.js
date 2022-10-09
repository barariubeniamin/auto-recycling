function displayParts(parts) {
  let partsHTML = "";
  parts.forEach(function (part) {
    partsHTML += `<tr>
          <td>${part.make}</td>
          <td>${part.model}</td>
          <td>${part.part}</td>
          
          <td>x e</td>
        </tr>
    `;
  });
  document.querySelector("table tbody").innerHTML = partsHTML;
}

function loadParts() {
  fetch("parts.json")
    .then(function (r) {
      return r.json();
    })
    .then(function (parts) {
      displayParts(parts);
    });
}

function initEvents() {
  document.getElementById("side").addEventListener("click", function (e) {
    if (e.target.matches("a")) {
      id = e.target.getAttribute("data-page");
      console.info("click pe", id);
    }
  });
}

initEvents();
loadParts();
