import React from "react";

const HeroHeader = ({ backImage, backColor, title }) => {
  return (
    <>
      <style jsx>
        {`
          .bg-panel-glass {
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2),
              inset 0 0 200px rgba(255, 255, 255, 0.3);
            border-radius: 5px;
            position: relative;
            z-index: 1;
            background: #f6f6f629;
            overflow: hidden;
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            padding: 3rem;
          }
          .bg-panel-glass::after {
            border-top-right-radius: 50%;
            content: "";
            display: block;
           height: 120%;
          width: 130%;
           position: absolute;
          left: 0;
           top: -15%;
            transform: translate(-100%, 75%) rotate(0deg);
            transform-origin: bottom left;
           transition: 0.5s transform ease-out;
          z-index: -1;
           background-color: #324DA0;
         }
           .bg-panel-glass:hover::after {
           transform: translate(0, 0);
            transition: 0.2s transform ease-out;
           }
            .bg-panel-glass:hover .breadcrumb__title, .bg-panel-glass:hover .tp-section p {
              color: white;
           }
         .bannerText p {
           display: -webkit-box;
           -webkit-box-orient: vertical;
           -webkit-line-clamp: 4;
           overflow: hidden;
           text-align: justify;
         }
          .breadcrumb__area {
            padding-top: 100px;
            padding-bottom: 100px;
          }
          @media (max-width: 425px) {
            .breadcrumb__area {
            padding-top: 80px;
            padding-bottom: 80px;
          }
          .bg-panel-glass{
            padding: 3rem 2rem;
          }
        `}
      </style>
      <div
        className="breadcrumb__area theme-bg"
        style={{
          backgroundImage: `url(${backImage})`,
          backgroundColor: backColor,
          backgroundPosition: "right top",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content p-relative z-index-1">
                <div className="col-md-8 col-xl-6 col-sm-12 bg-panel-glass side-content">
                  <h3
                    className="breadcrumb__title"
                    style={{ fontWeight: "500" }}
                  >
                    {title}
                  </h3>
                  <div className="tp-section bannerText">
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cumque excepturi vel reiciendis inventore recusandae?
                      Debitis aliquid autem amet praesentium exercitationem eius
                      quae sunt porro id.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroHeader;
