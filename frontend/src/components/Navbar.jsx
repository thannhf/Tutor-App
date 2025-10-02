import React from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({containerStyles, toggleMenu, menuOpened}) => {
  const navItems = [
    {to: "/", label:"Home"},
    {to: "/tutors", label:"Tutors"},
    {to: "/blog", label:"Blog"},
    {to: "/contact", label:"Contact"},
  ]

  return (
    <nav className={containerStyles}>
      {/* close button inside the navbar */}
      {menuOpened && (
        <>
          <FaRegWindowClose
            onClick={toggleMenu}
            className="text-xl self-end cursor-pointer relative left-8"
          />
          {/* // Logo */}
          <Link to={"/"} className="bold-24 flex pb-12">
            <span className="inline-flex">
              <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-tertiary -rotate-[31deg] rounded-full">
                P
              </span>
              rimeTutor
            </span>
          </Link>
        </>
      )}
      {navItems.map(({to, label}) => (
        <div key={label} className="inline-flex">
            <NavLink to={to} className={({isActive}) => (isActive ? "active-link" : "")}>
                <h5 className="medium-16">{label}</h5>
            </NavLink>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
