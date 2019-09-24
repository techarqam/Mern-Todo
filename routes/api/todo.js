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
        res.send(todos);
    });
});

router.post("/updatedTodo", (req, res) => {
    let todoStatus = req.body.todo;
    Todo.findByIdAndUpdate(todoStatus._id, todoStatus, function (err, todos) {
        res.send("Updated");
    })
});
router.post("/deleteTodo", (req, res) => {
    let todo = req.body.todo;
    console.log(todo);
    Todo.findByIdAndDelete(todo, function (err, todos) {
        res.send("Deleted");
    })
});




module.exports = router;
