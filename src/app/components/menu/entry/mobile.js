import React, { useRef } from "react";
import { connect } from "react-redux";
import "./entry.mobile.css";
import "./entry.mobile.theme.female.css";
import "./entry.mobile.theme.male.css";
import "./entry.mobile.theme.neutral.css";

const MapStateToProps = ({
  state: {
    user: { gender }
  }
}) => {
  return { user: { gender } };
};
const handleOnClick = (
  onClick,
  handleMobileMenuOnClick,
  noMenuHandler,
  event
) => {
  if (onClick) {
    onClick(event);
  }
  if (handleMobileMenuOnClick && !noMenuHandler) {
    handleMobileMenuOnClick(event);
  }
};

function MenuEntryMobile({
  user,
  image,
  children,
  onClick,
  mobileMenuHidden,
  handleMobileMenuOnClick,
  noMenuHandler,
  separator,
  className,
  dispatch,
  ...props
}) {
  const themes = {
    female: "-female-theme",
    male: "-male-theme",
    neutral: "-neutral-theme"
  };
  const gender = user.gender;
  const currentTheme =
    gender === "female"
      ? themes.female
      : gender === "male"
      ? themes.male
      : themes.neutral;
  const ref = useRef();
  return (
    <div
      {...{ ...props, ref }}
      onClick={handleOnClick.bind(
        this,
        onClick,
        handleMobileMenuOnClick,
        noMenuHandler
      )}
      className={`mobile-menu-entry menu-entry${currentTheme} ${
        mobileMenuHidden
          ? `mobile-menu-entry-shrinked menu-entry-shrinked${currentTheme}`
          : mobileMenuHidden !== null
          ? ` mobile-menu-entry-expanded menu-entry-expanded${currentTheme}`
          : ` mobile-menu-entry-shrinked menu-entry-shrinked${currentTheme}`
      }${
        separator ? ` mobile-menu-separator menu-separator${currentTheme}` : ""
      }${className ? " " + className : ""}`}
    >
      {image
        ? [
            <div
              key="mobile-menu-entry-left"
              className="mobile-menu-entry-left"
            >
              {children}
            </div>,
            <img
              key="mobile-menu-entry-right"
              className="mobile-menu-entry-right"
              src={image}
              alt="test"
            />
          ]
        : children}
    </div>
  );
}

export default connect(MapStateToProps)(MenuEntryMobile);
