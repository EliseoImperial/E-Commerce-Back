const { Role } = require("../models");

module.exports = async () => {
  const roles = [];

  roles.push(
    {
      name: "GUEST",
    },
    {
      name: "CUSTOMER",
    },
    {
      name: "DELETED",
    },
    {
      name: "ADMIN",
    }
  );

  await Role.bulkCreate(roles);
  console.log("[Database] Se corrió el seeder de Roles.");
};
