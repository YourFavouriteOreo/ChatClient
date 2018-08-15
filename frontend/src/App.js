// Module / Utility imports
import React, { Component } from "react";
import "./App.css";
import { Scrollbars } from "react-custom-scrollbars";
// Custom Components
import ChatCard from "./components/chatCard";
import ActiveChat from "./components/activeChat";
import { connect } from "react-redux";
import { selectActiveChat } from "./actions/index";
import RegistrationModal from "./components/registrationModal"
const socket = require("socket.io-client")("http://"+window.location.hostname);

class App extends Component {
  constructor() {
    super();
    this.chatCardHandler = this.chatCardHandler.bind(this);
  }

  componentDidMount = () => {
    // socket.on("register", data => {
    //   console.log(data);
    // });
  };

  componentWillReceiveProps(newProps) {
  }
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
      <RegistrationModal socket={socket}/>
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
                        <i className="fas fa-lg fa-plus" />
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
                    {this.props.chats.map((val, index) => {
                      return (
                        <ChatCard
                          key={index}
                          chatName={val.chatName}
                          lastMessage={
                            val.chatLogs[val.chatLogs.length - 1].content
                          }
                          onClick={() => {
                            this.chatCardHandler(index);
                          }}
                          isActive={this.chatCardActiveHandler(index)}
                        />
                      );
                    })}
                  </Scrollbars>
                </div>
              </div>
              <ActiveChat />
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
    selectActive: chat => dispatch(selectActiveChat(chat))
  };
};

const Application = connect(mapStateToProps,mapDispatchToProps)(App);

export default Application;
