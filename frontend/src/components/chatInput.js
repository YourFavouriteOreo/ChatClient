import React, { Component } from "react";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentInput: "",
      emojiActive: false
    };
  }
  submitHandler = e => {
    e.preventDefault();
    if (this.state.currentInput === "") {
      return null;
    }
    var chatLog = {
      content: this.state.currentInput,
      isUser: true
    };
    this.setState({
      currentInput: ""
    });
    this.props.postSubmit(chatLog);
  };
  changeHandler = e => {
    this.setState({
      currentInput: e.target.value
    });
  };

  addEmoji = emoji => {
    console.log(emoji)
    this.setState({
      currentInput: this.state.currentInput+emoji.native
    });
  }

  emojiHandler = () => {
    this.setState({emojiActive: !this.state.emojiActive})
  }

  render() {
    return (
      <div className="inputRow">
      <Picker
      native="true"
      onSelect={this.addEmoji}
      i18n={{ search: 'Search', categories: { search: 'Search Results', recent: 'Recents' } }}
      style={{position:"fixed",top:"38%",width:"58vw",margin:"auto",left:"34.5vw",display: this.state.emojiActive? 'block':'none'}}
      title="Life is never complete without an extra emoji"
      emoji="point_up"
      />
      <div className="bottomColumn">
        <i className="fas fa-laugh-wink iconButton" style={{ color: "#89216b" }} onClick={()=> {this.emojiHandler()}} />
        <form onSubmit={this.submitHandler} style={{ width: "90%" }}>
          <input
            onChange={this.changeHandler}
            value={this.state.currentInput}
            className="input chatBar"
          />
          <div className="sendButton">
            <button type="submit">
              {" "}
              <i className="fas fa-paper-plane" />{" "}
            </button>
          </div>
        </form>
      </div>
       </div>
    );
  }
}

export default ChatInput;
