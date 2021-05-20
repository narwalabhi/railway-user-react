import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    iconButton : {
        padding: theme.spacing(0)
    }
  }));

const UserInfo = ({ user }) => {

    const classes = useStyles();

  return (
    <div className="ui card" style={{height:"100%"}}>
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
            {/* <EditIcon/> */}
       
            <IconButton className={classes.iconButton} aria-label="upload picture" component="span">
          <EditIcon />
        </IconButton>
        </div>
            {`${user.firstName} ${user.lastName}`}</div>
        <div className="ui divider"></div>
        <div className="paragraph ui two column grid">
          <div className="eight wide column">Gender:</div>
          <div className="eight wide column" style={{textTransform: 'capitalize'}}>{user.gender}</div>
          <div className="eight wide column">Mobile:</div>
          <div className="eight wide column">{user.mobileNumber}</div>
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
