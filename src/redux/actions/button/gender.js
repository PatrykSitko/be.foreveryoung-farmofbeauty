import { GENDER_BUTTON_PRESSED } from "../types";

export default (previousUserState, gender) => {
  return {
    type: GENDER_BUTTON_PRESSED,
    payload: {
      user: { ...previousUserState, gender: gender }
    }
  };
};
