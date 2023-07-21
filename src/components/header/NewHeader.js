import React from "react";
import { Link } from "react-router-dom";
import NavMenu from "./nav-menu-new";
import Logo1 from "../../images/Metapercept_footer_logo2.svg";
import Sidebar from "./sidebar-new";
import "../../css/mainHeader.css";
import { useState } from "react";
import { useEffect } from "react";

const useSticky = () => {
  const [sticky, setSticky] = useState(false);

  const stickyHeader = () => {
    if (window.scrollY > 200) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", stickyHeader);
  }, []);

  return {
    sticky,
  };
};

const NewHeader = (style_home_one) => {
  const { sticky } = useSticky();
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <header>
        <div
          className={`${
            style_home_one ? "" : "tp-header__1 theme-bg p-relative"
          }`}
        >
          <div
            id="header-sticky"
            className={`tp-header__1-main header-border-button pl-105 pr-105  ${
              sticky ? "header-sticky" : ""
            }`}
          >
            <div className="container-fluid">
              <div className="mega-menu-wrapper">
                <div className="row align-items-center">
                  {/* <div className="col-xxl-3 col-xl-3 col-6"> */}
                  <div className="col-xxl-3 col-xl-2 col-6">
                    <div className="logo border-right">
                      <Link to="/">
                        <img
                          src={Logo1}
                          alt="logo"
                          style={{ maxWidth: "200px", minWidth: "150px" }}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="col-xxl-6 col-xl-7 d-none d-xl-flex justify-content-center">
                    <div className="main-menu p-relative">
                      <nav id="mobile-menu">
                        <NavMenu />
                      </nav>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-md-6 col-6">
                    <div className="tp-header__1-right d-flex justify-content-end align-items-center">
                      <div className="header-mail-info  d-xl-block">
                        <a
                          href="mailto:info@metapercept.com"
                          style={{
                            textTransform: "lowercase",
                            fontSize: "18px",
                            color: "#000",
                          }}
                        >
                          <i className="fas fa-envelope-open "></i>
                          info@metapercept.com
                        </a>
                      </div>

                      <div className="tp-header-search-nav d-flex justify-content-end d-xl-none">
                        <div
                          className="tp-header-nav"
                          onClick={() => setIsActive(true)}
                        >
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar isActive={isActive} setIsActive={setIsActive} />
    </>
  );
};

export default NewHeader;
