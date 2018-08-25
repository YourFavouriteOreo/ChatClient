import React, { Component } from "react";
import ChatContent from "./chatContent";
import ChatInput from "./chatInput";
import NoActiveChat from "./noActivity"
import { connect } from "react-redux";
import { updateChat } from "../actions/index";
import _ from "lodash"


class ActiveChat extends Component {

  constructor (props) {
    super(props);
    this.isTypingHandler = this.isTypingHandler.bind(this)
    this.inputHandler = this.inputHandler.bind(this)
  }

  isTypingHandler(payload){
    console.log(payload);
    this.props.socket.emit("Chat isTyping",payload);
  }

  inputHandler(content){
    // Handle Input from chatInput and push it to chat
    var payload = {
      userID:this.props.userID,
      id:this.props.activeChat.id,
      chatLog:{
        content: content,
        isUser: true
      }
    }
    this.props.updateChat(payload)
    var broadcastPayload = _.cloneDeep(payload)
    broadcastPayload.chatLog.isUser = false;
    this.props.socket.emit("Chat Broadcast",broadcastPayload);
  };

  render() {
    if (this.props.activeChat != null){
      return (
        <div className="column is-8 customColumn-right">
          <div className="topColumn">
            <h1 style={{fontFamily:"Quicksand,sans-serif", fontWeight:"bold", fontSize:"1.1rem"}}> {this.props.activeChat.chatName} </h1>
            <p style={{fontFamily:"Roboto,sans-serif",marginLeft: "0.75rem",lineHeight:"1"}}> Chat Participants </p>
          </div>
          <ChatContent/>
          <ChatInput isTypingHandler={this.isTypingHandler} postSubmit={this.inputHandler} />
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
  return { 
    activeChat: state.activeChat,
    userID: state.userData.userID
   };
};

const mapDispatchToProps = dispatch => {
  return {
    updateChat: chat => dispatch(updateChat(chat))
  }
}

const activeChatConnected = connect(mapStateToProps,mapDispatchToProps)(ActiveChat)


export default activeChatConnected;
