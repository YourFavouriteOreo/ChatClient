import React, { Component } from "react";
import "./App.css";
import {Scrollbars} from 'react-custom-scrollbars';
import ChatCard from "./components/chatCard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="VanSha justify-content-between ">
          <div className="hero">
            <div className="columns">
              <div className="column is-4 customColumn-left">
                <div className="topColumn" >
                <img className="smallAvatar topBarIcon" src="https://picsum.photos/200/200/?random"/>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
