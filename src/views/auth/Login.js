import { sendAgencyOtp } from "apis/Login";
import { loginGIE } from "apis/Login";
import { loginAgency } from "apis/Login";
import { sendGieOtp } from "apis/Login";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setisLoggedin } from "utils/ReduxSlices/LoginSlice";
import toastService from "utils/Toaster/toaster";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOtp, setIsOtp] = useState(false);
  const [mobileno, setmobileno] = useState("");
  const [countrycode, setcountrycode] = useState("");
  const [selected, setSelected] = useState("agency");
  const [otp, setotp] = useState("");
  const [timer, settimer] = useState(60);
  const handleSendOtp = async () => {
    settimer(60)
    if (mobileno.slice(countrycode.length - 1).trim() === "") {
      toastService.warn("Please Enter Your Number");
      return;
    }
    let response = {};
    const requestbody = {
      phone: mobileno.slice(countrycode.length - 1),
      countryCode: countrycode,
    };
    console.log('body for send otp',requestbody)
    if (selected === "agency") {
      response = await sendAgencyOtp(requestbody);
    }
    if (selected === "gie") {
      response = await sendGieOtp(requestbody);
    }
    if (!response.error) {
      setIsOtp(true);
    } else {
      toastService.warn("Wrong Credentials");
    }
  };
  useEffect(() => {
    if (isOtp && timer !== 0) {
      setTimeout(() => {
        settimer(timer - 1);
      }, 1000);
    }
  }, [isOtp, timer]);
  const handleSignIn = async (e) => {
  e.preventDefault();

  if (otp.trim() === "") {
    toastService.warn("Please Enter Otp");
    return;
  }

  const requestbody = {
    phone: mobileno.slice(countrycode.length - 1),
    countryCode: countrycode,
    otp: otp,
  };

  try {
    let response = {};

    if (selected === "agency") {
      response = await loginAgency(requestbody);
      if (!response.error) {
        localStorage.setItem("agencyname", response.data.agency.name);
        localStorage.setItem("agency_id", response.data.agency._id);
        localStorage.setItem("parent_gie",response.data.agency.gie)
        localStorage.setItem("access_token", response.data.token);
        localStorage.setItem("mobile",response.data.agency.completeNumber)
        localStorage.setItem("agencyimage",response.data.agency.image)
        dispatch(setisLoggedin(true));
        localStorage.setItem("isLoggedIn", true);
        toastService.success("Logged In Successfully");
        history.replace("/");
      } else {
        toastService.error("Invalid OTP or login failed");
      }
    }

    if (selected === "gie") {
      response = await loginGIE(requestbody);
      if (!response.error) {
        localStorage.setItem("giename", response.data.gie.name);
        localStorage.setItem("gie_id", response.data.gie._id);
        localStorage.setItem("access_token", response.data.token);
        localStorage.setItem('expiry',response.data.gie.expiresOn);
        localStorage.setItem("mobile",response.data.gie.completeNumber)
        dispatch(setisLoggedin(true));
        localStorage.setItem("isLoggedIn", true);
        toastService.success("Logged In Successfully");
        history.replace("/");
      } else {
        toastService.error("Invalid OTP or login failed");
      }
    }
  } catch (err) {
    console.error("Login error:", err);
    toastService.error("Something went wrong during login.");
  }
};

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    {isOtp ? "Enter OTP" : "Enter Mobile no. for OTP"}
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={(e)=>handleSignIn(e)}>
                  {/* Pill Switcher */}
                  {!isOtp && (
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Select User Type
                      </label>
                      <div className="px-6 mb-6">
                        {/* add your code here */}
                        <div className="flex flex-wrap gap-4">
                          {[
                            {
                              label: "Agency",
                              value: "agency",
                              icon: (
                                <svg
                                  className="w-8 h-8 text-blue-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M4 2a2 2 0 00-2 2v12h2v2h2v-2h8v2h2v-2h2V4a2 2 0 00-2-2H4zm0 2h12v10H4V4zm2 2v2h2V6H6zm0 4v2h2v-2H6zm4-4v2h2V6h-2zm0 4v2h2v-2h-2z" />
                                </svg>
                              ),
                            },
                            {
                              label: "GIE",
                              value: "gie",
                              icon: (
                                <svg
                                  className="w-8 h-8 text-green-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M13 7a3 3 0 10-6 0 3 3 0 006 0zm-3 5c-3.866 0-7 1.79-7 4v2h14v-2c0-2.21-3.134-4-7-4z" />
                                </svg>
                              ),
                            },
                          ].map((option) => (
                            <div
                              key={option.value}
                              onClick={() => setSelected(option.value)}
                              style={{ borderRadius: "20px", width: "50%" }}
                              className={` cursor-pointer p-4 border flex flex-col items-center transition-all duration-300 ${
                                selected === option.value
                                  ? "border-blue-600 bg-red-600 shadow-md text-white"
                                  : "border-gray-300 hover:border-blue-400"
                              }`}
                            >
                              {option.icon}
                              <span className="mt-2 font-medium text-sm">
                                {option.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {!isOtp && (
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Mobile #
                      </label>
                      <PhoneInput
                        onChange={(value, data) => {
                          setmobileno(`${value}`);
                          setcountrycode(`+${data.dialCode}`);
                        }}
                        country={"fr"}
                        countryCodeEditable={false}
                      />
                    </div>
                  )}

                  {isOtp && (
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Enter OTP"
                        maxLength={6}
                        minLength={6}
                        value={otp}
                        onChange={(e) => setotp(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="text-center mt-6">
                    {!isOtp && (
                      <button
                        className="bg-red-600 text-white active:bg-red-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSendOtp}
                      >
                        Send OTP
                      </button>
                    )}

                    {isOtp && (
                      <>
                        <button
                          className="bg-red-600 text-white active:bg-red-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full mb-2 ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Sign In
                        </button>
                        <button
                          className={`bg-red-600 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150 ${
                            timer !== 0
                              ? "opacity-50"
                              : "active:bg-red-500"
                          }`}
                          type="button"
                          disabled={timer !== 0}
                          onClick={handleSendOtp}
                        >
                          Resend OTP {timer !== 0 && `in ${timer}`}
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
