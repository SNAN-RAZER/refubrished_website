const { registerUser, userLogin, getUSerData } = require("../controllers/User_Controllers/userController");
const userMIddleware = require('../middleware/authMiddleware');
const userRouter = require("express").Router();

//For new User registration
userRouter.post("/register", registerUser);

//For user registration
userRouter.post('/login', userLogin);


// Verify userData
userRouter.get('/get-User-data',userMIddleware,getUSerData);
module.exports = userRouter;
