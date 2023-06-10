const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

//Create the User model by extending the Sequelize Model class
class User extends Model {
  //The checkPassword method is added to the User class to compare the login password with the stored hashed password.
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
//Initialize the User model and define its properties
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], //minimum length is 8
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        //when create a new user, password is encrypted by bcrypt
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
