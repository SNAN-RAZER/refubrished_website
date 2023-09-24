const dotenv = require('dotenv');
var cloudinary = require('cloudinary').v2;

dotenv.config();


cloudinary.config({ 
  cloud_name: 'dyrrreym3', 
  api_key: '881722949389628', 
  api_secret: "laGYYS-QuVYhpclVs1oXK630wBo",
});


module.exports = cloudinary;
