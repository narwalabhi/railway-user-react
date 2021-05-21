import React, { useState } from "react";

const PassengerList = (props) => {
  const { bookDetails, setBookDetails } = props;
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...bookDetails];
    list[i][name] = value;
    setBookDetails(list);
    console.log(JSON.stringify(bookDetails) + "change");
  };

  const handleAdd = () => {
    setBookDetails([
      ...bookDetails,
      { id: bookDetails.length, name: "", age: 0, gender: "" },
    ]);
  };

  const renderedPassengers = bookDetails.map((val, idx) => {
    return (
      <div className="ui grid form" key={idx} style={{marginLeft:'2%'}}>
        <div className="row">
          <div className="field four wide column">
            <label>PassengerName</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(event) => handleChange(event, idx)}
              id={name}
            />
          </div>
          <div className="field four wide column">
            <label>Age</label>
            <input
              type="number"
              placeholder="Age"
              name="age"
              id={age}
              value={val.age}
              onChange={(event) => handleChange(event, idx)}
            />
          </div>
          <div className="field four wide column">
            <label>Gender</label>
            <select
              className="form-control"
              name="gender"
              id={gender}
              value={val.gender}
              onChange={(event) => handleChange(event, idx)}
              required
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="field four wide column" style={{paddingTop:'2.2%'}}>
            {idx === 0 ? (
              <button onClick={handleAdd} className="ui blue button">
                Add Passenger
              </button>
            ) : (
              <button
                className="ui red button" onClick={() => props.delete(val)}>
                Delete Passenger
              </button>
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="ui container" style={{marginBottom:'2%'}}>
      {renderedPassengers}
    </div>
  )
};
export default PassengerList;
