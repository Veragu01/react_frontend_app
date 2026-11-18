import React from 'react';
import FetchTimeslots from "../Components/FetchTimeslots";

function GetTimeslots(props) {



    return (
        <div>
          {/*<h1>Appointments</h1>*/}
          <p></p>
            <FetchTimeslots token={props.token} user_type={props.user_type}/>

        </div>
    );
}

export default GetTimeslots;