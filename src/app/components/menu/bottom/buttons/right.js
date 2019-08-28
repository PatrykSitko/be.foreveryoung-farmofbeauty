import React from "react";
import "./style.css";

export function MobileMenuBottomButtonRight({ children, ...props }) {
  return (
    <div {...props} className="mobile-menu-bottom-button-right">
      {children}
    </div>
  );
}
