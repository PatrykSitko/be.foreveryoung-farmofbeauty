import React, { useState } from "react";
import logo from "../../resources/backgrounds/menu/ForeverYoung.svg";
import "./menu.desktop.css";

export function MenuDesktop({ children: entries }) {
  const [isClosed, setIsClosed] = useState(false);
  const entriesLeft =
    (entries &&
      [entries]
        .flat(Infinity)
        .filter(entry => entry.type.name === "MenuEntryDesktopLeft")) ||
    "";
  const entriesRight =
    (entries &&
      [entries]
        .flat(Infinity)
        .filter(entry => entry.type.name === "MenuEntryDesktopRight")) ||
    "";
  return (
    <div className="desktop-menu">
      <div
        className={`desktop-menu-left${
          isClosed ? " desktop-menu-left-closed" : ""
        }`}
      >
        {entriesLeft}
      </div>
      <img
        onClick={() => {
          if (!isClosed) {
            setIsClosed(true);
            setTimeout(() => setIsClosed(false), 1000);
          }
        }}
        className="desktop-menu-logo"
        src={logo}
        alt="Forever Young Farm of Beauty Logo"
      />
      <div
        className={`desktop-menu-right${
          isClosed ? " desktop-menu-right-closed" : ""
        }`}
      >
        {entriesRight}
      </div>
    </div>
  );
}

export default MenuDesktop;
