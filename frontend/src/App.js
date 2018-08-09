// Module / Utility imports
import React, { Component } from "react";
import "./App.css";
import { Scrollbars } from "react-custom-scrollbars";
// Custom Components
import ChatCard from "./components/chatCard";
import ActiveChat from "./components/activeChat";

const socket = require("socket.io-client")("http://localhost");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [
        {
          chatName: "Test Chat Name",
          chatLogs: [
            { content: "Hey, what's up?", isUser: false },
            {
              content: "Nothing much. Just chilling honestly..... you?",
              isUser: true
            },
            {
              content:
                "Bored.... Af... I hear antman is out. Wanna go watch it tonight?",
              isUser: false
            }
          ],
          isTyping: false
        }
      ],
      activeChat : null
    };
  }
  componentWillMount() {
    console.log("running");

    this.setState({
      activeChat: this.state.chats[0]
    })

    socket.on("register", function(data) {
      console.log(data);
    });
  }

  render() {
    return (
      <div className="App">
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
                        <i className="fas fa-lg fa-comment-alt" />
                      </span>
                      <span className="icon level-item">
                        <i className="fas fa-lg fa-sliders-h" />
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
                    <ChatCard />
                    <ChatCard />
                    <ChatCard />
                    <ChatCard />
                    <ChatCard />
                    <ChatCard />
                    <ChatCard />
                    <ChatCard />
                    <ChatCard />
                    <ChatCard />
                  </Scrollbars>
                </div>
              </div>
              <ActiveChat chat={this.state.activeChat} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
