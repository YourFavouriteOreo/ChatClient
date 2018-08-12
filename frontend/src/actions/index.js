import {SELECT_ACTIVE, UPDATE_CHAT} from "../constants/action-types"

export const selectActiveChat = selected => ({type: SELECT_ACTIVE, payload:selected})
export const updateActiveChat = chat => ({type: UPDATE_CHAT, payload:chat})