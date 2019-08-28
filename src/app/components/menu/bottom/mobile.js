import React from "react";
import "./mobile.css";

export function MobileMenuBottom({
  isFirst,
  mobileMenuHidden,
  handleMobileMenuOnClick,
  noMenuHandler,
  children,
  ...props
}) {
  return (
    <div
      {...props}
      className={`mobile-menu-bottom${
        mobileMenuHidden
          ? " mobile-menu-bottom-shrinked"
          : " mobile-menu-bottom-expanded"
      }`}
    >
      {children}
    </div>
  );
}

export default MobileMenuBottom;
