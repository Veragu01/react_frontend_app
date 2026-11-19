import React from 'react';
import FetchPatientDetails from "../Components/FetchPatientDetails";

function PatientDetails(props) {



    return (
        <div>
          {/*<h1>Appointments</h1>*/}
          <p></p>
            <FetchPatientDetails token={props.token}/>

        </div>
    );
}

export default PatientDetails;