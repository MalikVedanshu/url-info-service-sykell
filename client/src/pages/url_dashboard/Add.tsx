import React from "react"


interface HeadingCounts {
    h1: number,
    h2: number,
    h3: number,
    h4: number,
    h5: number,
    h6: number
}

interface PageDetail {
    url: string,
    vhtml : string,
    title : string,
    heading : HeadingCounts,
    internalLinks : number,
    externalLinks : number,
    inAccessibleLinks : number,
    presenseOfLoginForm : boolean

}

const AddEditUrl : React.FC = () => {

    
    return (
        <>
            <form>
                <div></div>
            </form>
        </>
    )
}

export default AddEditUrl;