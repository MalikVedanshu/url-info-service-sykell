import React,{useState} from "react"
import API from '../../utils/request.ts';
import { useToast } from "../../components/CustomToaster.tsx";
import { handleApiError } from '../../utils/errorHandler.ts';

interface TriggerProps {
    dataChangeTriggered: boolean,
    setDataChangeTriggered: React.Dispatch<React.SetStateAction<boolean>>
}

const AddUrlModal: React.FC<TriggerProps> = ({dataChangeTriggered, setDataChangeTriggered}) => {

    let token = localStorage.getItem("z-token");
    const toast = useToast();

    let [modalsStyle, setModalsStyle] = useState<string>("none");
    let [urlVal, setUrlVal] = useState<string>("");


    const onUrlAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        try {

            e.preventDefault();
            
            let addUrlRequest = await API.post("/url/add", {"url": urlVal}, {
                headers: { "z-token": token || '' }
            });

            let urlResponse = addUrlRequest?.data?.message || "";

            console.log("urlResponse", urlResponse);
            let customUrlAddResponse = urlResponse?.data?.message || "URL Added successfully";

            setDataChangeTriggered(!dataChangeTriggered);

            toast({message: customUrlAddResponse, isError: false});

            setModalsStyle("none");


        }
        catch(err: any) {
            console.log(err);

            let customError = err?.response?.data?.error || handleApiError(err)

            toast({message: customError, isError: true});
        }
    }


    return (
        <>

        <div>
            <button onClick={() => setModalsStyle("flex")}>Add URL</button>
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