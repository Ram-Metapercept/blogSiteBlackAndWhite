import React, { Fragment, useState } from "react";

import { Link } from "react-router-dom";
import "./style.css";

const menus = [
  {
    id: 1,
    title: "Home",
    link: "/home",
    submenu: [
      {
        id: 11,
        title: "Home style 1",
        link: "/home",
      },
      {
        id: 12,
        title: "Home style 2",
        link: "/home2",
      },
      {
        id: 13,
        title: "Home style 3",
        link: "/home3",
      },
    ],
  },
  {
    id: 6,
    title: "Pages",
    link: "/blog",
    submenu: [
      {
        id: 61,
        title: "Archive",
        link: "/blog",
      },
      {
        id: 62,
        title: "Contact Us",
        link: "/contact",
      },
      {
        id: 63,
        title: "Shop",
        link: "/shop",
      },
      {
        id: 64,
        title: "Shop Single",
        link: "/product-single/1",
      },
      {
        id: 65,
        title: "Cart",
        link: "/cart",
      },
      {
        id: 66,
        title: "Checkout",
        link: "/checkout",
      },
      {
        id: 67,
        title: "404",
        link: "/404",
      },
      {
        id: 68,
        title: "Login",
        link: "/login",
      },
    ],
  },
  {
    id: 7,
    title: "Lifestyle",
    link: "/lifestyle",
  },
  {
    id: 8,
    title: "Foods",
    link: "/foods",
  },
  {
    id: 9,
    title: "Business",
    link: "/business",
  },
  {
    id: 10,
    title: "Travel",
    link: "/travels",
  },

  {
    id: 5,
    title: "Blog",
    link: "/blog",
    submenu: [
      {
        id: 51,
        title: "Blog",
        link: "/blog",
      },
      {
        id: 52,
        title: "Blog Left sidebar",
        link: "/blog-left",
      },
      {
        id: 53,
        title: "Blog full width",
        link: "/blog-fullwidth",
      },
      {
        id: 54,
        title: "Blog single",
        link: "/blog-single/Visiting-Bethany",
      },
      {
        id: 55,
        title: "Blog single Left sidebar",
        link: "/blog-single-left-sidebar/Visiting-Bethany",
      },
      {
        id: 56,
        title: "Blog single Left sidebar",
        link: "/blog-single-fullwidth/Visiting-Bethany",
      },
    ],
  },
];

const MobileMenu = () => {
  const [openId, setOpenId] = useState(0);
  const [menuActive, setMenuState] = useState(false);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <div>
      <div className={`mobileMenu ${menuActive ? "show" : ""}`}>
        <div className="menu-close">
          <div className="clox" onClick={() => setMenuState(!menuActive)}>
            <i className="ti-close"></i>
          </div>
        </div>

        <ul className="responsivemenu">
          <ul className="nav navbar-nav mb-2 mb-lg-0">
            <li className="menu-item-has-children">
              <Link onClick={ClickHandler} to="/">
                Home
              </Link>
            </li>
            <li className="menu-item-has-children">
              <Link to="https://metapercept.com/services" target="_blank">
                Services
              </Link>
            </li>
            <li>
              <Link
                onClick={ClickHandler}
                to="https://metapercept.com/solutions"
                target="_blank"
              >
                Solutions
              </Link>
            </li>
            <li>
              <Link
                onClick={ClickHandler}
                to="https://metapercept.com/aboutus"
                target="_blank"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                onClick={ClickHandler}
                to="https://metapercept.com/contact"
                target="_blank"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </ul>
      </div>

      <div className="showmenu" onClick={() => setMenuState(!menuActive)}>
        <button type="button" className="navbar-toggler open-btn">
          <span className="icon-bar first-angle"></span>
          <span className="icon-bar middle-angle"></span>
          <span className="icon-bar last-angle"></span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
