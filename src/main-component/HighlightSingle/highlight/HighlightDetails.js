import React from "react";
import BlogSidebar from "../../../components/BlogSidebar/BlogSidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import globalEnv from "../../../api/globalenv";
import "./HighlightDetails.css";
import { useEffect } from "react";
const HighlightDetails = ({ article }, props) => {
  function countWords(str) {
    return str?.trim().split(/\s+/).length;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section className="wpo-blog-single-section section-padding">
        <div className="container">
          <div className="row">
            <div className={`col col-lg-8 col-12  ${props.blRight}`}>
              <div className="wpo-blog-content">
                <div className="post format-standard-image">
                  <div className="entry-media">
                    <img
                      src={`${globalEnv.api}${article?.attributes?.Image?.data[0]?.attributes?.url}`}
                      alt=""
                      key={article?.id}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="entry-meta">
                    <ul>
                      <li>
                        <i className="fi flaticon-user"> </i> By{" "}
                        {
                          article?.attributes?.Author?.data[0]?.attributes
                            ?.fullname
                        }
                      </li>
                      <li>
                        <i className="fi flaticon-calendar"></i>{" "}
                        {new Date(
                          article?.attributes?.createdAt
                        ).toLocaleDateString("en-GB")}
                      </li>
                      <li>
                        <i className="fa-regular fa-clock-desk"></i> &nbsp;
                        {Math.ceil(
                          countWords(article?.attributes?.Description) / 200
                        )}{" "}
                        &nbsp;min read
                      </li>
                    </ul>
                  </div>
                  {/* <h1>{article?.attributes?.Title}</h1> */}
                  <div className="custom-list">
                    <ReactMarkdown
                      children={article?.attributes?.Description}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      transformImageUri={(uri) =>
                        uri.startsWith("http") ? uri : `${globalEnv.api}${uri}`
                      }
                      className="markdown"
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
            <BlogSidebar blLeft={props.blLeft} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HighlightDetails;
