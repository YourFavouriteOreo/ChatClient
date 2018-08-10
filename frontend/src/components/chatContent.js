import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";

function ChatLog(props) {
  return (
    <div
      className={
        " animated bounceInUp " +
        (props.isUser === true ? "chatLogUser" : "chatLogNonUser")
      }
    >
      <p> {props.content}</p>
    </div>
  );
}

class chatContent extends Component {
  constructor(props) {
    super(props);
    if (props.chatLogs != null) {
      this.state = {
        chatLogs: props.chatLogs,
        isTyping: props.isTyping
      };
    }
  }
  componentWillReceiveProps = newProps => {
    this.setState({
      chatLogs: newProps.chatLogs,
      isTyping: newProps.isTyping
    });
  };

  render() {
    return (
      <div className="chatContent">
        <Scrollbars className="scrollbarsClass">
          <div style={{ padding: "1rem 2rem" }}>
            {this.state.chatLogs.map(function(val, index) {
              return (
                <ChatLog
                  key={index}
                  content={val.content}
                  isUser={val.isUser}
                />
              );
            })}
            <div
              className="chatLogNonUser"
              style={{
                visibility: this.state.isTyping === true ? "visible" : "hidden"
              }}
            >
              <p>
                <span className="typing-indicator" />
                <span className="typing-indicator" />
                <span className="typing-indicator" /> &nbsp;
              </p>
            </div>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default chatContent;
