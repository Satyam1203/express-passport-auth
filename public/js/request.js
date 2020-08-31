const logout = () => {
  fetch("/logout")
    .then((res) => (window.location = res.url))
    .catch(console.error);
};
