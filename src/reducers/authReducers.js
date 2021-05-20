const user = localStorage.getItem("user");

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log(state);
      return { ...state, isLoggedIn: true, user: action.payload };
    default:
      return state;
  }
};
