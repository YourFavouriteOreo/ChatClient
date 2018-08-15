import {SELECT_ACTIVE, UPDATE_CHAT, UPDATE_USERID} from '../constants/action-types';
import _ from "lodash";

const initialState = {
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
      },
      {
        chatName: "Test Chat 2",
        chatLogs: [
          { content: "Hey, what's up dude?", isUser: false },
          {
            content: "Nothing much. Just chilling honestly..... you?",
            isUser: true
          },
          {
            content:
              "Just watched the new DeadPool Movie! ITS SO SICK!!! ❤️❤️❤️❤️❤️",
            isUser: false
          }
        ],
        isTyping: true
      }
    ],
    activeChat : null,
    userData: {
      userID: null
    }
  };

  const rootReducer = (state = initialState,action) => {
      switch(action.type){

          case SELECT_ACTIVE:
          // Select Active Chat so as to display chat content
            var newState = Object.assign(state)
            var newActive = newState.chats[action.payload.index]
            newActive["index"]= action.payload.index
            return {...state,activeChat:newActive};

          case UPDATE_CHAT:
          // Update store with new Chat Content
          console.log("Update chat action executed");
            var chatState = _.cloneDeep(state)
            chatState.chats[state.activeChat.index].chatLogs = chatState.chats[state.activeChat.index].chatLogs.concat(action.payload)
            return {...chatState}
            case UPDATE_USERID:
          // Update store with new Chat Content
          console.log("Update USERID action executed");
            var newState = Object.assign(state)
            newState.userData.userID = action.payload.userID
            return {...newState}
          default:
          return state
      }
  }

export default rootReducer