import React from 'react';
import FetchAppointmentDetail from "../Components/FetchAppointmentDetail";

function AppointmentDetail(props) {



    return (
        <div>
          {/*<h1>Appointments</h1>*/}
          <p></p>
            <FetchAppointmentDetail token={props.token}/>

        </div>
    );
}

export default AppointmentDetail;