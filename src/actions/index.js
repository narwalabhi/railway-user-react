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

export const searchTrips = (from, to, date, token) => {
  console.log(token);
  return async (dispatch) => {
    const response = await auth.get(
      `/train/trip-schedules/get-trip-schedules-by-date-and-stations/${from}/${to}/${date}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
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
    })
    dispatch({
      type:"BOOK_NOW",
      payload: response.data
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

