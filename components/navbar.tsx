import Link from "next/link";
import React, { useState, useEffect } from "react";
import MobileDrawer from "./MobileDrawer";
import LogoLink from "./LogoLink";
import DesktopNavLinks from "./DesktopNavLinks";
import MobileMenuButton from "./MobileMenuButton";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const HandleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 700) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`hidden sm:flex justify-between fixed top-0 left-0 w-full z-50 px-16 py-4 backdrop-blur-md transition-all duration-300 ${
          navScrolled ? "text-black" : "text-white"
        }`}
      >
        <LogoLink />
        <DesktopNavLinks />
      </div>
      <div
        className={`sm:hidden fixed flex flex-row p-4 justify-between w-full z-50 backdrop-blur-md transition-all duration-300 ${
          navScrolled ? "text-black" : "text-white"
        }`}
      >
        <LogoLink />
        <MobileMenuButton onClick={HandleDrawerToggle} />
        <MobileDrawer isOpen={isDrawerOpen} onClose={HandleDrawerToggle} />
      </div>
    </>
  );
};

export default Navbar;
