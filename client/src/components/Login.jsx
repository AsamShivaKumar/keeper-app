import React from 'react';
import Axios from 'axios';
import App from './App.jsx';

function Login(){   

    const [ login, setLogin ] = React.useState(true);
    const [ notes, setNotes ] = React.useState([]);
    const [ user, setUser ] = React.useState("");
    const [ msg, setMsg ] = React.useState("");

    function userLogin(e){
            e.preventDefault();
            const obj = {
                userName: e.target.user.value.trim(),
                password: e.target.pass.value.trim(),
            };

            Axios.post("/", obj)
            .then(response => {
                if(response.data.done === true){                    
                    setNotes( (prev) => {
                        const arr = [];
                        for(var i = response.data.notes.length-1; i >= 0; i--) arr.push(response.data.notes[i]);
                        setUser(response.data.user);
                        setLogin(false);
                        return [...prev,...arr]; 
                    });
                }else{
                    setMsg("Incorrect password or user-name is already taken");
                    setInterval(() =>{
                        setMsg("");
                    }, 2000);
                }
            }).catch( err => {
                console.log(err)
            });
    }
    
    if(login){
        return (

            <div className="loginDiv">
                <div>
                    <h1>Keeper</h1>
                    <h2>Enter username and password</h2>
                </div>
                <form onSubmit = { userLogin } >
                <span>{ msg } </span>
                    <input type="text" placeholder="Username..." name="user"></input>
                    <input type="password" placeholder="Password..." name="pass"></input>
                    <button type="submit">Start</button>
                </form>
            </div>
        );
    }else{
        return (
           <App notes={ notes } user={ user }/>
        );
    }

    
}

export default Login;