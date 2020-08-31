let loginVisible = true;

const toggleVisibilty = () => {
  if (window.event.target.id === "register") {
    document.getElementById("login").style.color = "#FFF";
    document.getElementById("login").style.background = "#9786eb";
    document.getElementById("register").style.color = "#9786eb";
    document.getElementById("register").style.background = "#FFF";
    document.getElementsByClassName("login-form")[0].style.display = "none";
    document.getElementsByClassName("register-form")[0].style.display = "flex";
    loginVisible = false;
  } else if (window.event.target.id === "login") {
    document.getElementById("login").style.color = "#9786eb";
    document.getElementById("login").style.background = "#FFF";
    document.getElementById("register").style.color = "#FFF";
    document.getElementById("register").style.background = "#9786eb";
    document.getElementsByClassName("login-form")[0].style.display = "flex";
    document.getElementsByClassName("register-form")[0].style.display = "none";
    loginVisible = true;
  }
};
