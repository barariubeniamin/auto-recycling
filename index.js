let id;

function initEvents() {
  document.getElementById("side").addEventListener("click", function (e) {
    if (e.target.matches("a")) {
      id = e.target.getAttribute("data-page");
      console.info("click pe", id);
    }
  });
}

initEvents();
