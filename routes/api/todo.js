const express = require("express");
const router = express.Router();

const validateTodo = require("../../validation/todo");

const Todo = require("../../models/Todo");


router.post("/todo", (req, res) => {
    const { errors, isValid } = validateTodo(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newTodo = new Todo({
        name: req.body.name,
        description: req.body.description,
        user: req.body.user,
        completed: req.body.completed
    });
    newTodo
        .save()
        .then(todo => res.json(todo))
        .catch(err => console.log(err));
});

router.post("/getalltodos", (req, res) => {

    let user = req.body.user;
    Todo.find({ user: user }, function (err, todos) {
        var todoMap = {};
        todos.forEach(function (todo) {
            todoMap[todo._id] = todo;
        });
        res.send(todoMap);
    });


});




module.exports = router;
