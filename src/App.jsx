import React, { useState, useEffect, useRef } from "react";
import "./styles.scss"; // Import your SCSS file

const Dial = ({ onChange }) => {
  const dial = useRef(null);
  const NUMBER_OF_CHANNELS = 11;
  const [rotation, setRotation] = useState(180 + 30);
  const prevRotationRef = useRef(rotation);

  const [channel, setChannel] = useState(1);

  useEffect(() => {
    const OFFSET_DEGREES = 180;
    const dial_element = dial.current;
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
        const previousRotation = prevRotationRef.current;

        const new_rotation = Math.min(
          Math.max(previousRotation - deltaY, 30 + OFFSET_DEGREES),
          330 + OFFSET_DEGREES
        );
        setRotation(new_rotation);
        const channel = (new_rotation - OFFSET_DEGREES) / 30;
        setChannel(channel);
      }
    });
  }, []);

  useEffect(() => {
    // Update the previous rotation value after rotation has been updated
    prevRotationRef.current = rotation;
  }, [rotation]);

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
