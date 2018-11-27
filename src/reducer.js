export const CREATE_NEW_BEEP = "NEW_BEEP";
export const SAVE_QUESTION = "SAVE_QUESTION";
export const SAVE_BEEP = "SAVE_BEEP";

import moment from "moment";

// when we emit the actions, one of the things here happen. this is made based on the case line (which defines which action happen - and they return a new state)
export default function reducer(state = { currenttime: [] }, action) {
  switch (action.type) {
    case CREATE_NEW_BEEP:
          return {...state, currenttime: moment().utcOffset('+02').format('YYYY-MM-DD-HH-mm-ss')};
    case SAVE_QUESTION:
          return {...state, currenttime: [id, answer, time]};
    default:
      return state;
  }
}

export function createNewBeep(time) {
    return {
        type: CREATE_NEW_BEEP,
    };
}

export function saveAnswer(id, answer, time)  {
    return {
        type: SAVE_QUESTION,
        id,
        answer,
        time,
    };
}


