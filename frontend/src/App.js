// Module / Utility imports
import React, { Component } from "react";
import "./App.css";
import { Scrollbars } from "react-custom-scrollbars";
// Custom Components
import ChatCard from "./components/chatCard";
import ActiveChat from "./components/activeChat";
import { connect } from "react-redux";
import { selectActiveChat,updateChatList,updateChat } from "./actions/index";
import RegistrationModal from "./components/registrationModal";
import DropDown from "./components/DropDown"
const socket = require("socket.io-client")(
  "http://" + window.location.hostname
);

const DEBUG = false;

class App extends Component {
  constructor() {
    super();
    this.chatCardHandler = this.chatCardHandler.bind(this);
  }

  componentDidMount = () => {
    socket.on("Add Chat", data => {
      this.props.updateChatList(data)
    });
    socket.on("Chat Broadcast",data => {
      console.log("CHAT BROADCAST RECEIVED")
      this.props.updateChat(data)
    })
  };

  componentWillReceiveProps() {}
  chatCardHandler(index) {
    this.props.selectActive({ index });
  }

  chatCardActiveHandler(index) {
    if (this.props.activeChat) {
      return index === this.props.activeChat.index ? "active" : "";
    }
    return "";
  }

  render() {
    return (
      <div className="App">
        {DEBUG?"":<RegistrationModal socket={socket} />}
        <div className="VanSha justify-content-between ">
          <div className="hero">
            <div className="columns">
              <div className="column is-4 customColumn-left">
                <div className="topColumn">
                  <div className="level">
                    <div className="level-left">
                      {" "}
                      <img
                        className="smallAvatar topBarIcon"
                        src="https://picsum.photos/200/200/?random"
                        alt=""
                      />{" "}
                    </div>
                    <div className="level-right">
                      <span className="icon, level-item">
                        <DropDown socket={socket}/>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="searchBar">
                  <div className="field">
                    <p className="control has-icons-left">
                      <input
                        className="input searchChat"
                        type="text"
                        placeholder="Search or start a new chat"
                      />
                      <span className="icon is-small is-left searchChatIcon">
                        <i className="fas fa-search " />
                      </span>
                    </p>
                  </div>
                </div>
                <div className="chatList">
                  <Scrollbars className="scrollbarsClass">
                    {Object.keys(this.props.chats).map((key, index) => {
                      return (
                        <ChatCard
                          key={key}
                          chatName={this.props.chats[key]["chatName"]}
                          lastMessage={
                            (this.props.chats[key].chatLogs[0] !== undefined?this.props.chats[key].chatLogs[this.props.chats[key].chatLogs.length-1].content:"")
                          }
                          onClick={() => {
                            this.chatCardHandler(key);
                          }}
                          isActive={this.chatCardActiveHandler(key)}
                        />
                      );
                    })}
                  </Scrollbars>
                </div>
              </div>
              <ActiveChat socket={socket} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chats: state.chats,
    activeChat: state.activeChat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectActive: chat => dispatch(selectActiveChat(chat)),
    updateChatList: chat => dispatch(updateChatList(chat)),
    updateChat: logs => dispatch(updateChat(logs))
  };
};

const Application = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default Application;
