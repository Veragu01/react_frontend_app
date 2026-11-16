import logo from './logo.svg';
import './App.css';
import FetchDoctors from "./Components/FetchDoctors";

function App() {
  return (
    <main>
      <h1>Clinic Appointment System</h1>
      <p>App is running</p>
        <FetchDoctors />
    </main>
  );
}

export default App;
