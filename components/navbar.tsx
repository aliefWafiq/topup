'use client'
import React, { useState, useEffect } from "react";
import MobileDrawer from "./MobileDrawer";
import LogoLink from "./LogoLink";
import { DesktopNavLinks } from "./DesktopNavLinks";
import MobileMenuButton from "./MobileMenuButton";
import { HomeDrawerLink } from "./drawerLink";

export const NavbarLandingPage = () => {
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

export const NavbarHome = ({desktopChildren, mobileChildren}: {desktopChildren: React.ReactNode, mobileChildren: React.ReactNode}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const HandleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
        <>
      <div
        className="border-b-2 w-screen bg-white fixed z-40 top-0">
          <div className="flex items-center justify-end lg:justify-between mx-auto p-4 lg:px-8">
            <LogoLink />
            {desktopChildren}
          </div>
      </div>
      <div
        className={`sm:hidden fixed flex flex-row p-4 justify-between w-full z-50 backdrop-blur-md transition-all duration-300`}
      >
        <LogoLink />
        <MobileMenuButton onClick={HandleDrawerToggle} />
        <MobileDrawer isOpen={isDrawerOpen} onClose={HandleDrawerToggle}>
            {mobileChildren}
        </MobileDrawer>
      </div>
    </>
  )
}