import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllTodos } from "../../actions/authActions";

class TodoLists extends Component {



    componentWillMount() {

        // let user = {
        //     "uid": 
        // }
        this.props.getAllTodos(this.props.auth.user.id)
            // .then(todos => {
            //     console.log(todos)
            // })

    }








    render() {
        return (
            <div>
                <h2>To do list</h2>
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
    { getAllTodos }
)(TodoLists);