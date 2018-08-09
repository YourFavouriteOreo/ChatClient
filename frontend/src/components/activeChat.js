import React, { Component } from "react";
import ChatContent from "./chatContent";
import ChatInput from "./chatInput";

class ActiveChat extends Component {
  constructor(props) {
    super(props);
    if (props.chat === null){
        this.state = {
            chatName: "Test Name",
            chatLogs: [],
            isTyping: false
          };
    }
    else {
        this.state = {
            chatName: props.chat.chatName,
            chatLogs: props.chat.chatLogs,
            isTyping: props.isTyping
          };
    }
  }


  inputHandler = logs => {
    // New Var because push return length
    var newState = this.state.chatLogs;
    newState.push(logs);
    this.setState({
      chatLogs: newState
    });
    console.log(this.state.chatLogs);
  };
  render() {
    return (
      <div className="column is-8 customColumn-right">
        <div className="topColumn">
          <h1 style={{fontFamily:"Quicksand,sans-serif", fontWeight:"bold", fontSize:"1.1rem"}}> {this.state.chatName} </h1>
          <p style={{fontFamily:"Roboto,sans-serif",marginLeft: "0.75rem",lineHeight:"1"}}> Chat Participants </p>
        </div>
        <ChatContent
          chatLogs={this.state.chatLogs}
          isTyping={this.state.isTyping}
        />
        <ChatInput postSubmit={this.inputHandler} />
      </div>
    );
  }
}

export default ActiveChat;
