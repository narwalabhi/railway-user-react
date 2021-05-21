export const contactsEmail = (state="", action) => {
  switch (action.type) {
    case "CONTACT_INFO_EMAIL":
      return action.payload;
    default:
      return state;
  }
};
export const contactsMobile = (state="", action) => {
  switch (action.type) {
    case "CONTACT_INFO_MOBILE":
        return action.payload;
    default:
      return state;
  }
};
