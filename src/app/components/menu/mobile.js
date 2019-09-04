import React, { useState } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import "./menu.mobile.css";
import "../animations.css";
import "./menu.theme.female.css";
import "./menu.theme.male.css";
import "./menu.theme.neutral.css";

const REACT_PARAMS = 0;
const CSS_CLASSES = 1;
const MapStateToProps = ({
  state: {
    user: { gender }
  }
}) => {
  return { user: { gender } };
};
const handleMobileMenuButtonEvent = (
  mobileMenuHidden,
  setMobileMenuHidden,
  mobileMenuButtonSpinClass,
  setMobileMenuButtonSpinClass,
  mobileMenuButtonActiveClass,
  setMobileMenuButtonActiveClass
) => {
  setMobileMenuButtonSpinClass(
    mobileMenuButtonSpinClass === null ||
      mobileMenuButtonSpinClass !== "spin-right-fast"
      ? "spin-right-fast"
      : "spin-left-fast"
  );
  setMobileMenuHidden(mobileMenuHidden === null ? false : !mobileMenuHidden);
  setMobileMenuButtonActiveClass(
    mobileMenuButtonActiveClass === ""
      ? `mobile-menu-button-active menu-button-active`
      : ""
  );
};
const triggerChildOnClickEvent = (
  entries,
  mobileMenuHidden,
  setMobileMenuHidden,
  mobileMenuButtonSpinClass,
  setMobileMenuButtonSpinClass,
  mobileMenuButtonActiveClass,
  setMobileMenuButtonActiveClass,
  e
) => {
  const targetClassName = Object.values(e.target)[CSS_CLASSES].className;
  if (
    targetClassName &&
    targetClassName.includes &&
    targetClassName.includes("mobile-menu-entry-wrapper") &&
    e.target.children
  ) {
    let currentChild = 0;
    for (let child of e.target.children) {
      const childParams = Object.values(child)[REACT_PARAMS];
      if (childParams.ref && childParams.ref.current) {
        const childCurrentRef = childParams.ref.current;
        const childBoundingRect = ReactDOM.findDOMNode(
          childCurrentRef
        ).getBoundingClientRect();
        if (
          e.pageX >= childBoundingRect.left &&
          e.pageX <= childBoundingRect.right &&
          e.pageY >= childBoundingRect.top &&
          e.pageY <= childBoundingRect.bottom
        ) {
          const targetedChild = [entries].flat(Infinity)[currentChild];
          if (!targetedChild) {
            continue;
          }
          if (targetedChild.props && targetedChild.props.onClick) {
            targetedChild.props.onClick(e);
          }
          if (!targetedChild.props.noMenuHandler) {
            handleMobileMenuButtonEvent(
              mobileMenuHidden,
              setMobileMenuHidden,
              mobileMenuButtonSpinClass,
              setMobileMenuButtonSpinClass,
              mobileMenuButtonActiveClass,
              setMobileMenuButtonActiveClass
            );
          }
          break;
        }
      }
      ++currentChild;
    }
  }
};

function MobileMenu({ user, children: entries }) {
  const [mobileMenuHidden, setMobileMenuHidden] = useState(null);
  const [mobileMenuButtonSpinClass, setMobileMenuButtonSpinClass] = useState(
    null
  );
  const [
    mobileMenuButtonActiveClass,
    setMobileMenuButtonActiveClass
  ] = useState("");
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
  return [
    <div
      key="mobile-menu-button-background"
      className={`mobile-menu-shared menu-shared${currentTheme} mobile-menu-button-background menu-button-background${currentTheme} ${
        mobileMenuHidden || mobileMenuHidden === null
          ? ""
          : `mobile-menu-button-background-active menu-button-background-active${currentTheme}`
      } ${mobileMenuButtonSpinClass || ""}`}
    />,
    <div
      key="mobile-menu-button"
      className={`mobile-menu-shared menu-shared${currentTheme} mobile-menu-button menu-button${currentTheme} ${mobileMenuButtonSpinClass ||
        ""} ${mobileMenuButtonActiveClass}${currentTheme}`}
      onClick={handleMobileMenuButtonEvent.bind(
        this,
        mobileMenuHidden,
        setMobileMenuHidden,
        mobileMenuButtonSpinClass,
        setMobileMenuButtonSpinClass,
        mobileMenuButtonActiveClass,
        setMobileMenuButtonActiveClass
      )}
    />,
    <div
      key="mobile-menu"
      className={`mobile-menu-shared menu-shared${currentTheme} mobile-menu menu${currentTheme} ${
        mobileMenuHidden
          ? `mobile-menu-shrinked menu-shrinked${currentTheme}`
          : mobileMenuHidden !== null
          ? `mobile-menu-expanded menu-expanded${currentTheme}`
          : `mobile-menu-initial menu-initial${currentTheme}`
      }`}
    >
      <div
        className={`mobile-menu-entry-wrapper menu-entry-wrapper${currentTheme}`}
        onClick={triggerChildOnClickEvent.bind(
          this,
          entries,
          mobileMenuHidden,
          setMobileMenuHidden,
          mobileMenuButtonSpinClass,
          setMobileMenuButtonSpinClass,
          mobileMenuButtonActiveClass,
          setMobileMenuButtonActiveClass
        )}
      >
        {entries &&
          [entries].flat(Infinity).map((entry, index) => {
            return React.cloneElement(entry, {
              key: index,
              mobileMenuHidden,
              handleMobileMenuOnClick: handleMobileMenuButtonEvent.bind(
                this,
                mobileMenuHidden,
                setMobileMenuHidden,
                mobileMenuButtonSpinClass,
                setMobileMenuButtonSpinClass,
                mobileMenuButtonActiveClass,
                setMobileMenuButtonActiveClass
              )
            });
          })}
      </div>
      <div
        className={`mobile-menu-entry-wrapper-background menu-entry-wrapper-background${currentTheme}`}
      />
    </div>,
    <div
      key="mobile-menu-background"
      className={mobileMenuBackgroundClass(mobileMenuHidden, currentTheme)}
    />
  ];
}

function mobileMenuBackgroundClass(mobileMenuHidden, currentTheme) {
  return `mobile-menu-shared menu-shared${currentTheme} mobile-menu-background menu-background${currentTheme}${
    mobileMenuHidden
      ? ` mobile-menu-shrinked menu-shrinked${currentTheme}`
      : mobileMenuHidden !== null
      ? ` mobile-menu-expanded menu-expanded${currentTheme}`
      : `mobile-menu-initial menu-initial${currentTheme}`
  }`;
}
export default connect(MapStateToProps)(MobileMenu);
