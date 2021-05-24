import { Button, Step, StepLabel, Stepper } from "@material-ui/core";
import React, { useState } from "react";
import PassengerList from "./PassengerList";
import BookView from "./BookView";
import { useDispatch, useSelector } from "react-redux";
import { getElementError } from "@testing-library/dom";
import auth from "../apis/auth";
import { bookTicket } from "../actions";
import { Redirect } from "react-router";

const BookingStepper = ({ history }) => {
  const login = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const tripSchedule = JSON.parse(localStorage.getItem("tripSchedule"));
  const train = JSON.parse(localStorage.getItem("train"));
  const fromStation = JSON.parse(localStorage.getItem("from"));
  const toStation = JSON.parse(localStorage.getItem("to"));
  const mobile = useSelector((state) => {
    console.log(state);
    return state.mobile;
  });
  const email = useSelector((state) => state.email);
  const selectedClass = localStorage.getItem("selectedClass");

  const [activeStep, setActiveStep] = useState(0);
  const [passengers, setPassengers] = useState([
    {
      id: 0,
      name: "",
      age: "",
      gender: "",
    },
  ]);

  if (
    !(login &&
    selectedClass &&
    tripSchedule &&
    fromStation &&
    toStation &&
    train)
  ) {
    console.log("if")
    return <Redirect to="/" />;
  }

  const getEmail = () => (email ? email : login.user.email);

  const getMobile = () => (mobile ? mobile : login.user.mobileNumber);

  const book = () => {
    const bookRequestBody = {
      tripId: tripSchedule.tripId,
      tripDate: tripSchedule.tripDate,
      trainId: train.id,
      seats: {
        [selectedClass]: passengers.length,
      },
      email: getEmail(),
      passengers,
      mobile: getMobile(),
      userId: login.user.id
    };
    // const ticket = auth
    //   .post("/booking/book", bookRequestBody, {
    //     mode: "no-cors",
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Content-Type": "application/json",
    //       authorization: `Bearer ${login.jwt}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(JSON.stringify(res.data) + " res");
    //   });
    // console.log(JSON.stringify(bookRequestBody));
    // console.log(JSON.stringify(ticket.data));
    dispatch(bookTicket(bookRequestBody, login.jwt));
    history.push("/booked-ticket");
  };

  const handleNextClick = () => {
    if (activeStep >= 2) {
      book();
    }
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevClick = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const addNewRow = (passenger) => {
    if (passengers.length < 6)
      setPassengers([
        ...passengers,
        {
          index: Math.random(),
          name: passenger.name,
          age: passenger.age,
          gender: passenger.gender,
        },
      ]);
    console.log(passenger);
    console.log(passengers);
  };

  const clickOnDelete = (record) => {
    console.log(passengers);
    setPassengers(passengers.filter((r) => r.id !== record.id));

    console.log(passengers);
  };

  const renderSwitch = () => {
    switch (activeStep) {
      case 0:
        console.log(train, tripSchedule);
        return (
          <BookView
            selectedClass={selectedClass}
            train={train}
            tripSchedule={tripSchedule}
            fromStation={fromStation}
            toStation={toStation}
          />
        );
      case 1:
        return (
          <div style={{ width: "80%" }}>
            <PassengerList
              add={addNewRow}
              delete={clickOnDelete.bind(this)}
              bookDetails={passengers}
              setBookDetails={setPassengers}
            />
          </div>
        );
      case 2:
        return <div style={{ marginLeft: "2%" }}>Payment</div>;
      default:
        return "foo";
    }
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Confirm details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Add Passengers</StepLabel>
        </Step>
        <Step>
          <StepLabel>Book</StepLabel>
        </Step>
      </Stepper>
      {renderSwitch()}
      <Button
        style={{ marginLeft: "2%" }}
        variant="outlined"
        color="primary"
        onClick={handlePrevClick}
      >
        Back
      </Button>
      <Button variant="outlined" color="primary" onClick={handleNextClick}>
        {activeStep === 2 ? "Book" : "Next"}
      </Button>
    </div>
  );
};

export default BookingStepper;
