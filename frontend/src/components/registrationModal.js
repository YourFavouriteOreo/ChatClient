import React, { Component } from "react";
import "./scss/modal.css";
import {connect} from 'react-redux'
import { updateUserID } from "../actions/index";

class RegistrationModal extends Component {

    componentWillMount(){
        var socket = this.props.socket;
        socket.on("register", data => {
              console.log(data);
              this.props.updateUserID(data)
            });
    }
  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <section className="modal-card-body">
            {this.props.userID 
            ?( 
            <div>
                <h1 className="header-text"> Welcome to Oreo Client</h1>
            <p className="header-description"> Below is your ID . If you would like to re-use existing chats in future visits</p>
                <div class="control">
            <input className="input animated bounceInLeft" value={this.props.userID} disabled={true}/>
            </div>
            <p className="header-description"> If you are a revisiting user and have your previous ID. Please provide the necessary information below.</p>
            <div class="control">
            <input className="input animated " />
            </div>
            <button className="button submitButton"> Continue <i className="fas fa-arrow-right"> </i></button>
            </div>
            )
            : <div> <h1 className="header-text"> We are preparing your User ID . Please wait a moment.</h1>  <img alt="Loading Icon" className="loadingIcon" src={require("../assets/img/loading.svg")} /></div>
         }
         
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    console.log(state)
    return {
      userID: state.userData.userID,
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        updateUserID: userID => dispatch(updateUserID(userID))
      };
}

const ConnectedRegsitrationModal = connect(mapStateToProps,mapDispatchToProps)(RegistrationModal)

export default ConnectedRegsitrationModal;
