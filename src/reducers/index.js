import { combineReducers } from "redux";
import { loginReducer } from "./authReducers";
import { bookingReducer } from "./bookingReducer";
import { contactsEmail, contactsMobile } from "./contactInfoReducer";
import { stationsReducer } from "./stationsReducer";
import { trainReducer } from "./trainsReducer";
import { tripSearch } from "./tripSearchReducer";

export default combineReducers({
  login: loginReducer,
  trips: tripSearch,
  email: contactsEmail,
  mobile: contactsMobile,
  ticket: bookingReducer,
  train: trainReducer,
  stations: stationsReducer,
});
