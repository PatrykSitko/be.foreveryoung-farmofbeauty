import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import logo from "../../resources/backgrounds/menu/ForeverYoung.svg";
import "./menu.desktop.css";

const REACT_PARAMS = 0;
const CSS_CLASSES = 1;

const triggerChildEvent = (entries, eventType, targetedClassName, e) => {
  const targetClassName = Object.values(e.target)[CSS_CLASSES].className;
  if (
    targetClassName &&
    targetClassName.includes &&
    targetClassName.includes(targetedClassName) &&
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
          if (targetedChild.props && targetedChild.props[eventType]) {
            targetedChild.props[eventType](e);
          }
          break;
        }
      }
      ++currentChild;
    }
  }
};
const mapStateToProps = ({
  state: {
    window: {
      inner: { width }
    }
  }
}) => {
  return { width };
};
function get(entries, entryType) {
  return (
    (entries &&
      [entries]
        .flat(Infinity)
        .filter(entry => entry.type.name === entryType)) ||
    ""
  );
}
export function MenuDesktop({
  onClick: imageOnClick,
  children: entries,
  width
}) {
  const [isClosed, setIsClosed] = useState(false);
  const [desktopMenuLeft, setDesktopMenuLeft] = useState(0);
  const desktopMenuRef = useRef();
  const entriesLeft = get(entries, "MenuEntryDesktopLeft");
  const entriesRight = get(entries, "MenuEntryDesktopRight");
  useEffect(() => {
    const desktopMenuWidth =
      desktopMenuRef &&
      desktopMenuRef.current &&
      ReactDOM.findDOMNode(desktopMenuRef.current).getBoundingClientRect()
        .width;
    const left = desktopMenuWidth && width - desktopMenuWidth;
    if (left !== 0 && left / 2 !== desktopMenuLeft) {
      setDesktopMenuLeft(left / 2);
    }
  }, [desktopMenuRef, desktopMenuLeft, width]);
  return (
    <div
      style={{ left: desktopMenuLeft }}
      ref={desktopMenuRef}
      className="desktop-menu"
    >
      <div
        onClick={triggerChildEvent.bind(
          this,
          entriesLeft,
          "onClick",
          "desktop-menu-left"
        )}
        className={`desktop-menu-left${
          isClosed ? " desktop-menu-left-closed" : ""
        }`}
      >
        {entriesLeft}
      </div>
      <img
        onClick={imageOnClick}
        onMouseDown={() => setIsClosed(true)}
        onMouseUp={() => setIsClosed(false)}
        onMouseLeave={() => setIsClosed(false)}
        className="desktop-menu-logo"
        src={logo}
        alt="Forever Young Farm of Beauty Logo"
      />
      <div
        onClick={triggerChildEvent.bind(
          this,
          entriesRight,
          "onClick",
          "desktop-menu-right"
        )}
        className={`desktop-menu-right${
          isClosed ? " desktop-menu-right-closed" : ""
        }`}
      >
        {entriesRight}
      </div>
    </div>
  );
}
/*
        onClick={() => {
          if (!isClosed) {
            setIsClosed(true);
            setTimeout(()=>setIsClosed(false),1000);
          }
        }}
         */
export default connect(mapStateToProps)(MenuDesktop);
