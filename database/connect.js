const mongoose = require('mongoose')

const connect = (uri) =>{
    mongoose.connect(uri,{
        authSource: 'admin',
    });
}
module.exports = connect;