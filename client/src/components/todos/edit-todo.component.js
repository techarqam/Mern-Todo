import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSingleTodo, updateSingleTodo } from "../../actions/authActions";
import classnames from "classnames";

class EditTodo extends Component {

    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {
            name: '',
            description: '',
            completed: '',
            errors: {},
            todo: {}
        }
    }

    componentDidMount() {
        this.getSingleTodo();
    }

    getSingleTodo() {
        this.props.getSingleTodo(this.props.match.params.id).then(todo => {
            console.log(todo.data)
            this.setState({
                todo: todo.data,
                name: todo.data.name,
                description: todo.data.description,
                completed: todo.data.completed,
            });
        })
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };


    onUpdate(e) {
        e.preventDefault();
        const newTodo = {
            name: this.state.name,
            description: this.state.description,
            completed: this.state.completed,
            user: this.props.auth.user.id,
            id: this.props.match.params.id,
        }
        this.props.updateSingleTodo(newTodo).then(() => {
            this.setState({
                name: '',
                description: '',
                completed: false,
                user: this.props.auth.user.id
            });
            window.location = "/dashboard";
        })
    }


    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>Update Todo</h4>
                        </div>
                        <form noValidate onSubmit={this.onUpdate}>
                            <div className="input-field col s12">
                                <input
                                    placeholder="Todo Name"
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    // error={errors.email}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                                {/* <label htmlFor="name">Todo Name</label> */}
                                {/* <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span> */}
                            </div>
                            <div className="input-field col s12">
                                <textarea
                                    placeholder="Todo Description"
                                    className="materialize-textarea"
                                    onChange={this.onChange}
                                    value={this.state.description}
                                    // error={errors.password}
                                    id="description"
                                // className={classnames("", {
                                //     invalid: errors.password || errors.passwordincorrect
                                // })}
                                ></textarea>
                                {/* <label htmlFor="description">Description</label> */}
                                {/* <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span> */}
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem",
                                        float: "right"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Update Todo
                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}


EditTodo.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { getSingleTodo, updateSingleTodo }
)(EditTodo);