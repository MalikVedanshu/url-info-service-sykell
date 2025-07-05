import React, { useState } from 'react';
import { isValidName, isValidEmail, isStrongPassword, isPasswordMatch } from '../../utils/FormValidation.ts';
import texts from '../../locales/en.json';
import { Eye } from '../../files/icons/index.ts';

const { signupTXT } = texts;

interface SignupData {
    name: string,
    email: string,
    password: string,
    confirmPassword: ""
}

interface SignupErrors {
    name: boolean,
    email: boolean,
    password: boolean,
    confirmPassword: boolean
}

const Signup: React.FC = () => {

    const [signupDt, setSignupDt] = useState<SignupData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [signupErr, setSignupErr] = useState<SignupErrors>({

        name: false,
        email: false,
        password: false,
        confirmPassword: false
    });

    const [shouldShowPass, setShouldShowPass] = useState<boolean>(false);
    const [shouldShowConfirmPass, setShouldShowConfirmPass] = useState<boolean>(false);

    const handleSignupFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let fieldNm = e.target.name;
        let fieldVal = e.target.value;

        setSignupDt(prevData => ({ ...prevData, [fieldNm]: fieldVal }));

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        let validName = isValidName(signupDt.name);
        let validEmail = isValidEmail(signupDt.email);
        let strongPassword = isStrongPassword(signupDt.password);
        let passwordMatch = isPasswordMatch(signupDt.password, signupDt.confirmPassword);

        setSignupErr({
            name: validName,
            email: validEmail,
            password: strongPassword,
            confirmPassword: passwordMatch
        })

        if (!(validName && validEmail && strongPassword && passwordMatch)) {
            // error
        } else {
            // hit api
        }

    }

    const { name, email, password, confirmPassword } = signupDt;



    return (
        <div className='signup-section'>
            <h1>Sign-up</h1>
            <form onSubmit={handleSubmit}>


                <div>
                    <label htmlFor="name">
                        {signupTXT.fields.name}
                    </label>

                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        placeholder={
                            signupErr.name ? signupTXT.errors.name : signupTXT.placeholders.name
                        }
                        onChange={handleSignupFieldChange}
                        required
                    />

                </div>

                <div>
                    <label htmlFor="email">
                        {signupTXT.fields.email}
                    </label>

                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        placeholder={
                            signupErr.email ? signupTXT.errors.email : signupTXT.placeholders.email
                        }
                        onChange={handleSignupFieldChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor='password'>
                        {signupTXT.fields.password}
                    </label>
                    <div className='password'>
                        <input
                            type={shouldShowPass ? "text" : "password" }
                            name="password"
                            id="password"
                            value={password}
                            placeholder={
                                signupErr.password ? signupTXT.errors.password : signupTXT.placeholders.password
                            }
                            onChange={handleSignupFieldChange}
                            required
                        />
                        <button 
                            className='transparent-button icon-img'
                            onClick={() => setShouldShowPass(true)}
                        >
                            <img src={Eye} alt='view hidden password' />
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor='confirmPassword'>
                        {signupTXT.fields.confirmPassword}
                    </label>
                    <div className='password'>
                        <input
                            type={shouldShowConfirmPass ? 'text' : 'password'}
                            name='confirmPassword'
                            id='confirmPassword'
                            value={confirmPassword}
                            placeholder={
                                signupErr.confirmPassword ? signupTXT.errors.confirmPassword : signupTXT.placeholders.confirmPassword
                            }
                            onChange={handleSignupFieldChange}
                            required
                        />
                        <button 
                            className="transparent-button icon-img" 
                            onClick={() => setShouldShowConfirmPass(true)}
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

export default Signup;

