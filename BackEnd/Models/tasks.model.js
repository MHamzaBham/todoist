const mongoose = require('mongoose');

const taksSchema = {
    title: {
        type: String,
        required: true
    },
    description: String,
    userId: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now,
    }
}

const Task = mongoose.model("tasks", taksSchema)
module.exports = Task;