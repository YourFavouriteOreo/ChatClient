import {SELECT_ACTIVE, UPDATE_CHAT, UPDATE_USERID,UPDATE_CHAT_LIST} from '../constants/action-types';
import _ from "lodash";

const initialState = {
    chats: {

    },
    activeChat : null,
    userData: {
      userID: null
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

          case UPDATE_CHAT:
          // Update store with new Chat Content
            var chatState = _.cloneDeep(state)
            var chatToBeUpdated = chatState.chats[action.payload.id]
            chatToBeUpdated.chatLogs = chatToBeUpdated.chatLogs.concat(action.payload.chatLog)
            return {...chatState}

            case UPDATE_USERID:
          // Update user ID upon receiving registration
            newState = Object.assign(state)
            newState.userData.userID = action.payload.userID
            return {...newState}

            case UPDATE_CHAT_LIST:
            // Create new chats than have been verified via server 
            newState = _.cloneDeep(state)
            newState.chats[action.payload] = {
              id: action.payload,
              chatName: action.payload,
              chatLogs: [
                
              ],
              isTyping: true
            }
            return newState

          default:
          return state
      }
  }

export default rootReducer