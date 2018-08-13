import React, { Component } from "react";
import "./scss/chatCard.css";

class ChatCard extends Component {
  constructor(){
    super();

    this.lastMessageHandler = this.lastMessageHandler.bind(this);
  }
  lastMessageHandler() {
    var lastMessage= String(this.props.lastMessage)  
    return lastMessage.substring(0,40)+"..."
  }
  render() {
    return (
      <div className="columns card" onClick={() => {
        this.props.onClick();
      }}>
        <div className="column is-3">
          <img
            className="avatar"
            src="https://picsum.photos/200/200/?random"
            alt=""
          />
        </div>
        <div className="column">
          <div className="chatCardDetails">
            <h3> {this.props.chatName} </h3>
            <p> {this.lastMessageHandler()} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatCard;
