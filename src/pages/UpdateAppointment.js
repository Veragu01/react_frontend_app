import React from 'react';
import FetchUpdateAppointment from "../Components/FetchUpdateAppointment";

function UpdateAppointment(props) {



    return (
        <div>
          {/*<h1>Appointments</h1>*/}
          <p></p>
            <FetchUpdateAppointment token={props.token}/>

        </div>
    );
}

export default UpdateAppointment;