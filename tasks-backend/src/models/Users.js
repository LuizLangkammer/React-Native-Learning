const mongoose = require('mongoose');

const Users = mongoose.model('Users', {
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

module.exports = Users;