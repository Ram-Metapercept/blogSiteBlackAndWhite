import SocialLinks from "./social-links-new";
import Logo1 from "../../images/Metapercept_footer_logo2.svg";

import React from "react";
import CommonFooter, { FooterCopyRight } from "./common-footer-new";

import { Link } from "react-router-dom";

const SubscribeEmailValidation = (e) => {
  let value = e.target.value;
  const errorMessage = document.getElementById("errorSubscribeEmail");
  const emailRegex = "^[A-Za-z0-9_]{3,}@[A-za-z]{3,}[.]{1}[A-Za-z.]{2,6}$";

  errorMessage.style.display = "block";
  if (value < 1) {
    errorMessage.innerHTML = "Please provide a email id";
    errorMessage.style.display = "none";
  } else if (!value.match(emailRegex)) {
    errorMessage.innerHTML = "Please provide a valid email id";
  } else {
    errorMessage.style.display = "none";
  }
};

const clearError = (e) => {
  // console.log(e)
  const removeError = document.getElementById(e);
  removeError.style.display = "none";
};
// footer_links data

const footer_content = {
  footer_logo: Logo1,
  about: "About Us",
  about_des: (
    <>
      Are you looking for professional information technology services and
      solutions in software development or technical writing? Connect with us
      today.
    </>
  ),
  phone_icon: "/assets/img/footer/call-icon.png",
  address: (
    <>
      Office Number 4080, <br /> Marvel Fuego, <br /> Magarpatta Road, <br />{" "}
      Pune Maharashtra, India
    </>
  ),
  phone: <>+91-(839)-090-5726</>,
  tel: "8390905726",
};

const { footer_logo, about, about_des } = footer_content;

const Footer = ({ tp_border }) => {
  const isFormValid = (e) => {
    console.log("in valid form");
    const ErrorMsg = document.getElementsByClassName("errorMessage");
    let count = 0;
    for (let ele of ErrorMsg) {
      if (ele.style.display === "block") count++;
    }
    if (count) {
      e.preventDefault();
    }
    return count ? false : true;
  };

  return (
    <>
      <style jsx>
        {`
          .errorMessage {
            display: none;
            margin: 10px 0 0 0;
            color: red;
          }
          .tp-footer-from form button {
            background-color: rgb(50, 77, 160);
          }
          .tp-footer-from form button:hover {
            background-color: rgb(108, 96, 254);
          }
          @media (max-width: 768px) {
            .footerContent {
              text-align: center;
            }
            .subscribeDiv {
              padding-right: 0;
            }
            .offc-top-pattern img,
            .offc-bottom-pattern img,
            .tp-offcanvas__logo a img,
            .bs-footer__top-logo a img {
              width: 100%;
            }
          }
        `}
      </style>

      <footer>
        <div
          className={`bs-footer ${tp_border && "tp-border-top"}`}
          style={{ backgroundColor: "rgb(248,252,252)" }}
        >
          <div className="container">
            <div className="bs-footer__top fotter-btn-bottom pt-50 pb-40 d-md-block">
              <div className="row align-items-center">
                <div className="col-12 pb-20 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start">
                  <div className="bs-footer__top-logo">
                    <Link href="/">
                      <img src={footer_logo} alt="brand-logo" />
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-md-6 text-md-end d-flex align-items-center justify-content-center justify-content-md-end">
                  <div className="bs-footer__top-social">
                    <SocialLinks />
                  </div>
                </div>
              </div>
            </div>
            <div className="bs-footer__main pb-10 pt-50 tp-border-bottom footerContent">
              <div className="row justify-content-center">
                <div className="col-xl-4 col-md-6">
                  <div className="tp-footer__widget mb-40">
                    <h3 className="tp-footer__widget-title mb-35">{about}</h3>
                    <p className="pr-40" style={{ textAlign: "justify" }}>
                      {about_des}
                    </p>
                  </div>

                  <div className="tp-footer__widget pr-40 mb-40 subscribeDiv">
                    <h3 className="tp-footer__widget-title mb-15">
                      Subscribe Now
                    </h3>

                    <div className="tp-footer-from p-relative">
                      <form
                        method="post"
                        action="https://ea7cf473.sibforms.com/serve/MUIFAHlj8FMTEajUXnHHmpV-yj2s937Twuev74LN2CfwE6MMj2Kss3SaAmUWkGvPKRUB99qd1RfJZFbLpn5JIvbtTN5w5EYtOGU5SXqzNjgTrY_BiCxRB5ve408X2PJ61BwmTB7Waehutu0pIO38TlBINyZDbr2Phyms9ynJcu7M_A6wzReQ-OIbOS8iP79iiW7iODjJ2vLw4d8k"
                        onSubmit={isFormValid}
                      >
                        <span>
                          <i className="fas fa-envelope-open"></i>
                        </span>
                        <input
                          type="email"
                          placeholder="Enter your mail"
                          id="EMAIL"
                          name="EMAIL"
                          autoComplete="off"
                          required
                          data-required="true"
                          onBlur={SubscribeEmailValidation}
                          onFocus={() => clearError("errorSubscribeEmail")}
                        />
                        <button type="submit" aria-label="subscribe">
                          <i className="fas fa-paper-plane"></i>
                        </button>
                      </form>
                    </div>
                    <p
                      className="errorMessage"
                      id="errorSubscribeEmail"
                      style={{ color: "red" }}
                    >
                      error div
                    </p>
                    <p className="tp-form-note p-0 mt-5 mb-30"></p>
                  </div>
                </div>

                <CommonFooter />

                <div className="col-xl-3 col-md-6">
                  <div className="tp-footer__widget  mb-40">
                    <h3 className="tp-footer__widget-title mb-35">
                      Contact Details
                    </h3>
                    <p
                      style={{ color: "rgb(12,84,173)", marginBottom: "10px" }}
                    >
                      Contact Numbers
                    </p>
                    <ul>
                      <li>
                        <a href="tel:8390905726">
                          <strong>Consulting:</strong> +91-(839)-090-5726
                        </a>
                      </li>
                      <li>
                        <a href="tel:8173820346">
                          <strong>Sales:</strong> +1-(817) 382-0346
                        </a>
                      </li>
                      <li>
                        <a href="tel:9860800135">
                          <strong>Training:</strong> +91-986-080-0135
                        </a>
                      </li>
                      <li>
                        <a href="tel:02041291914">
                          <strong>Main Line:</strong> +91-(020)-4129-1914
                        </a>
                      </li>
                    </ul>
                    <p
                      style={{
                        color: "rgb(12,84,173)",
                        marginBottom: "10px",
                      }}
                    >
                      Emails
                    </p>
                    <ul>
                      <li>
                        <a href="mailto:sales@metapercept.com">
                          sales@metapercept.com
                        </a>
                      </li>
                      <li>
                        <a href="mailto:info@metapercept.com">
                          info@metapercept.com
                        </a>
                      </li>
                      <li>
                        <a href="mailto:training@metapercept.com">
                          training@metapercept.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6">
                  <div className="tp-footer__widget  mb-40 locationDiv">
                    <h3 className="tp-footer__widget-title mb-35">Location</h3>

                    <div className="tp-footer-cta d-flex align-items-center justify-content-center justify-content-md-start">
                      <span className="call-icon">
                        {/* <img src={phone_icon} alt="" /> */}
                        <i
                          className="fa-solid fa-location-dot mr-20"
                          style={{ color: "rgb(12,84,173)", fontSize: "2rem" }}
                        ></i>
                      </span>
                      <span>
                        <span
                          className="d-block mb-0"
                          style={{
                            color: "rgb(119, 119, 119)",
                            fontSize: "16px",
                          }}
                        >
                          <div>
                            <strong>India:</strong> Pune, Maharashtra, India
                          </div>
                          <div>
                            <strong>USA:</strong> Arlington, Texas, USA
                          </div>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* footer copy right start */}
            <FooterCopyRight />
            {/* footer copy right end */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
