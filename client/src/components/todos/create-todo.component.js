import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTodo } from "../../actions/authActions";
import classnames from "classnames";

class CreateTodo extends Component {


    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            description: '',
            completed: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }



    onSubmit(e) {
        e.preventDefault();

        const newTodo = {
            name: this.state.name,
            description: this.state.description,
            completed: false,
            user: this.props.auth.user.id
        }
        this.props.addTodo(newTodo);
        this.setState({
            name: '',
            description: '',
            completed: false,
            user: this.props.auth.user.id
        })
    }


    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };


    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>Add Todo</h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    // error={errors.email}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                                <label htmlFor="name">Todo Name</label>
                                {/* <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span> */}
                            </div>
                            <div className="input-field col s12">
                                <textarea
                                    className="materialize-textarea"
                                    onChange={this.onChange}
                                    value={this.state.description}
                                    // error={errors.password}
                                    id="description"
                                // className={classnames("", {
                                //     invalid: errors.password || errors.passwordincorrect
                                // })}
                                ></textarea>
                                <label htmlFor="description">Description</label>
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
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Add Todo
                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

CreateTodo.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { addTodo }
)(CreateTodo);