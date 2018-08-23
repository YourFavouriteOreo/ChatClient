import React, { Component } from "react";
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart';
import './scss/utils.css'


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

    var content = this.state.currentInput

    this.setState({
      currentInput: ""
    });
    
    this.props.postSubmit(content);
  };

  emojiHandler =(emoji)=> {
    console.log(emoji);
    
    this.setState({
      currentInput: this.state.currentInput + emoji.native
    });
  }

  emojiStateHandler = () => {
    this.setState({emojiActive: !this.state.emojiActive})
  }
  changeHandler = e => {
    this.setState({
      currentInput: e.target.value
    });
  };

  render() {
    return (
      <div className="inputRow">
      <Picker
        onSelect={this.emojiHandler}
        className={this.emojiActive? "hidden" :""}
        title='Pick your emoji' emoji='point_up'
        style={{ position: 'absolute', bottom: '9vh', right: '21vw', width: '43vw',zIndex: 2, display: this.state.emojiActive? 'block':'none' }}
        i18n={{ search: 'Search', categories: { search: 'Search Results', recent: 'Recents' } }} 
        />
              
      <div className="bottomColumn">
        <i className="fas fa-laugh-wink iconButton" style={{ color: "#89216b" }} onClick={()=> {this.emojiStateHandler()}} />
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
