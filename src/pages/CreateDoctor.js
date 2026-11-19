import React from 'react';
import CreateNewDoctor from "../Components/CreateNewDoctor";

function CreateDoctor(props) {



    return (
        <div>
          <p></p>
            <CreateNewDoctor token={props.token}/>
        </div>
    );
}

export default CreateDoctor;