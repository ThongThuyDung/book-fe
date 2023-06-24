import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  
  <div className="not-found flex-column justify-content-center align-items-center">
  
    <img
      src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
      alt="not-found"
      style={{
        height: "500px",
        width: "100vw",
      }}
    />
    <Link to="/" className="link-home">
      Go Home
    </Link>
  </div>
);

export default NotFound;
