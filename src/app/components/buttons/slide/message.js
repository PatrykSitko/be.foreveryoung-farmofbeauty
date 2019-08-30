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

function handleDragEvent(containerRef, hw, vh, setImageStyle, e) {
  const mouse = {
    x: e.pageX || (e.nativeEvent.touches && e.nativeEvent.touches[0].pageX),
    y: e.pageY || (e.nativeEvent.touches && e.nativeEvent.touches[0].pageY)
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
  setImageStyle(
    mouse.x + halfImageWidth < min + border &&
      mouse.x !== 0 && {
        marginLeft: marginLeft > 0 ? marginLeft : 0,
        paddingRight
      }
  );
}
function SlideToMessageButton({ window: { width: hw, height: vh } }) {
  const containerRef = useRef();
  const buttonRef = useRef();
  const [imageStyle, setImageStyle] = useState();

  return (
    <div ref={containerRef} className="slide-to-message-button-container">
      <img
        style={{ ...imageStyle }}
        ref={buttonRef}
        onDrag={handleDragEvent.bind(this, containerRef, hw, vh, setImageStyle)}
        onDragEnd={() => {
          setImageStyle(null);
        }}
        onTouchMove={handleDragEvent.bind(
          this,
          containerRef,
          hw,
          vh,
          setImageStyle
        )}
        onTouchEnd={() => {
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
