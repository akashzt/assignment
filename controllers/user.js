const logger = require("../lib/logger");
const resp = require("../lib/response");
const query = require("../lib/queries/user");
const constants = require("../util/constants");
const _ = require("lodash");


const userProfileFields = ["_id", "userName","age","hobbies"];

const createUser = async function (req, res, next) {
  try {
    logger.info("In create User controller");
    const body = req.body;
    // do not allow duplicate userName in db
    if (body.userName && !!(await query.getUserByUserName(body.userName))) {
      return await resp.sendResponse(constants.response_code.DUPLICATE, "User Name already exist!", null, res);
    }
    let user = await query.createUser(body);
    logger.info(`Query: responded with new user created: ${user}`);
    res.body = _.pick(user, userProfileFields);
    return resp.sendResponse(constants.response_code.SUCCESS, "Success", _.pick(user, userProfileFields), res);
  } catch (err) {
    logger.info(`Error in creating user: ${err.message}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, null, null, res, err);
  }
};

const updateUser = async function (req, res, next) {
    const  {userId}  = req.params;
     const body = _.pick(req.body, userProfileFields);
   try{
    if (!(await query.findUser(userId))) {
      logger.info(`User not found with user id = ${userId} from database`);  
      return await resp.sendResponse(constants.response_code.NOT_FOUND, "User Id not found in database", null, res);
    }
      // do not allow duplicate userName in db if user want to upadte username
      if (body.userName && !!(await query.getUserByUserName(body.userName))) {
        return await resp.sendResponse(constants.response_code.DUPLICATE, "User Name already exist!", null, res);
      }
    let userUpdated = await query.updateUser(userId, body);
    userUpdatedValue = _.pick(userUpdated, userProfileFields);

    return resp.sendResponse(constants.response_code.SUCCESS, "User Updated", userUpdatedValue, res);
  } catch (err) {
    logger.info(`Error in updating user: ${err.message}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, err.message, null, res, err);
  }
};

const  fetchAllUsers = async function (req, res, next) {
    try{
      logger.info('Getting all Users from database');  
      let users=await query.getAllUsers();
      return resp.sendResponse(constants.response_code.SUCCESS, "All users List in database",users, res);
    }catch(err){
      logger.info(`Error in viewing all users in database: ${err.message}`);
      return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, null, null, res, err);
    }
}
const findUser = async function (req, res, next) {
    try { 
      let {userId}=req.params;
      let user = await query.findUser(userId);
     // do not found userId
     if (!user) {
      logger.info(`User not found with user id = ${userId} from database`);  
      return await resp.sendResponse(constants.response_code.NOT_FOUND, "User Id not found in database", null, res);
    }
    logger.info(`User found with user id = ${userId} from database`);
      return resp.sendResponse(constants.response_code.SUCCESS, "user get succesfully", user, res);
    } catch (err) {
      logger.info(`Error in getting user: ${err.message}`);
      return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, err.message, null, res, err);
    }
};

const deleteUser = async function (req, res, next) {
    try { 
      let {userId}=req.params;
      if (!(await query.findUser(userId))) {
        logger.info(`User not found with user id = ${userId} from database`);  
        return await resp.sendResponse(constants.response_code.NOT_FOUND, "User Id not found in database", null, res);
      }
      let userDeleted = await query.deleteUser(userId);
    
      return resp.sendResponse(constants.response_code.SUCCESS, "user deleted succesfully", userDeleted, res);
    } catch (err) {
      logger.info(`Error in deleting user: ${err.message}`);
      return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, err.message, null, res, err);
    }
};

module.exports = {
  createUser,
  updateUser,
  fetchAllUsers,
  deleteUser,
  findUser
  
};