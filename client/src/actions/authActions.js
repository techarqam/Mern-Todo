import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};
// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};

// Add Todo
export const addTodo = (newTodo) => dispatch => {
    return axios
        .post("/api/todos/todo", newTodo)
        // .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// Get All Todos
export const getAllTodos = (uid, history) => dispatch => {
    return axios.post("/api/todos/getalltodos", { user: uid })
        .then(todos => {
            return todos;
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// Get All Todos
export const updateTodoStatus = (updatedTodo, history) => dispatch => {
    return axios.post("/api/todos/updatedTodo", { todo: updatedTodo })
        // .then(todos => {
        //     return todos;
        // })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// Get All Todos
export const deleteTodo = (delTodoId, history) => dispatch => {
    return axios.post("/api/todos/deleteTodo", { todo: delTodoId })
        .then(todos => {
            return todos;
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const getSingleTodo = (todoId, history) => dispatch => {
    return axios.post("/api/todos/getonetodo", { todo: todoId })
        .then(todo => {
            return todo;
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const updateSingleTodo = (todo, history) => dispatch => {
    return axios.post("/api/todos/updateonetodo", { todo: todo })
        .then(todo => {
            return todo;
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const getAllUsers = (history) => dispatch => {
    return axios.get("/api/users/getallusers")
        .then(users => {
            return users;
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const shareToUsers = (todo, history) => dispatch => {
    console.log(todo)
    return axios.post("/api/todos/sharetodo", { todo: todo })
        .then(users => {
            return users;
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const getAllShared = (uid, history) => dispatch => {
    console.log(uid)

    return axios.post("/api/todos/getallshared", { user: uid })
        .then(todos => {
            return todos;
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
