const logout = () => {
  window.localStorage.removeItem("token");
  fetch("/logout")
    .then((res) => (window.location = res.url))
    .catch(console.error);
};

// Not being used now

// const login = () => {
//   const email = document.getElementById("login-email").value;
//   const password = document.getElementById("login-pwd").value;

//   console.log(email, password);
//   fetch("/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.message !== undefined)
//         document.getElementById("login-error").innerText = data.message;
//       if (data.token === undefined) return;
//       window.localStorage.setItem("token", data.token);
//       window.location = `/home?secret_token=${data.token}`;
//     })
//     .catch(console.error);
// };

const register = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pwd").value;
  const cnfPwd = document.getElementById("cnf-pwd").value;
  const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if (!name || !email || !password || !cnfPwd) {
    document.getElementById("register-error").innerText =
      "All fields are compulsory";
    return;
  }

  if (!regex.test(email)) {
    document.getElementById("register-error").innerText =
      "Invalid email format";
    return;
  }

  if (cnfPwd !== password) {
    document.getElementById("register-error").innerText =
      "Passwords don't match";
    return;
  }

  console.log(email, password);
  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.email !== undefined) {
        document.getElementById("register-error").style.color = "grey";
        document.getElementById("register-error").innerText =
          "You're registered. You can now log-in with your credentials.";
      }
    })
    .catch(console.error);
};

// const goHome = () => {
//   if (localStorage.getItem("token")) {
//     console.log(localStorage.getItem("token"));
//     fetch("/home", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       .then((res) => (window.location = res.url))
//       .catch(console.error);
//   }
// };
