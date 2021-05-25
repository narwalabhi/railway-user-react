export const userTicketsReducer = (state =[], action) => {
  switch (action.type) {
    case "USER_TICKETS":
      return action.payload;
    default:
      return state;
  }
};
