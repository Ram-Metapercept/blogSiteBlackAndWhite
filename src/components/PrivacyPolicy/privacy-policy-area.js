import React from "react";
import {
  privacy_policy_content,
  sale_of_personal_information,
  purpose_for_collecting_information,
  title_description_part_1,
  other_uses_and_disclosures,
  title_description_part_2,
  california_residents,
  questions_and_comments,
} from "./privacy-policy-data";

const { date, overview, mainType } = privacy_policy_content;

const PrivacyPolicyArea = () => {
  return (
    <>
      <style jsx="true" global="true">
        {`
          .privacyPolicyDiv :is(p, li) {
            text-align: justify;
          }
          .privacyPolicyDiv .subList li b {
            color: black !important;
          }
          .privacyPolicyDiv a {
            color: #324da0;
          }
          @media (max-width: 768px) {
            .tp-inner-pt-section p {
              font-size: 16px;
            }
            .tp-inner-pg-list ul li {
              font-size: 16px;
            }
          }
          ul{
            list-style-type:none;
          }
        `}
      </style>
      <div className="tp-job-details pt-50 pb-50  tpfadeUp privacyPolicyDiv">
        <div className="container">
          <div className="tp-privacy-policy-box">
            <div className="tp-inner-page-hero pb-20 tp-border-bottom">
        
              <span>
                <b>Updated:</b>
                {date}
              </span>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="tp-inner-pt-section">
                  <h4 className="tp-inner-pt-section__title mt-30 mb-20">
                    Overview
                  </h4>
                  <p className="mb-20">{overview}</p>
                  {/* =================================================== */}
                  {mainType.map((data, i) => {
                    return (
                      <div key={i}>
                        <h4 className="tp-inner-pt-section__title mt-30 mb-20">
                          {data.title}
                        </h4>
                        {data.desc_1 && <p className="mb-20">{data.desc_1}</p>}
                        <div className="tp-inner-pg-list mb-20">
                          <ul className="subList">
                            {data.subList.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        {data.desc_2 && <p className="mb-20">{data.desc_2}</p>}
                      </div>
                    );
                  })}
                  {/* ========================================================== */}

                
                  <h4 className="tp-inner-pt-section__title mt-30 mb-20">
                    {sale_of_personal_information.mainTitle}
                  </h4>
                  <p className="mb-20">
                    {sale_of_personal_information.mainDesc}
                  </p>
                  <br />

                  <h5 className="mb-20">
                    {sale_of_personal_information.subTitle}
                  </h5>
                  <p className="mb-20">
                    {sale_of_personal_information.subDesc}
                  </p>

                  {sale_of_personal_information.subTypes.map((data, i) => {
                    return (
                      <div key={i}>
                        <h5 className="mb-20">{data.title}</h5>
                        {data.desc_1 && <p className="mb-20">{data.desc_1}</p>}

                        <div className="tp-inner-pg-list mb-20">
                          <ul className="subList">
                            {data.subList.map((subListData, i) => {
                              return <li key={i}>{subListData}</li>;
                            })}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                  {/* ================================================================== */}
                  <h4 className="tp-inner-pt-section__title mt-30 mb-20">
                    {purpose_for_collecting_information.title}
                  </h4>
                  <p className="mb-20">
                    {purpose_for_collecting_information.desc}
                  </p>
                  {purpose_for_collecting_information.subTypes.map(
                    (data, i) => {
                      return (
                        <div key={i}>
                          <h5 className="mb-20">{data.title}</h5>
                          <div className="tp-inner-pg-list mb-20">
                            <ul className="subList">
                              {data.subList.map((subListData, i) => {
                                return <li key={i}>{subListData}</li>;
                              })}
                            </ul>
                          </div>
                          {data.desc && <p className="mb-20">{data.desc}</p>}
                        </div>
                      );
                    }
                  )}
                  {/* ============================================================================ */}
                  {title_description_part_1.map((data, i) => {
                    return (
                      <div key={i}>
                        <h4 className="tp-inner-pt-section__title mt-30 mb-20">
                          {data.title}
                        </h4>
                        <p className="mb-20">{data.desc}</p>
                      </div>
                    );
                  })}
                  {/* ============================================================================== */}
                  <h4 className="tp-inner-pt-section__title mt-30 mb-20">
                    {other_uses_and_disclosures.title}
                  </h4>
                  <p className="mb-20">{other_uses_and_disclosures.desc}</p>
                  <div className="tp-inner-pg-list mb-20">
                    <ul className="subList">
                      {other_uses_and_disclosures.subList.map((data, i) => {
                        return (
                          <li key={i}>
                            {data.name}
                            <ul>
                              {data.subSubList.map((data, i) => {
                                return <li key={i}>{data}</li>;
                              })}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {/* ================================================================== */}
                  {title_description_part_2.map((data, i) => {
                    return (
                      <div key={i}>
                        <h4 className="tp-inner-pt-section__title mt-30 mb-20">
                          {data.title}
                        </h4>
                        <p className="mb-20">{data.desc}</p>
                      </div>
                    );
                  })}
                  {/* ===================================================================== */}
                  <h4 className="tp-inner-pt-section__title mt-30 mb-20">
                    {california_residents.title}
                  </h4>
                  <p className="mb-20">{california_residents.desc_1}</p>
                  <div className="tp-inner-pg-list mb-20">
                    <ul className="subList">
                      {california_residents.list_1.map((listData, i) => {
                        return <li key={i}>{listData}</li>;
                      })}
                    </ul>
                  </div>
                  <p className="mb-20">{california_residents.desc_2}</p>
                  <div className="tp-inner-pg-list mb-20">
                    <ul className="subList">
                      {california_residents.list_2.map((listData, i) => {
                        return <li key={i}>{listData}</li>;
                      })}
                    </ul>
                  </div>
                  <p className="mb-20">{california_residents.desc_3}</p>
                  <div className="tp-inner-pg-list mb-20">
                    <ul className="subList">
                      {california_residents.list_3.map((listData, i) => {
                        return <li key={i}>{listData}</li>;
                      })}
                    </ul>
                  </div>
                  {/* ============================================================ */}
                  <h4
                    className="tp-inner-pt-section__title mt-30 mb-20"
                    id="QandC"
                  >
                    {questions_and_comments.title}
                  </h4>
                  <p className="mb-20">{questions_and_comments.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyArea;
