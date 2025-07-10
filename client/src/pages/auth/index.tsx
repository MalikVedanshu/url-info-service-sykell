
import React, {useState, createContext} from "react";

import Login from "./Login.tsx";
import Signup from "./Signup.tsx";
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
                activeAuthComponent === "signup" ? <Signup setActiveAuthComponent={setActiveAuthComponent} /> : <></>
            }


            <p>
                <span>{auth_txt[`redirect_${activeAuthComponent}`][0]}</span>
                <button 
                    onClick={handleRedirectClick}
                    type='button'
                >
                    click here
                </button>
                <span>{auth_txt[`redirect_${activeAuthComponent}`][1]}</span>
            </p>  
        </div>
    )
}


export default UserAuth;

