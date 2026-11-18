import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BASEURL} from "../Constraints";



function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")
    const [user_type, setUser_type] = useState("")
    const [is_login, setIs_login] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user_type = localStorage.getItem("user_type")
        if (token) {
            setToken(token);
            setUser_type(user_type)
            setIs_login(true);
        }
    }, []);

    function usernameHandler(e) {
        setUsername(e.target.value)
    }

    function passwordHandler(e) {
        setPassword(e.target.value)
    }

    async function login() {
        console.log("Login", username, password)

        const options = {
          method: 'POST',
          url: BASEURL + '/api/login/',
          headers: {'Content-Type': 'application/json'},
          data: {username: username, password: password}
        };

        try {
          const { data } = await axios.request(options);
          // console.log(data);
          console.log("Login user_type:", data.user_type);
          setToken(data.token);
          setIs_login(true);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_type", data.user_type);
          localStorage.setItem("full_name", (data.first_name +" "+ data.last_name))
          props.onLogin(data.token, data.user_type, data.first_name, data.last_name);
        } catch (error) {
          console.error(error);
        }

    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user_type");
        localStorage.removeItem("full_name");
        setToken("");
        setIs_login(false);
        props.onLogout();
    }

    return (
        is_login ? (
            <div>
                <h1>Logout</h1>

                <button onClick={logout}>Logout</button>
            </div>
        ) : (
            <div>
                <h1>Login</h1>
                <p>
                    Username: <input type="text" value={username} onChange={usernameHandler}></input>
                </p>
                <p>
                    Password: <input type="password" value={password} onChange={passwordHandler}></input>
                </p>
                <button onClick={login}>Login</button>
            </div>
            )




    );
}

export default Login;