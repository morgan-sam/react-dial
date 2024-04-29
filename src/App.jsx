import React, { useState, useEffect, useRef } from "react";
import "./styles.scss"; // Import your SCSS file

const Dial = () => {
  const dial = useRef(null);
  const [channel, setChannel] = useState(1);

  useEffect(() => {
    const OFFSET_DEGREES = 180;
    const dial_element = dial.current;
    const needle = dial_element.current.querySelector(".needle");
    let isDragging = false;

    dial_element.current.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;
      document.body.requestPointerLock();
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.exitPointerLock();
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        const deltaY = e.movementY;
        const currentRotation = getRotation(needle);
        const rotation = currentRotation - deltaY;
        setRotation(needle, rotation);
        const channel =
          (getRotation(dial_element.querySelector(".needle")) -
            OFFSET_DEGREES) /
          30;
        setChannel(channel);
      }
    });

    function getRotation(element) {
      const transform = window
        .getComputedStyle(element)
        .getPropertyValue("transform");
      if (transform && transform !== "none") {
        const values = transform.split("(")[1].split(")")[0].split(",");
        const angle = Math.round(
          Math.atan2(values[1], values[0]) * (180 / Math.PI)
        );
        return 360 + angle;
      }
      return 0;
    }

    function setRotation(element, degrees) {
      const rotation = Math.min(
        Math.max(degrees, 30 + OFFSET_DEGREES),
        330 + OFFSET_DEGREES
      );
      element.style.transform = `rotate(${rotation}deg)`;
    }
  }, []);

  return (
    <>
      <h1 class="channel-title" key={channel}>
        Channel: {channel.toFixed(2)}
      </h1>
      <div class="dial" ref={dial}>
        <div class="needle"></div>
        <div class="dial-body"></div>
        <div class="dial-center"></div>
        <div class="levels">
          {[...Array(11).keys()].map((i) => (
            <span class="level">{i + 1}</span>
          ))}
        </div>
        <div class="markings">
          {[...Array(120).keys()].map((i) => (
            <span class="marking"></span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dial;
