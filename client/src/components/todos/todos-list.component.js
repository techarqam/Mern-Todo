import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTodo, getAllTodos, updateTodoStatus } from "../../actions/authActions";
import { Link } from "react-router-dom";

class TodoLists extends Component {

    constructor(props) {
        super(props);
        let { router } = this.props;
        this.state = { todos: [] };
    }

    componentWillMount() {
        this.getAllTodos();
    }

    getAllTodos() {
        this.props.getAllTodos(this.props.auth.user.id).then(todos => {
            this.setState({ todos: todos.data });
        })
    }

    handleChange({ target }) {
        let todoUpdate = {
            "completed": target.checked,
            "_id": target.value
        }
        this.props.updateTodoStatus(todoUpdate);
    }
    handleDelete(e, id) {
        e.preventDefault();
        this.props.deleteTodo(id).then(() => {
            this.getAllTodos();
        })
    }
    handleEdit(e, id) {
        e.preventDefault();
        console.log(id);

        this.props.router.push('/edit-todo', { id: id });



        // window.location.href = "./login";


        // this.props.deleteTodo(id).then(() => {
        //     this.getAllTodos();
        // })
    }


    render() {
        const todoItems = this.state.todos.map((todo) =>
            <form action="#" key={todo._id}>
                <p >
                    <label>
                        <input
                            type="checkbox"
                            defaultChecked={todo.completed}
                            onClick={this.handleChange.bind(this)}
                            value={todo._id}
                        />
                        <span>
                            <span className="todoName">{todo.name}</span>
                            <br />
                            <span >{todo.description}</span>
                        </span>


                        <span style={{
                            float: "right"
                        }}>

                            <Link to={"/edit-todo/" + todo._id}>
                                <a style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    color: "blue",
                                    cursor: "pointer"
                                }}
                                // onClick={e => this.handleEdit(e, todo._id)} value={todo._id}
                                >
                                    <i className="material-icons left">create</i>
                                </a>
                            </Link>


                            <a style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                color: "red",
                                cursor: "pointer"
                            }}
                                onClick={e => this.handleDelete(e, todo._id)} value={todo._id}>
                                <i className="material-icons left">delete</i>
                            </a>
                        </span>


                        {/* <i className="material-icons icon-red"  >delete</i> */}

                    </label>
                </p>
                <br />
            </form>
        );
        return (
            <div style={{ marginTop: "4rem" }} >
                {todoItems}
            </div>
        )
    }
}





TodoLists.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { deleteTodo, getAllTodos, updateTodoStatus }
)(TodoLists);