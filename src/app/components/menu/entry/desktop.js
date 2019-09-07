import React, { useRef } from "react";
import { useMouseEnteredTracker, useMouseDownTracker } from "../../effects";
import "./entry.desktop.css";

function MenuEntryDesktopLeft({ mouse, children, ...props }) {
  const ref = useRef();
  const mouseEntered = useMouseEnteredTracker(mouse, ref);
  const mouseClicked = useMouseDownTracker(mouse, ref);
  return (
    <div
      {...{ ...props, ref }}
      className={`desktop-menu-entry-left${
        mouseEntered ? " desktop-menu-entry-hover" : ""
      }${mouseClicked ? " desktop-menu-entry-clicked" : ""}`}
    >
      {children}
    </div>
  );
}
function MenuEntryDesktopRight({ mouse, children, ...props }) {
  const ref = useRef();
  const mouseEntered = useMouseEnteredTracker(mouse, ref);
  const mouseClicked = useMouseDownTracker(mouse, ref);
  return (
    <div
      {...{ ...props, ref }}
      className={`desktop-menu-entry-right${
        mouseEntered ? " desktop-menu-entry-hover" : ""
      }${mouseClicked ? " desktop-menu-entry-clicked" : ""}`}
    >
      {children}
    </div>
  );
}

const MenuEntryDesktop = {
  left: MenuEntryDesktopLeft,
  right: MenuEntryDesktopRight
};

export default MenuEntryDesktop;
