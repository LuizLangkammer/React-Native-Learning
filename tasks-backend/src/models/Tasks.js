const mongoose = require('mongoose');

const Tasks = mongoose.model('Tasks', {
    desc: {type: String, required: true},
    estimatedAt: {type: Date, required: true},
    doneAt: {type: Date, required: false},
    userId: {type: mongoose.Types.ObjectId, required: true}
})

module.exports = Tasks;