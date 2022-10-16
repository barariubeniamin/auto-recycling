let allParts = [];
function $(selector) {
  return document.querySelector(selector);
}
function displayParts(parts) {
  let partsHTML = "";
  parts.forEach(function (part) {
    partsHTML += `<tr>
          <td>${part.make}</td>
          <td>${part.model}</td>
          <td>${part.part}</td>
          
          <td><button type="submit">💾</button>
                  <button type="edit">🖋️</button></td>
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
      allParts = parts;
      displayParts(parts);
    });
}

function initEvents() {
  $("#search").addEventListener("input", (e) => {
    const search = e.target.value.toLowerCase();
    const parts = allParts.filter((part) => {
      return part.part.toLowerCase().includes(search);
    });
    displayParts(parts);
  });
  $("#side").addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      const search = e.target.getAttribute("data-page");
      const parts = allParts.filter((part) => {
        return part.make.includes(search);
      });

      displayParts(parts);
    }
  });

  document.getElementById("side").addEventListener("click", function (e) {
    if (e.target.matches("a")) {
      id = e.target.getAttribute("data-page");
      console.log(id);
    }
  });
  document.querySelector;
}

initEvents();
loadParts();
