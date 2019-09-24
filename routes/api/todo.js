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
        // completed: req.body.completed
    });
    newTodo
        .save()
        .then(todo => res.json(todo))
        .catch(err => console.log(err));
});




module.exports = router;
