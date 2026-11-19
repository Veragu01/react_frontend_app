import React from 'react';
import FetchDoctors from "../Components/FetchDoctors";

function GetDoctors(props) {



    return (
        <div>
          {/*<h1>Appointments</h1>*/}
          <p></p>
            <FetchDoctors token={props.token}/>

        </div>
    );
}

export default GetDoctors;