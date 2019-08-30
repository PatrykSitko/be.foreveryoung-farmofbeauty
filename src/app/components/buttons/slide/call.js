import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import callButtonImage from "../../../resources/buttons/call-button.svg";
import "./call.css";

const IMAGE_WIDTH = "14vmin";

const triggerCallEvent = () => {
  const CALL_EVENT_TRIGGER = document.createElement("a");
  CALL_EVENT_TRIGGER.href = "tel:+32465782853";
  CALL_EVENT_TRIGGER.click();
};
const mapStateToProps = ({
  state: {
    window: {
      inner: { width, height }
    }
  }
}) => {
  return { window: { width, height } };
};
const handleDragEvent = (
  containerRef,
  setImagePosition,
  setAllowedToTriggerCallEvent,
  hw,
  vh,
  event
) => {
  function determine(x, hw, vh) {
    return x > hw / 2 - (vh <= hw ? vh * 0.15 : hw * 0.15) - 3
      ? hw / 2 - (vh <= hw ? vh * 0.15 : hw * 0.15) - 3
      : x;
  }
  const container = ReactDOM.findDOMNode(
    containerRef.current
  ).getBoundingClientRect();
  let x =
    event.pageX ||
    (event.nativeEvent.touches && event.nativeEvent.touches[0].pageX) ||
    0;
  let prevX = x;
  x = determine(x, hw, vh);
  setImagePosition({
    x,
    y: container.y
  });
  if (x !== prevX) {
    setAllowedToTriggerCallEvent(true);
  }
};
function SlideToCallButton({ window: { width: hw, height: vh } }) {
  const containerRef = useRef();
  const [imagePosition, setImagePosition] = useState(null);
  const [allowedToTriggerCallEvent, setAllowedToTriggerCallEvent] = useState(
    false
  );
  return (
    <div ref={containerRef} className="slide-to-call-button-container">
      <img
        style={
          imagePosition
            ? {
                top: imagePosition.y,
                paddingLeft: `calc(${imagePosition.x}px - ${IMAGE_WIDTH} / 2)`
              }
            : {}
        }
        onTouchMove={handleDragEvent.bind(
          this,
          containerRef,
          setImagePosition,
          setAllowedToTriggerCallEvent,
          hw,
          vh
        )}
        onTouchEnd={() => {
          setImagePosition({ x: 0, y: imagePosition.y });
          if (allowedToTriggerCallEvent) {
            setAllowedToTriggerCallEvent(false);
            triggerCallEvent();
          }
        }}
        onDrag={handleDragEvent.bind(
          this,
          containerRef,
          setImagePosition,
          setAllowedToTriggerCallEvent,
          hw,
          vh
        )}
        onDragEnd={() => {
          setImagePosition({ x: 0, y: imagePosition.y });
          if (allowedToTriggerCallEvent) {
            setAllowedToTriggerCallEvent(false);
            triggerCallEvent();
          }
        }}
        src={callButtonImage}
        alt="call button"
        className="slide-to-call-button"
      />
    </div>
  );
}
export default connect(mapStateToProps)(SlideToCallButton);
