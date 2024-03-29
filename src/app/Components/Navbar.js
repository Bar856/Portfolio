
import Link from "next/link";
import Image from "next/image";
// import Logo from "./Logo";
import NavItem from "./NavItem";
import '../globals.css'
import React, { useState, useEffect } from "react";

const MENU_LIST = [
  { text: "About", href: "/" },
  { text: "Skills", href: "#skills" },
  { text: "Projects", href: "#projects" },
  { text: "Contact", href: "#contact" },
];
const Navbar = () => {
  
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(prefersDarkMode.matches);
    const darkModeListener = (event) => {
      setDarkMode(event.matches);
    };
    prefersDarkMode.addEventListener("change", darkModeListener);
    return () => {
      prefersDarkMode.removeEventListener("change", darkModeListener);
    };
  }, []);

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
            <h2 className="logo pl-16">Bar</h2>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;