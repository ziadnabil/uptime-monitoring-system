const { hashPassword, generateToken } = require('../../models/utils');
const { DataTypes } = require('sequelize');
var bcrypt = require('bcryptjs');
const { InvalidCredentials } = require('../../utils/Errors');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        required: true,
      },
      disable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deviceToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    { freezeTableName: true, timestamps: true },
  );

  User.beforeCreate(async (User) => {
    //Hashed password
    const hashedPassword = await hashPassword(User.password);
    User.password = hashedPassword;
  });

  User.prototype.changePassword = async function (newPassword) {
    //Hashed password
    const hashedPassword = await hashPassword(newPassword);
    this.password = hashedPassword;
    await this.save();
    return this.password;
  };

  User.prototype.checkPassword = async function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.login = async function (password) {
    let payload = { id: this.id, email: this.email };
    const check = bcrypt.compareSync(password, this.password);
    if (check) {
      const generatedToken = await generateToken(payload);

      await this.save();

      return generatedToken;
    }
    // throw an error;
    throw new InvalidCredentials('user');
  };

  User.associate = (models) => {
    User.hasMany(models.Check);
  };

  return User;
};
