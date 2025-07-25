import React from "react";
import { createPopper } from "@popperjs/core";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const history = useHistory();
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const agencyimage = localStorage.getItem("agencyimage");
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.replace("/auth/login");
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        {agencyimage && agencyimage !== "" ? (
          <div
            style={{
              height: "48px",
              width: "48px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img alt="image" style={{height:'100%',width:'100%',objectFit:'cover'}} src={`https://api.videorpi.com/${agencyimage}`} />
          </div>
        ) : (
          <div className="items-center flex">
            <span className="w-12 h-12 text-xl text-white bg-red-400 inline-flex items-center justify-center rounded-full">
              <i class="fas fa-user"></i>
            </span>
          </div>
        )}
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          className={
            "cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => handleLogOut(e)}
        >
          Log Out
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
