import React from "react";
import logo from "../../resources/backgrounds/menu/ForeverYoung.svg";
import "./menu.desktop.css";

export function MenuDesktop({ children: entries }) {
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
      <div className="desktop-menu-left">{entriesLeft}</div>
      <img
        className="desktop-menu-logo"
        src={logo}
        alt="Forever Young Farm of Beauty Logo"
      />
      <div className="desktop-menu-right">{entriesRight}</div>
    </div>
  );
}

export default MenuDesktop;
