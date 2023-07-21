import React from "react";
import { Link } from "react-router-dom";
import error from "../../images/404.jpg";

const Error = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };
  return (
    <>
      <div className="container">
        <div className="error_page">
          <img style={{ width: "100%" }} src={error} alt="error" />
          <Link href="/" style={{ display: "flex", justifyContent: "center" }}>
   
            <Link onClick={ClickHandler} to="/home" className="theme-btn">
              {" "}
              Go to home
            </Link>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
