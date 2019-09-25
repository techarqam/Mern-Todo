import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TodoLists from "../todos/todos-list.component";


import { logoutUser } from "../../actions/authActions";
class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
        return (

            // <div>

                <div className="container">
                    <div style={{ marginTop: "4rem" }} className="row">
                        <div className="col s8 ">


                            <Link
                                to="/create-todo"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    float: "right",
                                }}
                                className="btn  waves-effect waves-light hoverable blue accent-3"
                            >
                                <i className="material-icons left">add</i>
                                Create Todo
              </Link>

                            <TodoLists />
                        </div>


                        <div
                            className="col s4"
                            style={{ textAlign: "center" }}
                        >

                            <h5><b>{user.name}</b></h5>
                            <h5><b>{user.email}</b></h5>




                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "4rem",
                                }}
                                onClick={this.onLogoutClick}
                                className="btn  waves-effect waves-light hoverable red accent-3"
                            >
                                Logout
                            </button>



                        </div>


                    </div>
                </div>


            // </div>

            // <div style={{ height: "75vh" }} className="container valign-wrapper">
            //     <div className="row">
            //         <div className="col s12 center-align">
            //             <h4>
            //                 <b>Hey there,</b> {user.name.split(" ")[0]}
            //                 <p className="flow-text grey-text text-darken-1">
            //                     You are logged into a full-stack{" "}
            //                     <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
            //   </p>
            //             </h4>
            //             <button
            //                 style={{
            //                     width: "150px",
            //                     borderRadius: "3px",
            //                     letterSpacing: "1.5px",
            //                     marginTop: "1rem"
            //                 }}
            //                 onClick={this.onLogoutClick}
            //                 className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            //             >
            //                 Logout
            // </button>
            //         </div>
            //     </div>
            // </div>
        );
    }
}
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);