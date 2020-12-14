// ---------- constants ------------
const initialState = {
  action: "",
};

// --------- types --------------------
const CLOSE_MENU = "CLOSE_MENU";
const OPEN_MENU = "OPEN_MENU";
const OPEN_CARD = "OPEN_CARD";
const CLOSE_CARD = "CLOSE_CARD";
const OPEN_LOGIN = "OPEN_LOGIN";
const CLOSE_LOGIN = "CLOSE_LOGIN";
const OPEN_NOTIF = "OPEN_NOTIF";
const CLOSE_NOTIF = "CLOSE_NOTIF";

//---------- reducer -------------------
export default function togglesReducer(state = initialState, action) {
  switch (action.type) {
    case CLOSE_MENU:
      return { ...state, action: action.payload };
    case OPEN_MENU:
      return { ...state, action: action.payload };
    case OPEN_CARD:
      return { ...state, action: action.payload };
    case CLOSE_CARD:
      return { ...state, action: action.payload };
    case OPEN_LOGIN:
      return { ...state, action: action.payload };
    case CLOSE_LOGIN:
      return { ...state, action: action.payload };
    case OPEN_NOTIF:
      return { ...state, action: action.payload };
    case CLOSE_NOTIF:
      return { ...state, action: action.payload };
    default:
      return state;
  }
}

//---------- actions ----------------
export const openMenu = () => (dispatch) => {
  dispatch({
    type: "OPEN_MENU",
    payload: "openMenu",
  });
};

export const closeMenu = () => (dispatch) => {
  dispatch({
    type: "CLOSE_MENU",
    payload: "closeMenu",
  });
};

export const openCardToggle = () => (dispatch) => {
  dispatch({
    type: "OPEN_CARD",
    payload: "openCard",
  });
};

export const closeCardToggle = () => (dispatch) => {
  dispatch({
    type: "CLOSE_CARD",
    payload: "closeCard",
  });
};

export const openLogin = () => (dispatch) => {
  dispatch({
    type: "OPEN_LOGIN",
    payload: "openLogin",
  });
};

export const closeLogin = () => (dispatch) => {
  dispatch({
    type: "CLOSE_LOGIN",
    payload: "closeLogin",
  });
};

export const openNotif = () => (dispatch) => {
  dispatch({
    type: "OPEN_NOTIF",
    payload: "openNotif",
  });
};

export const closeNotif = () => (dispatch) => {
  dispatch({
    type: "CLOSE_NOTIF",
    payload: "closeNotif",
  });
};
