import React from 'react';
import FetchDoctorDetails from "../Components/FetchDoctorDetails";

function DoctorDetails(props) {



    return (
        <div>
          {/*<h1>Appointments</h1>*/}
          <p></p>
            <FetchDoctorDetails token={props.token}/>

        </div>
    );
}

export default DoctorDetails;