import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import toastService from "utils/Toaster/toaster";

export default function Login() {
  const history = useHistory();
  const [isOtp, setIsOtp] = useState(false);
  const [mobileno, setmobileno] = useState("");
  const [countrycode, setcountrycode] = useState("");
  const [selected, setSelected] = useState("organization");
  const [timer, settimer] = useState(60);
  const handleSendOtp = () => {
    if (mobileno.slice(countrycode.length - 1).trim() === "") {
      toastService.warn("Please Enter Your Number");
      return;
    }
    setIsOtp(true);
  };
  useEffect(() => {
    if (isOtp && timer !== 0) {
      setTimeout(() => {
        settimer(timer - 1);
      }, 1000);
    }
  }, [isOtp, timer]);
  const handleSignIn = () => {
    history.push("/");
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Enter Mobile no. for OTP
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  {/* Pill Switcher */}
                  {!isOtp&&<div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Select User Type
                    </label>
                    <div className="px-6 mb-6">
                      {/* add your code here */}
<div className="flex flex-wrap gap-4">
  {[
    {
      label: "Organization",
      value: "organization",
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
      style={{borderRadius:'20px',width:'50%'}}
      className={` cursor-pointer p-4 border flex flex-col items-center transition-all duration-300 ${
        selected === option.value
          ? "border-blue-600 bg-blueGray-800 shadow-md text-white"
          : "border-gray-300 hover:border-blue-400"
      }`}
    >
      {option.icon}
      <span className="mt-2 font-medium text-sm">{option.label}</span>
    </div>
  ))}
</div>

                    </div>
                  </div>}
                  {!isOtp && (
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Mobile #
                      </label>
                      <PhoneInput
                        onChange={(value, data) => {
                          setmobileno(value);
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
                      />
                    </div>
                  )}

                  <div className="text-center mt-6">
                    {!isOtp && (
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSendOtp}
                      >
                        Send OTP
                      </button>
                    )}

                    {isOtp && (
                      <>
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full mb-2 ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleSignIn}
                        >
                          Sign In
                        </button>
                        <button
                          className={`bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150 ${
                            timer !== 0 ? "opacity-50" : "active:bg-blueGray-600"
                          }`}
                          type="button"
                          disabled={timer !== 0}
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
