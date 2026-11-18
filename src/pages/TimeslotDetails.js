import React from 'react';
import FetchTimeslotDetail from "../Components/FetchTimeslotDetails";

function TimeslotDetail(props) {



    return (
        <div>
          {/*<h1>Appointments</h1>*/}
          <p></p>
            <FetchTimeslotDetail token={props.token}/>

        </div>
    );
}

export default TimeslotDetail;