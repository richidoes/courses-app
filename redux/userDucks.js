// ---------- constants ------------
const initialState = {
  name: "Stranger",
  avatar:
    "https://share.getcloudapp.com/bLu0r6GN/download/avatar-default.jpg?k=7987709d&utm_source=viewer_new",
};

// --------- types --------------------
const UPDATE_NAME = "UPDATE_NAME";
const UPDATE_AVATAR = "UPDATE_AVATAR";

//---------- reducer -------------------
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME:
      return { ...state, name: action.payload };
    case UPDATE_AVATAR:
      return { ...state, avatar: action.payload };
    default:
      return state;
  }
}

//---------- actions ----------------
export const updateName = (name) => (dispatch) => {
  dispatch({
    type: "UPDATE_NAME",
    payload: name,
  });
};

export const updateAvatar = (avatar) => (dispatch) => {
  dispatch({
    type: "UPDATE_AVATAR",
    payload: avatar,
  });
};
