import React, { Component } from "react";

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentInput: ""
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
      <div className="bottomColumn">
        <i className="fas fa-laugh-wink" style={{ color: "#89216b" }} />
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
    );
  }
}

export default ChatInput;
