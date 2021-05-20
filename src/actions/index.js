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
