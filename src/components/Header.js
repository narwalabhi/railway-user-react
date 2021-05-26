import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  links: {
    textTransform: "capitalize",
  },
}));
const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    handleClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Railway
          </Typography>
          <Link to="/" style={{ color: "#FFF" }}>
            <Button color="inherit" className={classes.links}>
              <Typography variant="h6">Home</Typography>
            </Button>
          </Link>
          <Link to="/pnr" style={{ color: "#FFF" }}>
            <Button color="inherit" className={classes.links}>
              <Typography variant="h6">PNR Enquiry</Typography>
            </Button>
          </Link>
          <Button color="inherit" className={classes.links}>
            <Typography variant="h6">Help</Typography>
          </Button>
          {isLoggedIn ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to="/profile" style={{ color: "#212121" }}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link to="/" style={{ color: "#212121" }}>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Link>
              </Menu>
            </div>
          ) : (
            <Link to="/login" style={{ color: "#FFF" }}>
              <Button color="inherit" className={classes.links}>
                <Typography variant="h6" >
                  Register/Login
                </Typography>
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
