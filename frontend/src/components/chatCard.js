import React, { Component } from "react";
import "./scss/chatCard.css";

class ChatCard extends Component {
  constructor(){
    super();

    this.lastMessageHandler = this.lastMessageHandler.bind(this);
  }
  lastMessageHandler() {
    var lastMessage= String(this.props.lastMessage)  
    if (lastMessage.length > 45){
      return lastMessage.substring(0,40)+"..."
    }
    return lastMessage
  }
  render() {
    return (
      <div className={"columns card "+ this.props.isActive} onClick={() => {
        console.log(this.props.isActive)
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
