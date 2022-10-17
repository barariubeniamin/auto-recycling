const API = {
  CREATE: {
    URL: "http://localhost:3000/parts/create",
    METHOD: "POST",
  },
  READ: {
    URL: "http://localhost:3000/parts",
    METHOD: "GET",
  },
  UPDATE: {
    URL: "http://localhost:3000/parts/update",
    METHOD: "PUT",
  },
  DELETE: {
    URL: "http://localhost:3000/parts/delete",
    METHOD: "DELETE",
  },
};
const isDemo = true || location.host === "nmatei.github.io";
const inlineChanges = isDemo;
if (isDemo) {
  API.READ.URL = "data/parts.json";
  API.DELETE.URL = "data/delete.json";
  API.CREATE.URL = "data/create.json";
  API.UPDATE.URL = "data/update.json";

  API.DELETE.METHOD = "GET";
  API.CREATE.METHOD = "GET";
  API.UPDATE.METHOD = "GET";
}

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
  fetch(API.READ.URL)
    .then(function (r) {
      return r.json();
    })
    .then(function (parts) {
      allParts = parts;
      displayParts(parts);
    });
}
function getFormValues() {
  const make = $("[name=make]").value;
  const model = $("[name=model]").value;
  const part = $("[name=part]").value;
  const newPart = {
    id: Math.trunc(Math.random() * 100),
    make: make,
    model: model,
    part: part,
  };
  console.log(newPart);
  return newPart;
}
function createPartRequest() {
  const method = API.CREATE.METHOD;
  return fetch(API.CREATE.URL, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method === "GET" ? null : JSON.stringify(newPart),
  }).then((r) => r.json());
}
function submitForm(e) {
  e.preventDefault();
  const newPart = getFormValues();
  createPartRequest(newPart).then((status) => {
    if (status.success) {
      allParts = [...allParts, { ...newPart }];
      displayParts(allParts);
      $("#editForm").reset();
    }
  });
}
function initEvents() {
  const form = $("#editForm");
  form.addEventListener("submit", submitForm);

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
    const form = $("#editForm");
    form.addEventListener("submit", saveNewPart());
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
