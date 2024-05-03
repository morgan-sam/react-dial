import React, { useState, useEffect, useRef } from "react";
import "./styles.scss"; // Import your SCSS file

const Dial = ({ onChange }) => {
  const dial = useRef(null);
  const NUMBER_OF_CHANNELS = 11;
  const [rotation, setRotation] = useState(180 + 30);
  const [channel, setChannel] = useState(1);

  useEffect(() => {
    const OFFSET_DEGREES = 180;
    const dial_element = dial.current;
    const needle = dial_element.querySelector(".needle");
    let isDragging = false;

    dial_element.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;
      document.body.requestPointerLock();
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.exitPointerLock();
    });

    document.addEventListener("mousemove", (e) => {
      e.preventDefault();
      if (isDragging) {
        const deltaY = e.movementY;
        const currentRotation = getRotation(needle);
        const new_rotation = Math.min(
          Math.max(currentRotation - deltaY, 30 + OFFSET_DEGREES),
          330 + OFFSET_DEGREES
        );
        setRotation(new_rotation);
        const channel = (new_rotation - OFFSET_DEGREES) / 30;
        setChannel(channel);
      }
    });

    // replace with reactive state
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
  }, []);

  return (
    <>
      <h1 className="channel-title" key={channel}>
        {`${channel < 10 ? "0" : ""}` + channel.toFixed(2)}
      </h1>
      <div className="dial" ref={dial}>
        <div
          className="needle"
          style={{ transform: `rotate(${rotation}deg` }}
        ></div>
        <div className="dial-body">
          <div
            className="markings"
            style={{ transform: `rotate(${rotation}deg` }}
          >
            {[...Array(60).keys()].map((i) => (
              <span className="marking" key={i}></span>
            ))}
          </div>
        </div>
        <div className="dial-center"></div>
        <div className="levels">
          {[...Array(NUMBER_OF_CHANNELS).keys()].map((i) => (
            <span className="level" key={i}>
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dial;
