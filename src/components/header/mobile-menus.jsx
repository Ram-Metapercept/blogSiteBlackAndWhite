import React, { useEffect, useState } from "react";
// import menu_data from "./menu-data";
import menu_data from "./menu-data-new";
import { Link } from "react-router-dom";

const MobileMenus = () => {
  const [subMenu, setSubMenu] = useState("");
  const [navTitle, setNavTitle] = useState("");

  const openMobileMenu = (menu) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };

  const openSubMobileMenu = (s_menu) => {
    if (subMenu === s_menu) {
      setSubMenu("");
    } else {
      setSubMenu(s_menu);
    }
  };
  useEffect(() => {
    // Get the element
    var elem = document.querySelector("#google_translate_element");
    console.log(elem.style.display);
    console.log(getComputedStyle(elem).display);
    if (getComputedStyle(elem).display === "none") {
      elem.className = "d-block";
      elem.style.position = "static";
      elem.style.margin = "0  0 20px 0px";
      console.log("added");
      document.querySelector("#google_translate_element2").appendChild(elem);
    }
  }, []);
  return (
    <>
    <div id="google_translate_element2" className=""></div>

    <nav className="mean-nav">
      <ul>
        {menu_data?.map((menu, i) => (
          <React.Fragment key={i}>
            {!menu?.has_dropdown && (
              <li>
                <Link to={menu?.link}>{menu?.title}</Link>
              </li>
            )}

            {menu.has_dropdown && !menu.mega_menu && (
              <li className="has-dropdown">
                <Link to={menu.link}>{menu.title}</Link>
                <ul
                  className="submenu"
                  style={{
                    display: navTitle === menu.title ? "block" : "none",
                  }}
                >
                  {menu.sub_menus.map((sub, i) => (
                    <li key={i}>
                      <Link to={sub.link}>{sub.title}</Link>
                    </li>
                  ))}
                </ul>
                <span
                  className={`mean-expand ${
                    navTitle === menu.title ? "mean-clicked" : ""
                  }`}
                  onClick={() => openMobileMenu(menu.title)}
                  style={{
                    fontSize: "18px",
                    cursor: "pointer",
                    backgroundColor: "rgb(44,68,142)",
                  }}
                >
                  <i className="fal fa-plus"></i>
                </span>
              </li>
            )}

            {menu.mega_menu && (
              <li className="has-dropdown has-mega-menu">
                <Link to={menu.link}>{menu.title}</Link>
                <ul
                  className="mega-menu"
                  style={{
                    display: navTitle === menu.title ? "block" : "none",
                  }}
                >
                  {menu.mega_menus.map((mega_m, i) => (
                    <li key={i}>
                      <Link to={mega_m.link} className="mega-menu-title">
                        {mega_m.title}
                      </Link>

                      <ul
                        style={{
                          display: subMenu === mega_m.title ? "block" : "none",
                        }}
                      >
                        {mega_m.layout.map((sub_m, i) => (
                          <li key={i}>
                            <Link href={sub_m.link}>{sub_m.title}</Link>
                          </li>
                        ))}
                      </ul>

                      <Link
                        className={`mean-expand ${
                          subMenu === mega_m.title ? "mean-clicked" : ""
                        }`}
                        onClick={() => openSubMobileMenu(mega_m.title)}
                        style={{ fontSize: "18px", cursor: "pointer" }}
                      >
                        <i className="fal fa-plus"></i>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  className={`mean-expand ${
                    navTitle === menu.title ? "mean-clicked" : ""
                  }`}
                  onClick={() => openMobileMenu(menu.title)}
                  style={{ fontSize: "18px", cursor: "pointer" }}
                >
                  <i className="fal fa-plus"></i>
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
    </>
  );
};

export default MobileMenus;
