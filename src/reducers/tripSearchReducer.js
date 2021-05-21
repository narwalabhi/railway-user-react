export const tripSearch = (state=[], action) => {
  switch (action.type) {
    case "TRIP_SEARCH":
      return action.payload;
    default:
      return state;
  }
};
