import React, { useRef } from "react";
import "./entry.desktop.css";

function MenuEntryDesktopLeft({ children, ...props }) {
  const ref = useRef();
  return (
    <div {...{ ...props, ref }} className="desktop-menu-entry-left">
      {children}
    </div>
  );
}
function MenuEntryDesktopRight({ children, ...props }) {
  const ref = useRef();
  return (
    <div {...{ ...props, ref }} className="desktop-menu-entry-right">
      {children}
    </div>
  );
}

const MenuEntryDesktop = {
  left: MenuEntryDesktopLeft,
  right: MenuEntryDesktopRight
};

export default MenuEntryDesktop;
