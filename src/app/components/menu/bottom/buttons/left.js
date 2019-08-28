import React from "react";
import "./style.css";

export function MobileMenuBottomButtonLeft({ children, ...props }) {
  return (
    <div {...props} className="mobile-menu-bottom-button-left">
      {children}
    </div>
  );
}
