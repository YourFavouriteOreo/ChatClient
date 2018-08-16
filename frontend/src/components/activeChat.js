import React, { Component } from "react";
import ChatContent from "./chatContent";
import ChatInput from "./chatInput";
import NoActiveChat from "./noActivity"
import { connect } from "react-redux";
import { updateActiveChat } from "../actions/index";

class ActiveChat extends Component {

  constructor (props) {
    super(props);

    this.inputHandler = this.inputHandler.bind(this)
  }

  inputHandler(logs){
    // Handle Input from chatInput
    console.log(logs);
    this.props.updateActiveChat(logs)
    console.log("emitted")
    console.log(this.props.socket);
    var socket = this.props.socket;
    socket.emit('chat',logs.content)
    socket.on('chat',(data)=>{
      this.props.updateActiveChat({content:data, isUser:false})
    })
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
          <ChatInput postSubmit={this.inputHandler} />
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
  return { activeChat: state.activeChat };
};

const mapDispatchToProps = dispatch => {
  return {
    updateActiveChat: chat => dispatch(updateActiveChat(chat))
  }
}

const activeChatConnected = connect(mapStateToProps,mapDispatchToProps)(ActiveChat)


export default activeChatConnected;
