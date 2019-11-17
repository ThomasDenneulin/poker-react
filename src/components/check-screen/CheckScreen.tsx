import React from "react";
import LoginForm from "../login/login-form";

export const CheckScreen = () => {
   return (
       <div>
           <LoginForm loginUser={() => {console.log("ok")}}/>
       </div>
   )
};

