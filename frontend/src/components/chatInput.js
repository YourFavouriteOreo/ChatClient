import React, { Component } from "react";


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

  render() {
    return (
      <div className="inputRow">
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
