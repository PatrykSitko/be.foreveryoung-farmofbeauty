import React from "react";
import "./entry.desktop.css";

function MenuEntryDesktopLeft({ children }) {
  return <div className="desktop-menu-entry-left">{children}</div>;
}
function MenuEntryDesktopRight({ children }) {
  return <div className="desktop-menu-entry-right">{children}</div>;
}

const MenuEntryDesktop = {
  left: MenuEntryDesktopLeft,
  right: MenuEntryDesktopRight
};

export default MenuEntryDesktop;
