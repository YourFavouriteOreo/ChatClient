import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import './scss/chatContent.css'

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
  render() {
    return (
      <div className="chatContent">
        <Scrollbars className="scrollbarsClass">
          <div style={{ padding: "1rem 2rem" }}>
            {this.props.chatLogs.map(function(val, index) {
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
                visibility: this.props.isTyping === true ? "visible" : "hidden"
              }}
            >
              <p className="bulge">
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

const mapStateToProps = state => {
  return { 
    chatLogs: state.activeChat.chatLogs,
    isTyping: state.activeChat.isTyping
  };
};

const chatContentConnected = connect(mapStateToProps,null)(chatContent)


export default chatContentConnected;
