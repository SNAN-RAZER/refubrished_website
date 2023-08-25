const { registerUser, userLogin } = require("../controllers/User_Controllers/userController");

const userRouter = require("express").Router();

//For new User registration
userRouter.post("/register", registerUser);

//For user registration
userRouter.post('/login', userLogin);


module.exports = userRouter;
