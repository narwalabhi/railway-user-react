import React from "react";
import SearchForm from "./SearchForm";

const Home = (props) => {

  return (
    <div style={{ backgroundImage: "url(/bg.jpg)",backgroundRepeat: 'no-repeat', width:'100%', backgroundSize:'cover', height:'100%'}}>
        <div className="ui segment left floated content" style={{marginTop:'10%',marginLeft:'6%',width:'40%'}}>
        <h4 className="ui dividing header">Search Trains</h4>
          <SearchForm history={props.history}/>
        </div>
    </div>
  );
};

export default Home;
