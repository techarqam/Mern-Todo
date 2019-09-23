const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateTodo(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.completed = !isEmpty(data.completed) ? data.completed : "";
    // name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Todo name cannot be empty";
    }
    // Password checks
    if (Validator.isEmpty(data.completed)) {
        errors.completed = "Todo status required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};