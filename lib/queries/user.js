const db = require("../../models/user");
const constants = require("../../util/constants");
const logger = require('../../lib/logger'); 


createUser = async function (opts) {
  try {
    const user = await db.create(opts);
    return user;
  } catch (err) {
    logger.info(`Error in creating user db query: ${err.message}`);
    throw new Error(`Error in creating User`);
  }
};

const findUser = async function (opts) {
  const user = await db.findByPk(opts); // Assuming opts contains the user id
  return user;
};

const getUserByUserName = async function (userName) {
  const user = await db.findOne({ where: { userName: userName } });
  return user;
};

const updateUser = async function (id, user) {
  try {
    await db.update(user, { where: { id: id } });
    const updatedUser = await db.findByPk(id);
    return updatedUser;
  } catch (err) {
    logger.error(`Error in updating user: ${err.message}`);
    throw new Error(`Error in updating User`);
  }
};
const getAllUsers = async function () {
  return db.findAll();
};

const deleteUser = async function (opts) {
  const user = await db.destroy({ where: { id: opts } });
  return user;
};

module.exports = {
  createUser,
  findUser,
  getUserByUserName,
  updateUser,
  getAllUsers,
  deleteUser
};
