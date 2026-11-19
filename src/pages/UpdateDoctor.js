import React from 'react';
import UpdateDoctorDetails from "../Components/UpdateDoctorDetails";

function UpdateDoctor(props) {



    return (
        <div>
          <p></p>
            <UpdateDoctorDetails token={props.token}/>

        </div>
    );
}

export default UpdateDoctor;