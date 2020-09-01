let icon = document.getElementsByClassName("fa-bars")[0];
let hideIcon = document.getElementsByClassName("hide-nav")[0];
let drawer = document.getElementsByClassName("nav-links")[0];
let resetBlock = document.getElementsByClassName("reset-pwd")[0];
let resetBlockOpen = true;

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

const toggleResetBlockVisibility = () => {
  if (resetBlockOpen) {
    resetBlockOpen = false;
    resetBlock.style.display = "grid";
  } else {
    resetBlockOpen = true;
    resetBlock.style.display = "none";
  }
};

const resetPassword = () => {
  const password = document.getElementById("curr-pwd").value;
  const newPassword = document.getElementById("new-pwd").value;
  const newPasswordCnfm = document.getElementById("new-pwd2").value;
  const resetMessage = document.getElementById("reset-error");

  resetMessage.innerText = "";

  if (!password || !newPassword || !newPasswordCnfm) {
    resetMessage.innerText = "All fields are required";
    return;
  }
  if (newPassword !== newPasswordCnfm) {
    resetMessage.innerText = "New Passwords dont't match";
    return;
  }

  console.log("Reset Password");
  fetch("/reset-pwd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, newPassword }),
  })
    .then((res) => res.json())
    .then((data) => {
      resetMessage.innerText = data.message;
    })
    .catch(console.error);
};
