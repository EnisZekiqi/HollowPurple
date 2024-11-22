import { useState,useEffect } from "react";

const LogIn = () => {
    return ( 
        <div className="login h-screen">
            <div className="flex flex-col items-center justify-center h-full">
            <div className="loginForm rounded-md p-6 w-[400px]">
             <div className="flex flex-col gap-1">
             <div className='flex items-center justify-center gap-1'>
           <h1  className='font-semibold text-2xl '>HollowPurple</h1>
            <svg style={{ width: "30px", height: "30px" }} viewBox="0 0 24 24">
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  stroke="#5a58a5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
           </div>
             <p className="text-center font-light text-xs text-[#d6d6dc]">In order to buy products you need to log in</p>
             </div>
             <div className="flex flex-col gap-4">
                <input type="text" />
             </div>
            </div>
            </div>
        </div>
     );
}
 
export default LogIn;