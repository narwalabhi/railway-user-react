import React, { useState } from "react";
import { Redirect } from "react-router";
import BookingHistory from "./components/BookingHistory";
import UserInfo from "./components/UserInfo";

const Profile = (props) => {
  const user = JSON.parse(localStorage.getItem("user")).user;

  const handleEditClick = () => {
    props.history.push("/edit-profile")
  };

  if(!(user)){
    return <Redirect to="/login" />
  }

  return (
    <div className="ui padded grid" >
      <div className="row">
        <div className="four wide column">
          <UserInfo user={user} handleEditClick={handleEditClick}/>
        </div>
        <div className="twelve wide column">
          <BookingHistory/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
