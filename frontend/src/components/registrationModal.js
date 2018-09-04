import React, { Component } from "react";
import "./scss/modal.css";
import RegistrationForm from "./registrationModal/registration";
import { connect } from "react-redux";

class RegistrationModal extends Component {
  constructor() {
    super();

    this.state = {
      isCompleteGetting: false,
      isComplete: false
    };
  }

  componentDidMount() {
    this.props.socket.on("register", () => {
      this.setState({ isCompleteGetting: true });
    });
  }

  render() {
    return (
      <div className={"modal " + (this.state.isComplete ? "" : "is-active")}>
        <div className="modal-background" />
        <div className="modal-card">
          <section className="modal-card-body">
            {!this.state.isCompleteGetting ? (
              <RegistrationForm socket={this.props.socket} />
            ) : (
              <div>
                <h1 className="header-text">
                  <span role="img" aria-label="Red Heart">
                    ❤️
                  </span>
                  Welcome to your new account
                  <span role="img" aria-label="Red Heart">
                    ❤️
                  </span>
                </h1>
                <div className="control-custom">
                  <p className="header-description">
                    Below is your private ID . Use this to re-log back into your
                    account
                  </p>
                  <p className="header-description">
                    <b> Do not share this with anyone</b>
                  </p>
                  <input
                    className="input inputRegistration animated "
                    readOnly={true}
                    value={this.props.privateID}
                  />
                </div>
                <div className="control-custom">
                  <p className="header-description">
                    Below is your public ID . Share this your buddies to engage
                    in chats
                  </p>
                  <input
                    className="input inputRegistration animated "
                    readOnly={true}
                    value={this.props.publicID}
                  />
                </div>
                <button 
                className="button submitButton" 
                type="submit"
                onClick= {()=> {this.setState({isComplete: true})}}
                >
                  Complete Registration <i className="fas fa-arrow-right"> </i>{" "}
                </button>
                <h1 className="header-description control">
                  Thank you for trying out Oreo Client . I hope you enjoy using
                  my client
                </h1>
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    privateID: state.userData.privateID,
    publicID: state.userData.publicID
  };
};

var connectedRegistrationModal = connect(
  mapStateToProps,
  null
)(RegistrationModal);

export default connectedRegistrationModal;
