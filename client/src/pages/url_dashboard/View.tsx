import { useEffect,useContext } from "react";
import {AllUrlResponse, AllUrlsContext } from "./index.tsx";
import TableFields from "./AnalysisStructure.json";
// import TestData from './test_data.json';
import { Analyse } from "../../files/icons/index.tsx";
const fieldsStructure = TableFields["fields_structure"];




const ViewUrl = () =>  {

    const allUrls = useContext(AllUrlsContext);
    
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
                                                (fieldEle.type === "text" || fieldEle.type === "number") && <span> 
                                                    {urlData[fieldEle.fieldName]}
                                                </span> || ""
                                            }

                                            
                                            { 
                                                fieldEle.type === "boolean" && <span>
                                                    {urlData[fieldEle.fieldName] === true ? "YES" : "NO"}
                                                </span> || ""
                                                
                                            }

                                            { 
                                                fieldEle.type === "parent" && <span>

                                                </span> || ""
                                                
                                            }

                                            {
                                                fieldEle.type === "button" && <span>
                                                    <button><Analyse /> </button>
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
