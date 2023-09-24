const jwt = require('jsonwebtoken');


module.exports = async (req, res, next)=>{
try {
   const token = req.headers["authorization"].split(' ')[1];
   const decryptedToken = jwt.verify(token, process.env.TOKEN_SECRET);
   req.body.userId = decryptedToken.userId;
   console.log(decryptedToken)
   next();

} catch (error) {
    return res.status(500).send({
        message:`Error ${error.message}`,
        success: false
    })
}
}