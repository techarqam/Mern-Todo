const express = require("express");
const router = express.Router();

const validateTodo = require("../../validation/todo");

const Todo = require("../../models/Todo");
const SharedTodo = require("../../models/SharedTodo");
const User = require("../../models/User");


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
router.post("/getonetodo", (req, res) => {
    let todo = req.body.todo;
    console.log(todo);
    Todo.findById(todo, function (err, todo) {
        res.send(todo);
    })
});
router.post("/updateonetodo", (req, res) => {
    let todo = req.body.todo;
    console.log(todo)
    Todo.findByIdAndUpdate(todo.id, todo, function (err, todo) {
        res.send(todo);
    })
});


router.post("/sharetodo", (req, res) => {
    let todo = req.body.todo;
    console.log(todo)
    todo.users.forEach(todoShare => {
        var shareTodo = {
            sharedTo: todoShare,
            sharedBy: todo.sharedBy,
            todoId: todo.todoId
        }
        console.log(shareTodo)
        SharedTodo.create(shareTodo, function (err, todo) {
        })
    });
    res.send(todo);
});

router.post("/getallshared", (req, res) => {
    var user = req.body.user;
    let todog = [];
    SharedTodo.find({ sharedTo: user }, function (err, todos) {

        todos.map(x => {
            Todo.findById(x.todoId, function (err, todor) {
                todog.push(todor);
                console.log(todor)
            })
            console.log(todog)
        })
        console.log(todog)




        //     for (var i = 0; i < todos.length; i++) {

        //             // User.findById(todos[i].sharedBy, function (err, user) {
        //             // todor.sharedBy = user.name;
        //             todog.push(todor);
        //             console.log(todor)
        //             // })
        //         })
        //     }
        //     console.log(todog)
        res.send(todog);
        // });

    });
});


module.exports = router;
