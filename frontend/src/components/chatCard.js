import React, { Component } from "react";
import "./scss/chatCard.css";

class ChatCard extends Component {
  trimHandler(string, length){
    if (string.length > length){
      return string.substring(0,length)+"..."
    }
    return string
  }

  render() {
    return (
      <div className={"columns card "+ this.props.isActive} onClick={() => {
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
            <h3> {this.trimHandler(this.props.chatName,23)} </h3>
            <p> {this.trimHandler(this.props.lastMessage,32)} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatCard;
