const { registerUser, 
    userLogin, 
    getUSerData, 
    getAllUsers,
    updateUserStatus
 } = require("../controllers/User_Controllers/userController");
const authMiddleware = require('../middleware/authMiddleware');
const userRouter = require("express").Router();

//For new User registration
userRouter.post("/register", registerUser);

//For user registration
userRouter.post('/login', userLogin);


// Verify userData
userRouter.get('/get-User-data',authMiddleware,getUSerData);

// get all users
userRouter.get('/get-all-users',authMiddleware, getAllUsers)


// Update userStatus
userRouter.put('/update-user-status/:id',authMiddleware,updateUserStatus)
module.exports = userRouter;
