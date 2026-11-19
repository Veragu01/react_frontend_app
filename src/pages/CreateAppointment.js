import React from 'react';
import CreateNewAppointment from "../Components/CreateNewAppointment";

function CreateAppointment(props) {



    return (
        <div>
          <p></p>
            <CreateNewAppointment token={props.token}/>

        </div>
    );
}

export default CreateAppointment;