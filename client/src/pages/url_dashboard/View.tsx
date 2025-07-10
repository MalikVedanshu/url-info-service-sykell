import React,{ useEffect,useContext, ReactEventHandler, MouseEvent } from "react";
import { useToast } from "../../components/CustomToaster.tsx";
import { handleApiError } from '../../utils/errorHandler.ts';
import API from "../../utils/request.ts";
import {AllUrlResponse, AllUrlsContext, DataChangeContext } from "./index.tsx";
import TableFields from "./AnalysisStructure.json";
// import TestData from './test_data.json';
import { Analyse } from "../../files/icons/index.tsx";
const fieldsStructure = TableFields["fields_structure"];



const ViewUrl = () =>  {

    const toast = useToast();
    const token = localStorage.getItem("z-token");

    const allUrls = useContext(AllUrlsContext);
    let dataChangeCont = useContext(DataChangeContext);

    if (!dataChangeCont) throw new Error("DataChangeContext must be used within its provider");

    const {dataChangeTriggered, setDataChangeTriggered} = dataChangeCont;


    const handleAnalysisClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {   
            e.preventDefault();
            e.currentTarget.disabled = true;

            let analysisId = e?.currentTarget?.id; 

            let analysisRequest = await API.put(`url/analyse/${analysisId}`, {}, {
                headers: { "z-token": token || '' }
            });

            let analysisResponse = analysisRequest?.data?.message;

            toast({message: analysisResponse, isError: false});

            setDataChangeTriggered(!dataChangeTriggered);


        }
        catch(err: any) {

             let customError = err?.response?.data?.error || handleApiError(err)
             
            toast({message: customError, isError: true});
        }
    }
    
    return (
        <>

            <table>
                <thead>
                    <tr>
                    {
                        fieldsStructure.map((fieldElem, fieldIndex) => (
                            <th key={fieldIndex}>{fieldElem.heading}</th>
                        ))
                    }

                    </tr>
                </thead>

                <tbody>
                    {
                        allUrls && allUrls.map((urlData, urlIdx) => (
                            <tr key={urlIdx}>
                                {
                                    fieldsStructure.map((fieldEle, fieldIdx) => (
                                        <td key={fieldIdx}>
                                            
                                            {
                                                fieldEle.type === "text" && <span> 
                                                    {urlData[fieldEle.fieldName]}
                                                </span> || ""
                                            }

                                            {
                                                fieldEle.type === "number" && <span> 
                                                    {urlData["analysed"] ? urlData[fieldEle.fieldName] : "-"}
                                                </span> || ""
                                            }

                                            
                                            { 
                                                fieldEle.type === "boolean" && <span>
                                                    {urlData["analysed"] ? urlData[fieldEle.fieldName] === true ? "YES" : "NO" :  "-"}
                                                </span> || ""
                                                
                                            }

                                            { 
                                                fieldEle.type === "parent" && <span>
                                                    {urlData["analysed"] ? "" : "-"}
                                                </span> || ""
                                                
                                            }

                                            {
                                                fieldEle.type === "button" && <span>
                                                    <button className="analyse" 
                                                        disabled={urlData["analysed"]} id={urlData["id"]}
                                                        onClick={handleAnalysisClick}
                                                    >
                                                        <Analyse /> 
                                                    </button>
                                                </span> || ""
                                            }
                                            
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default ViewUrl;
