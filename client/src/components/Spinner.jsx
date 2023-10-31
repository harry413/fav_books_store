import React from "react";
import { ImSpinner9 } from "react-icons/im"


const Spinner = () => {
    return(
        <h1 className='animate-wing w-full h-full flex p-20 rounded-full place-content-center justify-center justify-items-center items-center'>
           <ImSpinner9 className="text-8xl h-30 w-30 animate-spin place-content-center"/>
        </h1>
    )
}

export default Spinner;