const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const joi=require('../middlewares/joi/user');



// create a new user
router.post("/users",joi.createUser, controller.createUser);
// update details for an existing user
router.put("/users",joi.updateUser, controller.updateUser);
//get users by userId
router.get('/users/:userId',controller.findUser);
//get all users
router.get("/users",controller.fetchAllUsers);

//delete user by userId
router.delete('/users/:userId',controller.deleteUser)

module.exports = router;
