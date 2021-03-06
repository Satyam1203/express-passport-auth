const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
};

const checkunAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/home");
  }
  return next();
};

module.exports = {
  checkAuth,
  checkunAuth,
};
