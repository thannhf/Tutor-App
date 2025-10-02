import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { FaClipboardList, FaSquarePlus } from "react-icons/fa6";
import { MdFactCheck } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { FaListAlt } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { TutorContext } from "../context/TutorContext";

const Sidebar = () => {
  const { atoken, setAtoken } = useContext(AdminContext);
  const {tToken, setTToken} = useContext(TutorContext);
  const {navigate} = useContext(AppContext);


  const logout = () => {
    navigate('/')
    atoken && setAtoken('')
    atoken && localStorage.removeItem('atoken')
    tToken && setTToken('')
    tToken && localStorage.removeItem('tToken')
  }

  return (
    <div className="max-sm:flexCenter bg-deep sm:w-1/5 sm:min-h-[98vh] sm:fixed rounded-xl m-2">
      <div className="flex flex-col gap-y-6 max-sm:items-center sm:flex-col pt-4 sm:pt-14">
        {/* logo */}
        <Link
          to={"/"}
          className="bold-22 md-bold-24 flex flex-1 gap-y-1 flex-col text-white pl-2 lg:pl-[15%]"
        >
          <span className="inline-flex">
            <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-tertiary -rotate-[31deg] rounded-full">
              P
            </span>
            rimeTutor
          </span>
          <span className="text-xs bg-secondary text-tertiary px-2 rounded-xl max-w-[76px]">
            {atoken ? "For Admin" : "For Tutor"}
          </span>
        </Link>
        {atoken && (
          <div className="flex sm:flex-col sm:gap-x-5 gap-y-8 sm:pt-10 text-white">
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "flexStart gap-x-2 p-5 lg:pl-12 medium-15 cursor-pointer h-10"
              }
            >
              <FaListAlt className="text-lg sm:hidden md:flex" />
              <div className="hidden sm:flex">Dashboard</div>
            </NavLink>
            <NavLink
              to="/all-sessions"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "flexStart gap-x-2 p-5 lg:pl-12 medium-15 cursor-pointer h-10"
              }
            >
              <MdFactCheck className="text-lg sm:hidden md:flex" />
              <div className="hidden sm:flex">All Sessions</div>
            </NavLink>
            <NavLink
              to="/tutors-list"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "flexStart gap-x-2 p-5 lg:pl-12 medium-15 cursor-pointer h-10"
              }
            >
              <FaClipboardList className="text-lg sm:hidden md:flex" />
              <div className="hidden sm:flex">Tutors List</div>
            </NavLink>
            <NavLink
              to="/add-tutor"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "flexStart gap-x-2 p-5 lg:pl-12 medium-15 cursor-pointer h-10"
              }
            >
              <FaSquarePlus className="text-lg sm:hidden md:flex" />
              <div className="hidden sm:flex">Add Tutor</div>
            </NavLink>
            <div className="max-sm:ml-5 sm:mt-48">
              <button onClick={logout} className="flexStart gap-x-2 lg:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl text-red-500">
                <BiLogOut className="text-lg sm:hidden md:flex" />
                <div className="hidden sm:flex">Logout</div>
              </button>
            </div>
          </div>
        )}
        {tToken && (
          <div className="flex sm:flex-col gap-x-5 gap-y-8 sm:pt-10 text-white">
            <NavLink
              to="/tutor-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "flexStart gap-x-2 p-5 lg:pl-12 medium-15 cursor-pointer h-10"
              }
            >
              <FaListAlt className="text-lg sm:hidden md:flex" />
              <div className="hidden sm:flex">Dashboard</div>
            </NavLink>
            <NavLink
              to="/tutor-sessions"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "flexStart gap-x-2 p-5 lg:pl-12 medium-15 cursor-pointer h-10"
              }
            >
              <MdFactCheck className="text-lg sm:hidden md:flex" />
              <div className="hidden sm:flex">Sessions</div>
            </NavLink>
            <NavLink
              to="/tutors-profile"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "flexStart gap-x-2 p-5 lg:pl-12 medium-15 cursor-pointer h-10"
              }
            >
              <FaClipboardList className="text-lg sm:hidden md:flex" />
              <div className="hidden sm:flex">Profile</div>
            </NavLink>
            <div className="max-sm:ml-5 sm:mt-48">
              <button onClick={logout} className="flexStart gap-x-2 lg:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl text-red-500">
                <BiLogOut className="text-lg sm:hidden md:flex" />
                <div className="hidden sm:flex">Logout</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
