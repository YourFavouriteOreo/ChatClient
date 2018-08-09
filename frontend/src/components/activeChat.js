import React, { Component } from "react";
import ChatContent from "./chatContent";
import ChatInput from "./chatInput";

class ActiveChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatName: "Test Chat Name",
      chatLogs: [
        { content: "Hey, what's up?", isUser: false },
        {
          content: "Nothing much. Just chilling honestly..... you?",
          isUser: true
        },
        {
          content:
            "Bored.... Af... I hear antman is out. Wanna go watch it tonight?",
          isUser: false
        }
      ],
      isTyping: false
    };
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
