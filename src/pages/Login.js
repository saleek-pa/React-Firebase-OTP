import React, { useState } from "react";
import { auth } from "../Configs/firebase.config";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OtpInput from "react-otp-input";

const Login = () => {
   const [login, setLogin] = useState(true);
   const [phone, setPhone] = useState("+91");
   const [otp, setOtp] = useState("");
   const navigate = useNavigate();

   const generateRecaptcha = () => {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
         size: "invisible",
         callback: (response) => console.log(response),
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      generateRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, phone, appVerifier)
         .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLogin(false);
         })
         .catch((error) => {
            console.error(error);
         });
   };

   const handleVerifyOtp = (e) => {
      e.preventDefault();
      const confirmationResult = window.confirmationResult;
      confirmationResult
         .confirm(otp)
         .then((result) => {
            const user = result.user;
            console.log(user);
            alert("Success");
            navigate("/home");
         })
         .catch((error) => {
            console.error(error);
         });
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
