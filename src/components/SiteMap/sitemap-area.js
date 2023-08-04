import React from "react";
import { sitemap_data } from "./sitemap-data"
import {Link} from "react-router-dom";
import "./siteMap.css"
function SitemapArea() {
  return (
    <>
      <style jsx="true">
        {`
          .marker-list-site li::after {
            position: absolute;
            content: "✓";
            left: 0;
            top: 3px;
            font-family: themify;
            color: #0c54ad;
            font-weight: 700;
          }
        `}
      </style>
      <div className="tp-job-details pt-50 pb-50 tpfadeUp">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-7">
              <div className="section-head text-black">
                <h2
                  className="tp-section__title mb-25"
                  // style={{ fontWeight: 700, color: "black" }}
                >
                  Pages
              
                </h2>
                
                <ul className="list-arrow marker-list-site">
                  {sitemap_data.map((data, i) => {
                    return (
                      <li className="position-relative pl-20" key={i}>
                        <h5 className="sitemap-links">
                          <Link to={data.link}>{data.title}</Link>
                        </h5>
                        {data.subMenu && (
                          <ul className="list-arrow ml-25 marker-list-site">
                            {data.subMenu.map((subMenuData, i) => {
                              const isUrl =
                                subMenuData.link.startsWith("https://");
                              const targetAttr = isUrl ? `"_blank"` : "";
                              return (
                                <li className="position-relative pl-20" key={i}>
                                  <h5 className="sitemap-links">
                                    <Link
                                      to={subMenuData.link}
                                      target={targetAttr}
                                    >
                                      {subMenuData.title}
                                    </Link>
                                  </h5>
                                  {subMenuData.subMenu && (
                                    <ul className="list-arrow ml-25 marker-list-site">
                                      {subMenuData.subMenu.map(
                                        (subMenuData, i) => {
                                          const isUrl =
                                            subMenuData.link.startsWith(
                                              "https://"
                                            );
                                          const targetAttr = isUrl
                                            ? `"_blank"`
                                            : "";
                                          return (
                                            <li
                                              className="position-relative pl-20"
                                              key={i}
                                            >
                                              <h5 className="sitemap-links">
                                                <Link
                                                  to={subMenuData.link}
                                                  target={targetAttr}
                                                >
                                                  {subMenuData.title}
                                                </Link>
                                              </h5>
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>

             
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SitemapArea;
