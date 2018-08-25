import React, { Component } from "react";
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart';
import './scss/utils.css';
import {connect} from "react-redux";


class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentInput: "",
      isTyping : false,
      emojiActive: false
    };
  }

  

  // Handle Text Log Submission
  submitHandler = e => {
    this.setState({ isTyping: false })
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

  // Add text input to current input
  changeHandler = e => {
    this.setState({
      currentInput: e.target.value
    });
    if (this.state.currentInput.length > 1 && this.state.isTyping === false){
      this.setState({ isTyping: true })
      this.props.isTypingHandler({
        id:this.props.chatID,
        isTyping:true,
        userID:this.props.userID
      })
    }
    else if (this.state.currentInput.length <= 1 && this.state.isTyping === true) {
      
      this.setState({ isTyping: false })
      console.log("no typing")
      this.props.isTypingHandler({
        id:this.props.chatID,
        isTyping:false,
        userID:this.props.userID
      })
    }
  };

  // Adding Emojis to currentInput
  emojiHandler =(emoji)=> {
    console.log(emoji);
    this.setState({
      currentInput: this.state.currentInput + emoji.native
    });
  }

  // Turn On or Off Emoji
  emojiStateHandler = () => {
    this.setState({emojiActive: !this.state.emojiActive})
  }

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

//Redux Mapping for Store and Actions
const mapStateToProps = state => {
  return { 
    chatID: state.activeChat.id,
    userID: state.userData.userID
   };
};

var chatInputConnected = connect(mapStateToProps,null)(ChatInput)

export default chatInputConnected;
