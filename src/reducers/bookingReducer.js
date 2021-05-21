const initTicket = {
  cancellable: false,
  email: "",
  fromStationCode: "",
  journeyDate: "",
  mobile: "",
  passengers: [],
  pnr: "",
  seats: {},
  status: "",
  ticketId: "",
  toStationCode: "",
  tripScheduleId: "",
};

export const bookingReducer = (state = initTicket, action) => {
  switch (action.type) {
    case "BOOK_NOW":
      return action.payload;
    default:
      return state;
  }
};
