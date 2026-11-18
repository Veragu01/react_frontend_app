import React from 'react';
import UpdateTimeslotDetails from "../Components/UpdateTimeslotDetails";

function UpdateTimeslot(props) {



    return (
        <div>
          {/*<h1>Appointments</h1>*/}
          <p></p>
            <UpdateTimeslotDetails token={props.token}/>

        </div>
    );
}

export default UpdateTimeslot;