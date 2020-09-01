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

const forgotPwd = document.getElementById("forgot-pwd");
forgotPwd.addEventListener("click", () => {
  const email = prompt("Enter your Email to reset password");
  const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  console.log(email);

  if (regex.test(email)) {
    fetch("/forgot-pwd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
      })
      .catch(console.error);
  } else {
    alert("Invalid email format");
  }
});
