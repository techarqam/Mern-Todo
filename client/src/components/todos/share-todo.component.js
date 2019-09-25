import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers, shareToUsers } from "../../actions/authActions";

class TodoShare extends Component {



    constructor(props) {
        super(props);
        this.state = {
            users: [],
            selUsers: [],
        };
    }

    componentWillMount() {
        this.getAllUsers();
    }

    getAllUsers() {
        this.props.getAllUsers().then(users => {
            this.setState({ users: users.data });
        })
    }
    handleChange({ target }) {
        console.log(target.value)
        if (target.checked) {
            this.state.selUsers.push(target.value);
        } else {
            this.state.selUsers.splice(this.state.selUsers.indexOf(target.value), 1)
        }
    }

    handleCancel(e) {
        e.preventDefault();
        window.location = "/dashboard";
    }
    handleShare(e) {
        e.preventDefault();
        const shareTodo = {
            users: this.state.selUsers,
            todoId: this.props.match.params.id,
            sharedBy: this.props.auth.user.id
        }
        this.props.shareToUsers(shareTodo).then(() => {
            window.location = "/dashboard";
        })
    }

    render() {
        const userI = this.state.users.map((user) =>
            <form action="#" key={user._id}>
                <p >
                    <label>
                        <input
                            type="checkbox"
                            onClick={this.handleChange.bind(this)}
                            value={user._id}
                        />
                        <span>
                            <span className="todoName">{user.name}</span>
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
                        <h4 style={{ marginBottom: "4rem" }}>Select Users</h4>
                        {userI}
                        <div className="col s12" style={{ paddingLeft: "11.250px", float: "right" }}>

                            < button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                    float: "right"
                                }}
                                onClick={e => this.handleShare(e)}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                <i class="material-icons right">send</i>
                                Share
                            </button>

                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                    float: "right",
                                    marginRight: "1rem"
                                }}
                                onClick={e => this.handleCancel(e)}
                                className="btn btn-large waves-effect waves-light hoverable  blue-grey lighten-2"
                            >
                                Cancel
                            </button>

                        </div>



                    </div>
                </div>
            </div >
        )
    }
}





TodoShare.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { getAllUsers, shareToUsers }
)(TodoShare);