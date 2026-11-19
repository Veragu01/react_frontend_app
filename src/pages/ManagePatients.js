import React from 'react';
import FetchPatients from "../Components/FetchPatients";

function GetPatients(props) {



    return (
        <div>
          {/*<h1>Appointments</h1>*/}
          <p></p>
            <FetchPatients token={props.token}/>

        </div>
    );
}

export default GetPatients;