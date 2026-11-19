import React from 'react';
import CreateNewPatient from "../Components/CreateNewPatient";

function CreatePatient(props) {



    return (
        <div>
          <p></p>
            <CreateNewPatient token={props.token}/>

        </div>
    );
}

export default CreatePatient;