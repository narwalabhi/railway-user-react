export const trainReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_TRAIN":
      return action.payload;
    default:
      return state;
  }
};
