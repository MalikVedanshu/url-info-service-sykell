
import React, {useEffect} from "react";
import API from "../../utils/request.ts";

const Dashboard : React.FC = () => {

    let token = localStorage.getItem("z-token");


    async function validateLogin (){
        try {
            let validateTokenResponse = await API.get("/auth/user/42e969c9-ac48-45b3-bae5-e8315fed4f9c", {
                headers: {"z-token":token || ''}

            });

            console.log("validateTokenResponse", validateTokenResponse);

        }
        catch(err: any) {
            console.log("Not logged in, redirect to login");
        }
    }

    useEffect (() => {

        validateLogin();

    }, []);

    


    // http://192.168.178.89:5050/auth/user/42e969c9-ac48-45b3-bae5-e8315fed4f9c

    return (
        <>

        </>
    )
}


export default Dashboard;