import {SELECT_ACTIVE, UPDATE_CHAT,UPDATE_USERID} from "../constants/action-types"

export const selectActiveChat = selected => ({type: SELECT_ACTIVE, payload:selected})
export const updateActiveChat = chat => ({type: UPDATE_CHAT, payload:chat})

export const updateUserID = userid => ({type: UPDATE_USERID, payload:userid})