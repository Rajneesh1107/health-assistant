import React, { useEffect, useState } from "react";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.avif";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg";

export const HomePage = () => {
  const bannerImg = [banner1, banner2, banner3, banner4, banner5];
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) =>
        prevCount === bannerImg.length - 1 ? 0 : prevCount + 1
      );
    }, 2000);

    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "80%",
          height: "500px",
          paddingTop: "100px",
          margin: "auto",
        }}
      >
        <img
          src={bannerImg[count]}
          alt=""
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
};
