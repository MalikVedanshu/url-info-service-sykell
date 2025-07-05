import React, { useState } from 'react';
import { isValidEmail } from '../../utils/FormValidation.ts';
import texts from "../../locales/en.json";
import { Eye } from '../../files/icons/index.ts';

const { loginTXT } = texts;

interface LoginData {
    email: string,
    password: string
}

interface LoginErrors {

    email: boolean,
    password: boolean
}

const Login: React.FC = () => {

    const [loginDt, setLoginDt] = useState<LoginData>({

        email: "",
        password: ""
    });

    const [loginErr, setLoginErr] = useState<LoginErrors>({

        email: false,
        password: false
    });

    const [shouldShowPasswd, setShouldShowPasswd] = useState<boolean>(false);

    const handleLoginFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let fieldNm = e.target.name;
        let fieldVal = e.target.value;

        setLoginDt(prevData => ({ ...prevData, [fieldNm]: fieldVal }));

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        let validEmail = isValidEmail(loginDt.email);
        let validPassword = loginDt.password.length > 1;

        setLoginErr({

            email: validEmail,
            password: validPassword
        })

        if (!(validEmail && validPassword)) {
            // error
        } else {
            // hit login api
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
                            type={shouldShowPasswd ? "text": "password" }
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

