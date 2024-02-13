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

findUser = async function (opts) {
  const user = await db.findById( opts );
  return user;
};

getUserByUserName = async function (userName) {
  const user = (await db.findOne({ userName: userName  }).exec());
  return user;
};

updateUser = async function (id, user) {
  console.log(id)
  await db.findByIdAndUpdate(id,user);
  const updatedUser = (await db.findById(id));
  console.log(updatedUser);
  return updatedUser ;
};
getAllUsers = async function (opts) {
  return db.find();
};

deleteUser = async function (opts) {
  const user = await db.findByIdAndDelete( opts );
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
