import React, { useState } from "react";
import auth from "../apis/auth";

const EditProfile = () => {
  const creds = JSON.parse(localStorage.getItem("user"));
  const user = creds.user;
  const token = creds.jwt;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobileNumber);
  const [gender, setGender] = useState(user.gender);
  const [dob, setDob] = useState(user.dob.substring(0, 10));


  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleMobileChange = (event) => setMobile(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handleDobChange = (event) => {
    setDob(event.target.value);
    console.log(event.target.value);
  };

  const update = async () => {
    const response = await auth.put(
      `/user/update/${user.id}`,
      {
        firstName,
        lastName,
        dob,
        email,
        mobileNumber: mobile,
        gender,
      },
      {
        // mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if(response.status === 200){
      console.log("ok" + response.data)
      localStorage.setItem("user",JSON.stringify({jwt:token, user:response.data}));
    }
  };

  return (
    <div className="ui form container" style={{ marginTop: "2%" }}>
      <h4 className="ui dividing header">User Information</h4>
      <div className="two fields">
        <div className="field">
          <label>First Name</label>
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
      </div>
      <div className="two fields">
        <div className="field">
          <label>Email</label>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="field">
          <label>Mobile</label>
          <input
            placeholder="Mobile"
            type="tel"
            value={mobile}
            onChange={handleMobileChange}
          />
        </div>
      </div>
      <div className="two fields">
        <div className="field">
          <label>Gender</label>
          <select
            className="ui fluid dropdown"
            value={gender}
            onChange={handleGenderChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="field">
          <label>DOB</label>
          <input type="date" value={dob} onChange={handleDobChange} />
        </div>
      </div>
      <div className="field  centered">
        <div className="ui submit button" onClick={update}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
