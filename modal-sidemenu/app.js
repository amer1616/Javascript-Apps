// helper
const $ = (el) => document.querySelector(el);

// toggle sidemenu
$("#toggle").addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

// show modal
$("#open").addEventListener("click", () => {
  $("#modal").classList.add("show-modal");
});

//hide modal
$("#close").addEventListener("click", () => {
  $("#modal").classList.remove("show-modal");
});

//hide modal when click outside modal
window.addEventListener("click", (e) => {
  e.target == $("#modal") ? $("#modal").classList.remove("show-modal") : false;
});

//hide sidemenu when click outside toggle btn
window.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target);

  if (e.target != $("#toggle") && e.target != $("nav>*, nav ul li")) {
    document.body.classList.remove("show-nav");
  }
  // e.target == $("nav") ? document.body.classList.remove("show-nav") : false;
});
