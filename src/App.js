import logo from './logo.svg';
import './App.css';
import FetchDoctors from "./Components/FetchDoctors";
// import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Login from "./pages/Login"
import {useState} from "react";
import Appointments from "./pages/Appointments";
import FetchAppointmentDetail from "./pages/AppointmentDetail";
import FetchUpdateAppointment from "./Components/FetchUpdateAppointment";
import UpdateAppointment from "./pages/UpdateAppointment";
import AppointmentDetail from "./pages/AppointmentDetail";
import DoctorTimeslots from "./pages/DoctorTimeslots";
import TimeslotDetails from "./pages/TimeslotDetails";
import UpdateTimeslot from "./pages/UpdateTimeslot";
import CreateTimeslot from "./pages/CreateTimeslot";




function App() {

    const [Token, setToken] = useState(() => localStorage.getItem("token"));
    const [user_type, setuser_type] = useState(() => localStorage.getItem("user_type"));

    function login(newToken, user_type, first_name, last_name) {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user_type", user_type)
        localStorage.setItem("full_name", (first_name + " " + last_name))
        setToken(newToken)
        setuser_type(user_type)
        // console.log("App has token:", Boolean(Token));
    }
    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user_type")
        setToken(null)
        setuser_type(null)
    }
    console.log("App token exists:", Boolean(Token));
    // console.log("Detail token exists:", Boolean(token));


  return (
    <div className="App">
<BrowserRouter>

            <nav>
                <Navbar expand="lg" className="bg-body-tertiary">
                  <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                          {/*<Nav.Link href="/">Home</Nav.Link>*/}
                          <Nav.Link href="/appointments">Appointments</Nav.Link>
                          {/*<Nav.Link href="/conditions">Conditions</Nav.Link>*/}
                          {/*<Nav.Link href="/forms">Forms</Nav.Link>*/}
                          {/*<Nav.Link href="/fetchdata">Fetch Data</Nav.Link>*/}
                          {/*<Nav.Link href="/reducerdemo">Reducer Demo</Nav.Link>*/}
                          {/*<Nav.Link href="/fetchdatareducer">Fetch Data Reducer</Nav.Link>*/}
                          {Token && user_type === "doctor" && (<Nav.Link href="/timeslots">Timeslots</Nav.Link>)}
                          {Token && user_type === "administrator" && (<Nav.Link href="/timeslots">Timeslots</Nav.Link>)}
                          <Nav.Link href="/login"> {Token ? "Logout" : "Login"} </Nav.Link>
                          {/*<Nav.Link href="/simpleblogposts">Simple Blog Posts</Nav.Link>*/}
                        {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                        {/*  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                        {/*  <NavDropdown.Item href="#action/3.2">*/}
                        {/*    Another action*/}
                        {/*  </NavDropdown.Item>*/}
                        {/*  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                        {/*  <NavDropdown.Divider />*/}
                        {/*  <NavDropdown.Item href="#action/3.4">*/}
                        {/*    Separated link*/}
                        {/*  </NavDropdown.Item>*/}
                        {/*</NavDropdown>*/}
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
            </nav>
            <div className="container mt-4 text-start">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/appointments" element={<Appointments token={Token}/>}/>
                    <Route path="/appointments/:id" element={<AppointmentDetail token={Token} />}/>
                    <Route path="/appointments/:id/update" element={<UpdateAppointment token={Token} />}/>
                    <Route path="/timeslots" element={<DoctorTimeslots token={Token}/>}/>
                    <Route path="/timeslots/:id" element={<TimeslotDetails token={Token} />}/>
                    <Route path="/timeslots/:id/update" element={<UpdateTimeslot token={Token} />}/>
                    <Route path="/timeslots/create" element={<CreateTimeslot token={Token} />}/>
                    {/*<Route path="/forms" element={<Forms/>}/>*/}
                    {/*<Route path="/fetchdata" element={<FetchData/>}/>*/}
                    {/*<Route path="/reducerdemo" element={<ReducerDemo/>}/>*/}
                    {/*<Route path="/fetchdatareducer" element={<FetchDataReducer/>}/>*/}
                    <Route path="/login" element={ <Login onLogin={login} onLogout={logout} token={Token}/>}/>
                    {/*<Route path="/simpleblogposts" element={<SimpleBlogPosts/>}/>*/}
                </Routes>
            </div>
        </BrowserRouter>
      {/*  <Navbar />*/}
      {/*<h1>Clinic Appointment System</h1>*/}
      {/*<p>App is running</p>*/}
      {/*  <FetchDoctors />*/}
    </div>
  );
}

export default App;
