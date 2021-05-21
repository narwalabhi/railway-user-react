import React from "react";
import ContactInfo from "./ContactInfo";
import BookingInfo from './BookingInfo'

class BookView extends React.Component {
  state = {
    bookDetails: [
      {
        index: Math.random(),
        name: "",
        age: "",
        gender: ""
      }
    ]
  };

  constructor(props){
    super(props)
    this.tripSchedule = this.props.tripSchedule;
    this.train = this.props.train;
    this.fromStation = this.props.fromStation;
    this.toStation = this.props.toStation;
    this.selectedClass = this.props.selectedClass;
  }

  handleChange = e => {
    if (
      ["name", "age", "gender",].includes(
        e.target.name
      )
    ) {
      let bookDetails = [...this.state.bookDetails];
      bookDetails[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  addNewRow = e => {
    this.setState(prevState => ({
      bookDetails: [
        ...prevState.bookDetails,
        {
          index: Math.random(),
          name: "",
          age: "",
          gender: ""
        }
      ]
    }));
  };

  deteteRow = index => {
    this.setState({
      bookDetails: this.state.bookDetails.filter(
        (s, sindex) => index !== sindex
      )
    });
  };

  clickOnDelete(record) {
    this.setState({
      bookDetails: this.state.bookDetails.filter(r => r !== record)
    });
  }
  render() {
    let { bookDetails } = this.state;
    return (
    <div >
      <BookingInfo selectedClass={this.selectedClass} train={this.train} tripSchedule={this.tripSchedule} fromStation={this.fromStation} toStation={this.toStation}/>
      <ContactInfo />
    </div>
    );
  }
}
export default BookView;
