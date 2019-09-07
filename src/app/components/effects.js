import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export function useMouseEnteredTracker(mouse, ref) {
  const [mouseEntered, setMouseEntered] = useState(false);
  useEffect(() => {
    const elementRect =
      ref &&
      ref.current &&
      ReactDOM.findDOMNode(ref.current).getBoundingClientRect();
    if (
      elementRect &&
      mouse &&
      mouse.move &&
      mouse.move.pageX &&
      mouse.move.pageY
    ) {
      const { pageX: x, pageY: y } = mouse.move;
      const { left, right, top, bottom } = elementRect;
      if (x > left && x < right && y > top && y < bottom) {
        if (!mouseEntered) {
          setMouseEntered(true);
        }
      } else if (mouseEntered) {
        setMouseEntered(false);
      }
    }
  }, [ref, mouse, mouseEntered, setMouseEntered]);
  return mouseEntered;
}

export function useMouseDownTracker(mouse, ref) {
  const mouseEntered = useMouseEnteredTracker(mouse, ref);
  const [mouseClicked, setMouseClicked] = useState(false);
  useEffect(() => {
    if (mouseEntered) {
      if (mouse.down && !mouseClicked) {
        setMouseClicked(true);
      } else if (mouseClicked && !mouse.down) {
        setMouseClicked(false);
      }
    } else if (mouseClicked) {
      setMouseClicked(false);
    }
  }, [mouse, mouseEntered, mouseClicked, setMouseClicked]);
  return mouseClicked;
}
