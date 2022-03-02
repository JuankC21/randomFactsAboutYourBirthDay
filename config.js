const dotenv = require('dotenv');
dotenv.config();
console.log(process.env)
module.exports = {
    'PORT': process.env.PORT || 3000,
    'HOST': process.env.HOST
}