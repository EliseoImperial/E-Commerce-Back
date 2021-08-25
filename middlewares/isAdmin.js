function isAdmin(req, res, next) {
  if (req.user.roleId === 4) {
    return next();
  } else {
    res.status(401).json("You are not admin.");
  }
}

module.exports = isAdmin;
