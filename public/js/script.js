let icon = document.getElementsByClassName("fa-bars")[0];
let hideIcon = document.getElementsByClassName("hide-nav")[0];
let drawer = document.getElementsByClassName("nav-links")[0];

icon.addEventListener("click", function () {
  drawer.style.transform = "translateX(0%)";
});

hideIcon.addEventListener("click", function () {
  drawer.style.transform = "translateX(-100%)";
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) drawer.style.transform = "translateX(0%)";
  else drawer.style.transform = "translateX(-100%)";
});
