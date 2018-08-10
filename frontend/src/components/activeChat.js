import React, { Component } from "react";
import ChatContent from "./chatContent";
import ChatInput from "./chatInput";
import NoActiveChat from "./noActivity"

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


  inputHandler = logs => {
    // New Var because push return length
    var newState = this.state.chatLogs;
    newState.push(logs);
    this.setState({
      chatLogs: newState,
    });
    console.log(this.state.chatLogs);
  };

  componentWillReceiveProps =(newProps)=>{
    this.setState({
        chatName: newProps.chat.chatName,
        chatLogs: newProps.chat.chatLogs,
        isTyping: newProps.chat.isTyping
    })
  }

  render() {
    if (this.state.chatLogs != null){
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
    else {
      return <NoActiveChat/>
    }
  }
}

export default ActiveChat;
