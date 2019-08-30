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

function SlideToMessageButton({ window: { width: hw, height: vh } }) {
  const containerRef = useRef();
  const buttonRef = useRef();
  const [imageStyle, setImageStyle] = useState();
  const [initialImageBounds, setInitialImageBounds] = useState(null);
  return (
    <div ref={containerRef} className="slide-to-message-button-container">
      <img
        style={{ ...imageStyle }}
        ref={buttonRef}
        onDrag={e => {
          const { left, right, top, bottom } = ReactDOM.findDOMNode(
            buttonRef.current
          ).getBoundingClientRect();
          if (!initialImageBounds) {
            setInitialImageBounds({ left, right, top, bottom });
          }
          const mouse = { x: e.pageX, y: e.pageY };
          const { left: max, right: min } = ReactDOM.findDOMNode(
            containerRef.current
          ).getBoundingClientRect();
          const halfImageWidth = vh <= hw ? vh * 0.07 : hw * 0.07;
          const difference = min - mouse.x;
          let marginLeft = min - difference - max - halfImageWidth - 2;
          let paddingRight = min - (mouse.x + halfImageWidth);
          paddingRight =
            marginLeft < 0 ? paddingRight + -marginLeft : paddingRight;
          if (
            initialImageBounds &&
            mouse.x - halfImageWidth < initialImageBounds.left &&
            mouse.x - halfImageWidth + 3 > max
          ) {
            setImageStyle({ marginLeft, paddingRight });
          }
        }}
        onDragEnd={() => {
          setImageStyle(null);
        }}
        className="slide-to-message-button"
        src={SlideToMessageImage}
        alt="slide to message"
      />
    </div>
  );
}

export default connect(mapStateToProps)(SlideToMessageButton);