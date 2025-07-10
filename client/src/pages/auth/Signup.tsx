import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { isValidName, isValidEmail, isStrongPassword, isPasswordMatch } from '../../utils/FormValidation.ts';
import texts from '../../locales/en.json';
import { Eye, CloseEye } from '../../files/icons/index.tsx';
import API from '../../utils/request.ts';
import { useToast } from '../../components/CustomToaster.tsx';
import { handleApiError } from '../../utils/errorHandler.ts';


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

interface SignupProp {
    setActiveAuthComponent: React.Dispatch<React.SetStateAction<string>>
}


const Signup: React.FC<SignupProp> = ({setActiveAuthComponent}) => {

    // const navigate = useNavigate();

    const toast = useToast();

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            // console.log("Submit handler worked");

            let validName = isValidName(signupDt.name);
            let validEmail = isValidEmail(signupDt.email);
            let strongPassword = isStrongPassword(signupDt.password);
            let passwordMatch = isPasswordMatch(signupDt.password, signupDt.confirmPassword);

            setSignupErr({
                name: !validName,
                email: !validEmail,
                password: !strongPassword,
                confirmPassword: !passwordMatch
            })

            if (!(validName && validEmail && strongPassword && passwordMatch)) {
                
                !validName && toast({ message: signupTXT.errors.name, isError: true });

                 !validEmail && toast({ message: signupTXT.errors.email, isError: true });

                !strongPassword && toast({ message: signupTXT.errors.password, isError: true });
                !passwordMatch && toast({ message: signupTXT.errors.confirmPassword, isError: true });

            } else {
                // hit api

                let signupRequest = await API.post("/auth/signup", signupDt);
                // console.log("signupRequest", signupRequest);

                

                let signupResponse = signupRequest?.data?.message || "";
                toast({message: signupResponse, isError: false });
                setActiveAuthComponent("login");

            }
        }
        catch (err: any) {
            let responseErr = err?.response?.data?.error || handleApiError(err);
            // console.log(responseErr);
            toast({message: responseErr, isError: true })
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
                        className={signupErr.name ? "input-error" : ""}
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
                        className={signupErr.email ? "input-error" : ""}
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
                            className={signupErr.password ? "input-error" : ""}
                            type={shouldShowPass ? "text" : "password"}
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
                            type='button'
                            className='icon-img'
                            onClick={() => setShouldShowPass(!shouldShowPass)}
                        >
                            { shouldShowPass ? <Eye /> : <CloseEye /> }
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor='confirmPassword'>
                        {signupTXT.fields.confirmPassword}
                    </label>
                    <div className='password'>
                        <input
                            className={signupErr.confirmPassword ? "input-error" : ""}
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
                            type='button'
                            className="icon-img"
                            onClick={() => setShouldShowConfirmPass(!shouldShowConfirmPass)}
                        >
                            {shouldShowConfirmPass ? <Eye /> : <CloseEye /> }
                        </button>
                    </div>
                </div>
                <button
                    type='submit'
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Signup;

