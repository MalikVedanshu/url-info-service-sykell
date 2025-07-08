import { useEffect } from "react";
import TableFields from "./AnalysisStructure.json";
import TestData from './test_data.json';

const fieldsStructure = TableFields["fields_structure"];


const ViewUrl : React.FC = () => {

    useEffect (() => {
        // console.log("TableFields",TableFields);

        console.log("TestData: ", TestData)
    }, [])
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

                    <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        TestData.map((urlData, urlIdx) => (
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
