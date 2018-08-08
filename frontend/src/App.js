import React, { Component } from "react";
import "./App.css";
import { Scrollbars } from "react-custom-scrollbars";
import ChatCard from "./components/chatCard";
const socket = require('socket.io-client')('http://localhost')

class App extends Component {
  componentDidMount() {
    console.log("running")
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
              <div className="column is-8 customColumn-right">
                <div className="topColumn">
                  <h1> Chat Name </h1>
                  <p> Chat Participants </p>
                </div>
                <div className="chatContent">
                  <div className="chatLogNonUser">
                    <p> Hey what's up? </p>
                  </div>
                  <div className="chatLogUser">
                    <p> Nothing much. Just chilling honestly..... you?</p>
                  </div>
                  <br />
                  <div className="chatLogNonUser">
                    <p>
                      {" "}
                      Bored.... Af... I hear antman is out. Wanna go watch it
                      tonight?
                    </p>
                  </div>
                  <div className="chatLogNonUser">
                    <p>
                      <span className="typing-indicator" />
                      <span className="typing-indicator" />
                      <span className="typing-indicator" /> &nbsp;
                    </p>
                  </div>
                </div>
                <div className="bottomColumn">
                  <i className="fas fa-smile-wink" />
                  <input className="input chatBar" />
                  <i className="fas fa-play-circle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
