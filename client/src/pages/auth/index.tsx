
import React, {useState} from "react";
import Login from "./login.tsx";
import Signup from "./signup.tsx";

import texts from '../../locales/en.json';

const {auth_txt} = texts;
const UserAuth : React.FC = () => {

    const handleRedirectClick = () => {
        if(activeAuthComponent === "login") {
            setActiveAuthComponent("signup")
        } 
        else if(activeAuthComponent === "signup") {
            setActiveAuthComponent("login");
        }
    }

    const [activeAuthComponent, setActiveAuthComponent] = useState<string>("login"); // login , signup, forgetpass 
    return (
        <div className="auth-section">
            {
                activeAuthComponent === "login" ? <Login /> : <></>
            }

            {
                activeAuthComponent === "signup" ? <Signup /> : <></>
            }


            <p>
                <span>{auth_txt[`redirect_${activeAuthComponent}`][0]}</span>
                <button onClick={handleRedirectClick}>click here</button>
                <span>{auth_txt[`redirect_${activeAuthComponent}`][1]}</span>
            </p>  
        </div>
    )
}


export default UserAuth;

