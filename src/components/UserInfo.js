import React from "react";
import EditIcon from "@material-ui/icons/Edit";
// import { IconButton, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";


// const useStyles = makeStyles((theme) => ({
//   iconButton: {
//     padding: theme.spacing(0),
//   },
// }));''

const UserInfo = ({ user, handleEditClick }) => {
  // const classes = useStyles();

  const getDate = ()=>{
    const date = new Date(user.dob);
    return `${date.getDate()}-${date.getMonth()+1}-${date.getUTCFullYear()}`
  }

  return (
    <div className="ui card" style={{ height: "100%" }}>
      <div className="image">
        <div className="square image">
          <img
            className="ui medium image"
            src={window.location.origin + "/male.png"}
            alt="profile"
          />
        </div>
      </div>
      <div className="content">
        <div className="header">
          <div className="right floated content">
            <Link to="/edit-profile">
              <EditIcon/>
            </Link>
          </div>
          {`${user.firstName} ${user.lastName}`}
        </div>
        <div className="ui divider"></div>
        <div className="paragraph ui two column grid">
          <div className="eight wide column">Gender:</div>
          <div
            className="eight wide column"
            style={{ textTransform: "capitalize" }}
          >
            {user.gender}
          </div>
          <div className="eight wide column">DOB:</div>
          <div className="eight wide column">{getDate()}</div>
          <div className="eight wide column">Email:</div>
          <div className="eight wide column">{user.email}</div>

          <div className="eight wide column">Mobile:</div>
          <div className="eight wide column">{user.mobileNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
