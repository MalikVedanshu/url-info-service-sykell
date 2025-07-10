import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Eye } from '../../files/icons/index.ts';

import { isValidEmail } from '../../utils/FormValidation.ts';
import texts from "../../locales/en.json";
import API from '../../utils/request.ts';
import { useToast } from '../../components/CustomToaster.tsx';
import { handleApiError } from '../../utils/errorHandler.ts';

const { loginTXT } = texts;

interface LoginData {
    email: string,
    password: string
}

interface LoginErrors {

    email: boolean,
    password: boolean
}

// interface ResponseNotification {
//     message: string,
//     isError: boolean
// }


// interface LoginProp {
//     setActiveAuthComponent: React.Dispatch<React.SetStateAction<string>>
// }

const Login: React.FC = () => {

    const toast = useToast();

    const navigate = useNavigate();

    const [loginDt, setLoginDt] = useState<LoginData>({

        email: "",
        password: ""
    });

    const [loginErr, setLoginErr] = useState<LoginErrors>({

        email: false,
        password: false
    });

    // const [responseNotification, setResponseNotification] = useState<ResponseNotification>({
    //     message: "",
    //     isError: false
    // });

    const [shouldShowPasswd, setShouldShowPasswd] = useState<boolean>(false);

    const handleLoginFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let fieldNm = e.target.name;
        let fieldVal = e.target.value;

        setLoginDt(prevData => ({ ...prevData, [fieldNm]: fieldVal }));

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        try {



            e.preventDefault();

            let validEmail = isValidEmail(loginDt.email);
            let validPassword = loginDt.password.length > 1;

            setLoginErr({

                email: !validEmail,
                password: !validPassword
            })

            if (!(validEmail && validPassword)) {
                // error

                toast({message: "Please enter valid email and password", isError: true});

            } else {
                // hit login api
                const response = await API.post(`/auth/login`, loginDt);


                console.log("response", response);
                const token = response?.data?.token;
                console.log(token);

                toast({message: "Login Successfull", isError: false});
                

                localStorage.setItem('z-token', token);

                navigate("/dashboard");


            }
        }
        catch (err: any) {
            // throw err.response?.data?.error || 'Login failed';
            let responseError  = err?.response?.data?.error || "Something went wrong";
            toast({message: responseError, isError: true});
            console.log("err", err);

        }

    }

    const { email, password } = loginDt;



    return (
        <div className='login-section'>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        className={loginErr.email ? "input-error" : ""}
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        placeholder={
                            loginErr.email ? loginTXT.errors.email : loginTXT.placeholders.email
                        }

                        onChange={handleLoginFieldChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor='password'>
                        Password
                    </label>

                    <div className='password'>

                        <input
                            className={loginErr.password ? "input-error" : ""}
                            type={shouldShowPasswd ? "text" : "password"}
                            name="password"
                            id="password"
                            value={password}
                            placeholder={
                                loginErr.password ? loginTXT.errors.password : loginTXT.placeholders.password
                            }
                            onChange={handleLoginFieldChange}
                            required
                        />
                        <button
                            type='button'
                            className='transparent-button icon-img'
                            onClick={() => setShouldShowPasswd(!shouldShowPasswd)}
                        >
                            <img src={Eye} alt='view hidden password' />
                        </button>
                    </div>
                </div>

                <button type='submit'>
                    Submit
                </button>

            </form>

            
        </div>
    )
}

export default Login;

