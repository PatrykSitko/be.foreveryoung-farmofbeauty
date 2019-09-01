import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import SlideToMessageImage from "../../../resources/buttons/messenger.svg";
import "./message.css";

const mapStateToProps = ({
  state: {
    window: {
      outer: { width, height }
    }
  }
}) => {
  return { window: { width, height } };
};

function handleDragEvent(
  containerRef,
  hw,
  vh,
  setImageStyle,
  allowedToTriggerCallEvent,
  setAllowedToTriggerCallEvent,
  event
) {
  const mouse = {
    x:
      event.pageX ||
      (event.nativeEvent.touches && event.nativeEvent.touches[0].pageX),
    y:
      event.pageY ||
      (event.nativeEvent.touches && event.nativeEvent.touches[0].pageY)
  };
  const { left: max, right: min } = ReactDOM.findDOMNode(
    containerRef.current
  ).getBoundingClientRect();
  const border = 2;
  const halfImageWidth = vh <= hw ? vh * 0.07 : hw * 0.07;
  const difference = min - mouse.x;
  let marginLeft = min - difference - max - halfImageWidth - border;
  let paddingRight = min - (mouse.x + halfImageWidth);
  paddingRight = marginLeft < 0 ? paddingRight + -marginLeft : paddingRight;
  if (!allowedToTriggerCallEvent && marginLeft <= 0) {
    setAllowedToTriggerCallEvent(true);
  }
  setImageStyle(
    mouse.x + halfImageWidth < min + border &&
      mouse.x !== 0 && {
        marginLeft: marginLeft > 0 ? marginLeft : 0,
        paddingRight: marginLeft - border < 0 ? paddingRight - border * 2 : 0
      }
  );
}

function SlideToMessageButton({ window: { width: hw, height: vh } }) {
  const containerRef = useRef();
  const buttonRef = useRef();
  const [imageStyle, setImageStyle] = useState();
  const [allowedToTriggerCallEvent, setAllowedToTriggerCallEvent] = useState(
    false
  );

  return (
    <div ref={containerRef} className="slide-to-message-button-container">
      <img
        style={{ ...imageStyle }}
        ref={buttonRef}
        onDrag={handleDragEvent.bind(
          this,
          containerRef,
          hw,
          vh,
          setImageStyle,
          allowedToTriggerCallEvent,
          setAllowedToTriggerCallEvent
        )}
        onDragEnd={() => {
          if (allowedToTriggerCallEvent) {
            setAllowedToTriggerCallEvent(!allowedToTriggerCallEvent);
            alert("hello");
          }
        }}
        onTouchMove={handleDragEvent.bind(
          this,
          containerRef,
          hw,
          vh,
          setImageStyle,
          allowedToTriggerCallEvent,
          setAllowedToTriggerCallEvent
        )}
        onTouchEnd={() => {
          if (allowedToTriggerCallEvent) {
            setAllowedToTriggerCallEvent(!allowedToTriggerCallEvent);
            alert("hello");
          }
          setImageStyle(null);
        }}
        className="slide-to-message-button"
        src={SlideToMessageImage}
        alt="slide to message"
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white"
        }}
      ></div>
    </div>
  );
}

export default connect(mapStateToProps)(SlideToMessageButton);
