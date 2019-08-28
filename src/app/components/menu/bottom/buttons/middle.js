import React from "react";
import "./style.css";

export function MobileMenuBottomButtonMiddle({ children, ...props }) {
  return (
    <div {...props} className="mobile-menu-bottom-button-middle">
      {children}
    </div>
  );
}
