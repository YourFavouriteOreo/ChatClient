import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateUserID } from "../../actions/index";

class RegistrationForm extends Component {
    constructor() {
        super();
    
        this.state = {
          nameInput:"",
          idInput:"",
          isGetting: false
        };
    
        this.onNameInputChange = this.onNameInputChange.bind(this)
        this.onIDInputChange = this.onIDInputChange.bind(this)
      }

  //Complete Registration Process
  toggleComplete() {
    this.setState({
      isComplete: true
    });
  }

  register(){
    var socket = this.props.socket;
    var payload = ""

    if (this.state.nameInput !== ""){
      payload = this.state.nameInput
    }
    else if(this.state.idInput !=="") {
      payload = this.state.idInput
    }
    else {
      return
    }

    socket.emit("registerID",payload)
    this.setState({
      isGetting: true
    })
    socket.on("register", data => {
      this.props.updateUserID(data)
      socket.removeListener('register');
    });
  }

      onNameInputChange(e) {
        if (e.target.value.length < 20){
          this.setState({
            nameInput:e.target.value
          })
        }
      }
    
      onIDInputChange(e) {
        if (e.target.value.length < 20){
          this.setState({
            idInput:e.target.value
          })
        }
      }
    render() {
        return (
            <div>
                <h1 className="header-text">
              Welcome to <span className="purple">Oreo Client</span>
            </h1>
            <div className="columns">
              <div className="column">
                <p className="header-description">
                  Please type in your public display name. This name will be displayed to other users who add you.
                </p>
              </div>
              <div className="column">
                <p className="header-description">
                  If you are a revisiting user and have your previous ID. Please
                  provide the necessary information below.
                </p>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <input
                  className="input inputRegistration animated "
                  placeholder="Example: Toshinori Yagi"
                  disabled={(this.state.idInput !== "")}
                  value={this.state.nameInput}
                  onChange={this.onNameInputChange}
                />
              </div>
              <div className="column">
                <input className="input inputRegistration animated "
                disabled={(this.state.nameInput !== "")}
                value={this.state.idInput}
                onChange={this.onIDInputChange}
                />
              </div>
            </div>
            <button
                  className="button submitButton"
                  type="submit"
                  disabled={(this.state.nameInput.length < 1) && (this.state.idInput.length < 1)}
                  onClick={() => {
                    this.register();
                  }}
                >
                  Submit <i className="fas fa-arrow-right"> </i>
            </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      userID: state.userData.userID
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      updateUserID: userID => dispatch(updateUserID(userID))
    };
  };
  
  const ConnectedRegistrationForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegistrationForm);
  
export default ConnectedRegistrationForm;
  