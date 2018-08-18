import React, { Component } from "react";
import './scss/dropdown.css'
import {connect} from 'react-redux'
import { updateChatList } from "../actions/index";

class DropDown extends Component {
    constructor(){
        super()

        this.state = {
            isActive: false,
            currentInput: "",
            isSubmitted: "",
          }
    }

    changeHandler = e => {
      this.setState({
        currentInput: e.target.value
      });
    };

    onSubmitHandler =event=>{
      event.preventDefault();
      var socket = this.props.socket;
      socket.emit("Add Chat",{userID:this.props.userID,friendID:this.state.currentInput})
    }

  render() {
    return (
      <div
        className={
          "dropdown " + (this.state.isActive ? "is-active" : "")
        }
      >
        <div className="dropdown-trigger">
          <span
            className="icon iconButton is-small"
            onClick={() => {
              this.setState({
                isActive: !this.state.isActive
              });
            }}
          >
            <i className="fas fa-plus" aria-hidden="true" />
          </span>
        </div>
        <div className="dropdown-menu" id="dropdown-menu7" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <form onSubmit={this.onSubmitHandler}>
              <h3 className="dropdown-header-text">
                Please enter your buddy's ID.
              </h3>
              <input className="input dropdown-input spacing" value={this.currentInput} onChange={this.changeHandler} placeholder="Shared User ID"/>
              <button className="button submitButton spacing">Add Chat <i className="fas fa-arrow-right"></i></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userID: state.userData.userID,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateChatList: chat => dispatch(updateChatList(chat))
  };
};

const ConnectedDropDown = connect(mapStateToProps,mapDispatchToProps)(DropDown)

export default ConnectedDropDown;