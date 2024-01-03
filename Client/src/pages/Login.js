import React, { useState } from "react";
import { auth } from "../Configs/firebase-config";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OtpInput from "react-otp-input";
import Axios from "axios";

const axios = Axios.create({
   baseURL: "http://localhost:4000",
   headers: {
      "Content-Type": "application/json",
   },
});

const Login = () => {
   const [login, setLogin] = useState(true);
   const [phone, setPhone] = useState("+917025356979");
   const [otp, setOtp] = useState("");
   const [userId, setUserId] = useState("")
   const navigate = useNavigate();

   const generateRecaptcha = () => {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
         size: "invisible",
         callback: (response) => console.log(response),
      });
   };

   const handleSubmit = async (e) => {
      try {
         e.preventDefault();
         generateRecaptcha();
         const appVerifier = window.recaptchaVerifier;

         const response = await axios.post("/api/users/check", { phone });
         console.log(response)
         if (response.data.success) {
            console.log("first")
            setUserId(response.data.userId)
            console.log(userId)
            const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
            window.confirmationResult = confirmationResult;
            setLogin(false);
         } else {
            alert("Incorrect number or user not registered");
         }
      } catch (error) {
         console.error(error);
      }
   };

   const handleVerifyOtp = async (e) => {
      try {
         e.preventDefault();
         const confirmationResult = window.confirmationResult;
         const result = await confirmationResult.confirm(otp);
         console.log(result)
         const user = result.user;
         console.log(user);

         const response = await axios.post("/api/users/login", { userId });
         if (response.data.success) {
            const token = response.data.token;
            console.log(token);
            alert("Success");
            navigate("/home");
         } else {
            alert("Failed");
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <>
         {login ? (
            <div className="container">
               <div className="form-container">
                  <div className="logo-container">Login</div>

                  <form className="form" onSubmit={handleSubmit}>
                     <div className="form-group">
                        <label>Phone</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                     </div>

                     <button className="form-submit-btn" type="submit">
                        Continue
                     </button>
                  </form>

                  <p className="signup-link">
                     <a href=" " className="signup-link link">
                        Login with password
                     </a>
                  </p>
               </div>
               <div id="recaptcha"></div>
            </div>
         ) : (
            <div className="container">
               <form className="form">
                  <div className="title">OTP</div> <div className="title">Verification Code</div>
                  <p className="message">We have sent a verification code to your mobile number</p>
                  <div className="inputs">
                     <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => <input {...props} />}
                        shouldAutoFocus
                     />
                  </div>
                  <button className="form-submit-btn" type="submit" onClick={handleVerifyOtp}>
                     Verify
                  </button>
               </form>
            </div>
         )}
      </>
   );
};

export default Login;
