import React from 'react';
// import Helloworld2 from "../components/Helloworld2";
// import Forms from "../components/Forms";
// import Conditions from "../components/Conditions";
// import Loops from "../components/Loops";
// import FetchData from "../components/FetchData";
import FetchDoctors from "../Components/FetchDoctors";

function Home(props) {
    const name = localStorage.getItem("full_name")



    return (
        <div>
          <h1>Clinic Appointment System</h1>
          <p>Welcome {name}</p>
            {/*<FetchDoctors />*/}

        </div>
    );
}

export default Home;