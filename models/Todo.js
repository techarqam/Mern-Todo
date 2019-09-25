const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TodoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    user: {
        type: String,
        required: true,
    },
    sharedByName: {
        type: String,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Todo = mongoose.model("todos", TodoSchema);