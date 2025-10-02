import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { CgMenuLeft } from "react-icons/cg";
import { TbArrowNarrowRight } from "react-icons/tb";
import { RiUserLine } from "react-icons/ri";
import { AppContext } from "../context/AppContext";
import upload_icon from "../assets/upload_icon.png";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { token, setToken, navigate, userData } = useContext(AppContext);

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  const logout = () => {
    navigate('/login')
    localStorage.removeItem("token")
    setToken("")
  }

  return (
    <header className="max-padd-container w-full absolute top-0 left-0 right-0 z-50 bg-deep text-white py-3">
      <div className="flexBetween">
        {/* Logo */}
        <Link to={"/"} className="bold-24 flex-1 flex">
          <span className="inline-flex">
            <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-tertiary -rotate-[31deg] rounded-full">
              P
            </span>
            rimeTutor
          </span>
        </Link>
        {/* Navbar */}
        <div className="flex-1">
          <Navbar
            menuOpened={menuOpened}
            toggleMenu={toggleMenu}
            containerStyles={`${
              menuOpened
                ? "flex flex-col gap-y-12 h-screen w-[222px] absolute left-0 top-0 bg-deep z-50 px-10 py-4 shadow-2xl"
                : "hidden xl:flex gap-x-5 xl:gap-x-12 medium-15 px-2 py-1"
            }`}
          />
        </div>
        {/* Right side */}
        <div className="flex-1 flex items-center justify-end gap-x-3 sm:gap-x-10">
          {!menuOpened && (
            <CgMenuLeft
              onClick={toggleMenu}
              className="text-2xl xl:hidden cursor-pointer"
            />
          )}
          <div className="group relative">
            <div onClick={()=>!token && navigate("/login")}>
              {token && userData ? (
                <div>
                  <img
                    src={userData.image || upload_icon}
                    alt=""
                    className="rounded-full w-12 cursor-pointer"
                  />
                </div>
              ) : (
                <button className="btn-white !border-none flexCenter gap-x-2 !py-3">
                  Login <RiUserLine />
                </button>
              )}
            </div>
            {token && (
              <>
                <ul className="bg-white shadow-sm p-2 w-36 ring-1 ring-slate-900/15 rounded absolute right-0 top-10 hidden group-hover:flex flex-col">
                  <li
                    onClick={() => navigate("/my-profile")}
                    className="flexBetween cursor-pointer"
                  >
                    <p>My Profile</p>
                    <TbArrowNarrowRight className="text-[19px] text-gray-30/10" />
                  </li>
                  <hr className="my-2" />
                  <li
                    onClick={() => navigate("/my-sessions")}
                    className="flexBetween cursor-pointer"
                  >
                    <p>My Sessions</p>
                    <TbArrowNarrowRight className="text-[19px] text-gray-30/10" />
                  </li>
                  <hr className="my-2" />
                  <li onClick={logout} className="flexBetween cursor-pointer">
                    <p className="text-red-500">Logout</p>
                    <TbArrowNarrowRight className="text-[19px] text-gray-30/10" />
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
