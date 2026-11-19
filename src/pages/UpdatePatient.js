import React from 'react';
import UpdatePatientDetails from "../Components/UpdatePatientDetails";

function UpdatePatient(props) {



    return (
        <div>
          <p></p>
            <UpdatePatientDetails token={props.token}/>

        </div>
    );
}

export default UpdatePatient;