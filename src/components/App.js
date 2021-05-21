import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {withRouter} from 'react-router-dom';
import Profile from "../Profile";
import BookingStepper from "./BookingStepper";
import EditProfile from "./EditProfile";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import PNREnquiry from "./PNREnquiry";
import SearchResult from "./SearchResult";
import Ticket from "./Ticket";

const theme = createMuiTheme();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <div style={{height:'100%', width:'100%'}}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/edit-profile" component={EditProfile}></Route>
            <Route exact path="/search-result" component={SearchResult}></Route>
            <Route exact path="/booking" component={BookingStepper}></Route>
            <Route exact path="/pnr" component={PNREnquiry}></Route>
            <Route exact path="/booked-ticket" component={Ticket}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default withRouter(App);
