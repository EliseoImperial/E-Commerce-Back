module.exports = (user) => {
  const newUser = { ...user }.dataValues;
  delete newUser.id;
  delete newUser.password;
  delete newUser.updatedAt;
  delete newUser.createdAt;
  return newUser;
};
