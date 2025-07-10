
import React, { createContext, useState, useEffect } from "react";
import API from "../../utils/request.ts";
import ViewUrl from "./View.tsx";
import AddUrlModal from "./Add.tsx";

interface ResponseNotification {
    message: string,
    isError: boolean
}

interface UserDetails {
    name: string,
    email: string
}

export interface AllUrlResponse {
    UserId: string,
    title: string,
    url: string,
    id: string,
    htmlVersion: string,
    h1: number,
    h2: number,
    h3: number,
    h4: number,
    h5: number,
    h6: number,
    internalLinks: number,
    externalLinks: number,
    inAccessibleLinks: number,
    presenseOfLoginForm: boolean,
    analysed: boolean
}


type DataChangeContextType = {
  dataChangeTriggered: boolean;
  setDataChangeTriggered: React.Dispatch<React.SetStateAction<boolean>>;
};


export const AllUrlsContext = createContext<AllUrlResponse[] | null>(null);

export const DataChangeContext = createContext<DataChangeContextType | undefined>(undefined);


const Dashboard: React.FC = () => {

    let token = localStorage.getItem("z-token");

    const [responseNotification, setResponseNotification] = useState<ResponseNotification>({
        message: "",
        isError: false
    });

    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: "",
        email: ""
    })

    const [allUrls, setAllUrls] = useState<AllUrlResponse[]>([]);

    const [dataChangeTriggered, setDataChangeTriggered] = useState<boolean>(false);

    async function getMyUrls() {
        try {
            let getMyUrls = await API.get("/url/get", {
                headers: { "z-token": token || '' }

            });

            // console.log("getMyUrls = ", getMyUrls);

            // let error = myAllUrls
            let myAllUrls = getMyUrls?.data?.message || []


            // console.log("getMyUrls data", myAllUrls || []);

            setAllUrls(myAllUrls);


        }
        catch (err: any) {
            let responseError = err?.response?.data?.error || "Something went wrong";
            setResponseNotification({ message: responseError, isError: true });
            console.log("err", err);
        }
    }

    useEffect(() => {



        getMyUrls();


    }, [dataChangeTriggered]);

    return (
        <>
            {responseNotification?.message?.length ?
                <div className={responseNotification.isError ? "txt-error" : "txt-success"}>{responseNotification.message}</div> :
                <div></div>}

            {
                userDetails.name?.length ? <h1>Hello {userDetails.name} - {userDetails.email}</h1> : <div></div>
            }
            
            <AddUrlModal dataChangeTriggered={dataChangeTriggered} setDataChangeTriggered={setDataChangeTriggered} />
            <AllUrlsContext.Provider value={allUrls}>

                <DataChangeContext.Provider value={{ dataChangeTriggered, setDataChangeTriggered }}>
                    <ViewUrl />
                </DataChangeContext.Provider>
            </AllUrlsContext.Provider>
        </>
    )
}


export default Dashboard;