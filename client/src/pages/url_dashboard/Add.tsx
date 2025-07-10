import React,{useState} from "react"
import API from '../../utils/request.ts';

interface addUrlResponse {
    message: string,
    isError: boolean
}


const AddUrlModal: React.FC = () => {

    let token = localStorage.getItem("z-token");

    let [modalsStyle, setModalsStyle] = useState<string>("none");
    let [urlVal, setUrlVal] = useState<string>("");

    let [addUrlResponse, setAddUrlResponse] = useState<addUrlResponse>({
        message: "",
        isError: false
    });


    const onUrlAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        try {

            e.preventDefault();
            
            let addUrlRequest = await API.post("/url/add", {"url": urlVal}, {
                headers: { "z-token": token || '' }
            });

            let urlResponse = addUrlRequest?.data?.message || "";

            setAddUrlResponse({
                message: urlResponse,
                isError: false
            });

            console.log("urlResponse", urlResponse);


        }
        catch(err: any) {
            console.log(err);
        }
    }


    return (
        <>

        <div>
            <button onClick={() => setModalsStyle("flex")}>Add URL</button>
            <span className={addUrlResponse.isError ? "txt-error": "txt-success"}>{addUrlResponse.message}</span>
        </div>
            <div className="modal-backdrop" id="modalBackdrop" style={{display: modalsStyle}}>

                <div className="modal">

                    <div className="modal-header">Add URL</div>

                    <form onSubmit={onUrlAdd}>
                        
                        <input type="url" id="url" placeholder="https://example.com" onChange={(e) => setUrlVal(e.target.value)} required />
                        <div className="actions">
                            <button type="button" className="close-btn" onClick={() => setModalsStyle("none")}>Cancel</button>
                            <button type="submit">Add</button>
                        </div>
                    </form>

                </div>

            </div>
        </>
    )
}

export default AddUrlModal;