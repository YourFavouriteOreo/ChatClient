import React, { Component } from "react";
import "./scss/chatCard.css";

class ChatCard extends Component {
  render() {
    return (
      <div className="columns card">
        <div className="column is-3">
          <img
            className="avatar"
            src="https://picsum.photos/200/200/?random"
            alt=""
          />
        </div>
        <div className="column">
          <div className="chatCardDetails">
            <h3> Name </h3>
            <p> Last Message Sent </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatCard;
