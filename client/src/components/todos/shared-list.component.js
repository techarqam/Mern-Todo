import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllShared } from "../../actions/authActions";
import { Link } from "react-router-dom";

class SharedList extends Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    componentWillMount() {
        this.getAllSharedTodos();
    }

    getAllSharedTodos() {
        console.log(this.props.auth.user.id)
        this.props.getAllShared(this.props.auth.user.id).then(todos => {
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


                            <Link to={"/share-todo/" + todo._id}>
                                <a style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    cursor: "pointer"
                                }}
                                >
                                    <i className="material-icons left">share</i>
                                </a>
                            </Link>


                            <Link to={"/edit-todo/" + todo._id}>
                                <a style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    color: "blue",
                                    cursor: "pointer"
                                }}
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


                    </label>
                </p>
                <br />
            </form>
        );

        return (

            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 ">

                        <div style={{ marginTop: "6rem" }} >
                            {todoItems}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}





SharedList.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { getAllShared }
)(SharedList);