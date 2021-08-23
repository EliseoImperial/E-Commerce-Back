module.exports = (sequelize, Model, DataTypes) => {
  const bcrypt = require("bcryptjs");
  const salts = 10;
  class User extends Model {
    async validPassword(plaintextPassword) {
      return await bcrypt.compare(plaintextPassword, this.password);
    }
    async hash(password) {
      return await bcrypt.hash(password, salts);
    }
  }

  User.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        Validite: { isEmail: true },
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  User.beforeCreate(async (user, options) => {
    user.password = await bcrypt.hash(user.password, salts);
  });

  return User;
};
