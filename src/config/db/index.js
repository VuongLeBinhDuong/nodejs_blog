const mongoose = require('mongoose')

async function connect () {
    try {
        await mongoose.connect('mongodb://localhost:27017/test_dev');
        console.log('Connect sucessfully to db');
    } catch (error) {
        console.log('Fail to connect');
    }
}


module.exports = {connect}