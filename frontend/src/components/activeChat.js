import React, { Component } from "react";
import ChatContent from "./chatContent";
import ChatInput from "./chatInput";
import NoActiveChat from "./noActivity"
import { connect } from "react-redux";
import { updateActiveChat } from "../actions/index";

class ActiveChat extends Component {
  constructor(props) {
    super(props);
    if (props.chat === null){
        this.state = {
            chatName: "",
            chatLogs: null,
            isTyping: false
          };
    }
  }

  componentWillReceiveProps(newProps){
    // Change Props on Receive 
    console.log("das new props");
    this.setState({
      chatName: newProps.activeChat.chatName,
      chatLogs: newProps.activeChat.chatLogs,
      isTyping: newProps.activeChat.isTyping
    })
  }


  inputHandler = logs => {
    // Handle Input from chatInput
    var newState = this.state.chatLogs;
    newState.push(logs);
    this.props.updateActiveChat(logs)
    console.log(this.state.chatLogs);
    // BAD HOTFIX
    this.setState({});
  };

  render() {
    if (this.state != null){
      return (
        <div className="column is-8 customColumn-right">
          <div className="topColumn">
            <h1 style={{fontFamily:"Quicksand,sans-serif", fontWeight:"bold", fontSize:"1.1rem"}}> {this.state.chatName} </h1>
            <p style={{fontFamily:"Roboto,sans-serif",marginLeft: "0.75rem",lineHeight:"1"}}> Chat Participants </p>
          </div>
          <ChatContent
            chatLogs={this.props.activeChat.chatLogs}
            isTyping={this.state.isTyping}
          />
          <ChatInput postSubmit={this.inputHandler} />
        </div>
      );
    }
    else {
      return <NoActiveChat/>
    }
  }
}

//Redux Mapping for Store and Actions
const mapStateToProps = state => {
  return { activeChat: state.activeChat };
};

const mapDispatchToProps = dispatch => {
  return {
    updateActiveChat: chat => dispatch(updateActiveChat(chat))
  }
}

const activeChatConnected = connect(mapStateToProps,mapDispatchToProps)(ActiveChat)


export default activeChatConnected;
