import {SELECT_ACTIVE, UPDATE_CHAT, UPDATE_USERID,UPDATE_CHAT_LIST,UPDATE_CHAT_TYPING} from '../constants/action-types';
import _ from "lodash";
var chatState = {}

const initialState = {
    chats: {
      // "test1": {
      //   id: "test1",
      //   chatName: "test1",
      //   chatLogs: [
      //   ],
      //   isTyping: true
      // },
      // "test2": {
      //   id: "test2",
      //   chatName: "test2",
      //   chatLogs: [
      //   ],
      //   isTyping: true
      // }
    },
    activeChat : null,
    userData: {
      privateID: "",
      publicID: "",
      publicName: ""
    }
  };

  const rootReducer = (state = initialState,action) => {
    var newState
      switch(action.type){

          case SELECT_ACTIVE:
          // Select Active Chat so as to display chat content
            newState = Object.assign(state)
            var newActive = newState.chats[action.payload.index]
            newActive["index"]= action.payload.index
            return {...state,activeChat:newActive};

          case UPDATE_CHAT_TYPING:
            chatState = _.cloneDeep(state)
            chatState.chats[action.payload.id].isTyping = action.payload.isTyping
            return {...chatState}

          case UPDATE_CHAT:
          // Update store with new Chat Content
            chatState = _.cloneDeep(state)
            console.log(action.payload.id)
            console.log(chatState)
            var chatToBeUpdated = chatState.chats[action.payload.id]
            chatToBeUpdated.chatLogs = chatToBeUpdated.chatLogs.concat(action.payload.chatLog)
            return {...chatState}

            case UPDATE_USERID:
          // Update user ID upon receiving registration
            newState = Object.assign(state)
            newState.userData = action.payload
            return {...newState}

            case UPDATE_CHAT_LIST:
            // Create new chats than have been verified via server 
            newState = _.cloneDeep(state)
            newState.chats[action.payload.id] = {
              id: action.payload.id,
              chatName: action.payload.name,
              chatLogs: [
              ],
              isTyping: false
            }
            return newState

          default:
          return state
      }
  }

export default rootReducer