import axios from "axios";
import auth from "../apis/auth";

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await auth.post(
      "/auth",
      {
        username: email,
        password: password,
      },
      {
        mode: "no-cors",
      }
    );
    console.log("action " + response.data);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data,
    });
  };
};

export const searchTrips = (from, to, date) => {
  return async (dispatch) => {
    const response = await axios.get(
      `http://localhost:8082/train/trip-schedules/get-trip-schedules-by-date-and-stations/${from}/${to}/${date}`
    );
    dispatch({
      type: "TRIP_SEARCH",
      payload: response.data,
    });
  };
};

export const bookTicket = (body, token) => {
  return async (dispatch) => {
    const response = await auth.post("/booking/book", body, {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "BOOK_NOW",
      payload: response.data,
    });
  };
};

export const getTicketByPNR = (pnr, token) => {
  return async (dispatch) => {
    const response = await auth.get(`/booking/get/${pnr}`, {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "BOOK_NOW",
      payload: response.data,
    });
  };
};

export const getStation = (code, token) => {
  return async (dispatch) => {
    const response = await auth.get(`/train/stations/get/${code}`, {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "GET_STATION",
      payload: response.data,
    });
  };
};

export const getTrain = (number, token) => {
  return async (dispatch) => {
    const response = await auth.get(`/train/get/${number}`, {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "GET_TRAIN",
      payload: response.data,
    });
  };
};

export const getTicketsByUser = (userId, token) => {
  return async (dispatch) => {
    const response = await auth.get(`/booking/get-by-user/${userId}`, {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "USER_TICKETS",
      payload: response.data,
    });
  };
};

export const contactInfoEmail = (email) => {
  return {
    type: "CONTACT_INFO_EMAIL",
    payload: email,
  };
};

export const contactInfoMobile = (mobile) => {
  return {
    type: "CONTACT_INFO_MOBILE",
    payload: mobile,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
