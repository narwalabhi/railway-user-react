export const stationsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_STATION":
      return [...state, action.payload];
    default:
      return state;
  }
};
