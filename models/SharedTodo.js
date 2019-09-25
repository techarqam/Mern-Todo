const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SharedTodoSchema = new Schema({
    sharedTo: {
        type: String,
        required: true
    },
    sharedBy: {
        type: String,
    },
    todoId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = SharedTodo = mongoose.model("shared todos", SharedTodoSchema);