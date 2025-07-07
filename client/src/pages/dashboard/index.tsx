
import React, {useState, useEffect} from "react";
import API from "../../utils/request.ts";

interface ResponseNotification {
    message: string,
    isError: boolean
}

interface UserDetails {
    name: string,
    email: string
}


const Dashboard : React.FC = () => {

    let token = localStorage.getItem("z-token");

    const [responseNotification, setResponseNotification] = useState<ResponseNotification>({
        message: "",
        isError: false
    });

    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: "",
        email: ""
    })


    async function validateLogin (){
        try {
            let validateTokenResponse = await API.get("/auth/validate", {
                headers: {"z-token":token || ''}

            });

            console.log("validateTokenResponse", validateTokenResponse);

            if(validateTokenResponse?.data) {
                setResponseNotification({message: "Valid user", isError: false});

                setUserDetails({
                    name: validateTokenResponse?.data?.name || "",
                    email: validateTokenResponse?.data?.email || ""
                })
            }
            

        }
        catch(err: any) {
            let responseError  = err?.response?.data?.error || "Something went wrong";
            setResponseNotification({message: responseError, isError: true});
            console.log("err", err);
        }
    }

    useEffect (() => {

        

        validateLogin();

    }, []);

    


    // http://192.168.178.89:5050/auth/user/42e969c9-ac48-45b3-bae5-e8315fed4f9c

    return (
        <>
            {responseNotification?.message?.length ? 
            <div className={responseNotification.isError ? "txt-error" : "txt-success"}>{responseNotification.message}</div> : 
            <div></div>}

            {
                userDetails.name?.length ? <h1>Hello {userDetails.name} - {userDetails.email}</h1> : <div></div>
            }
        </>
    )
}


export default Dashboard;