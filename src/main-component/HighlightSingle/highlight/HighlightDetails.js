import React, { useMemo, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import BlogSidebar from "../../../components/BlogSidebar/BlogSidebar";
import globalEnv from "../../../api/globalenv";
import "./HighlightDetails.css";
import { ShimmerThumbnail } from "react-shimmer-effects";

import Skeleton from "react-loading-skeleton";
const HighlightDetails = ({ article, blRight, blLeft }) => {
  const wordCount = useMemo(() => {
    return countWords(article?.attributes?.Description);
  }, [article]);

  function countWords(str) {
    return str?.trim().split(/\s+/).length;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const imageUrl = article?.attributes?.Image?.data[0]?.attributes?.url;

  return (
    <div>
      <section className="wpo-blog-single-section section-padding">



        <div className="container">
          <div className="row">
            <div className={`col col-lg-8 col-12 ${blRight}`}>
              <div className="wpo-blog-content">
                <div className="post format-standard-image">
                  {article ? (
                    <>
                      <div
                        className="entry-media"
                        style={{
                          width: "100%",
                          maxWidth: "100%",
                          height: "auto",
                          maxHeight: "50vh",
                          overflow: "hidden",
                          borderRadius: "10px",
                        }}
                      >
                        {imageUrl ? (
                          <img
                            src={`${globalEnv?.api}${imageUrl}`}
                            alt="them-pure"
                            effect="blur"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = "/fallback-image.jpg";
                            }}
                          />
                        ) : (
                          <ShimmerThumbnail style={{ height: "5vh" }} rounded />
                        )}
                      </div>

                      <div className="entry-meta">
                        <ul>
                          {article?.attributes?.Author?.data[0]?.attributes
                            ?.fullname && (
                            <li>
                              <i className="fi flaticon-user"> </i> By{" "}
                              {
                                article?.attributes?.Author?.data[0]?.attributes
                                  ?.fullname
                              }
                            </li>
                          )}

                          <li>
                            <i className="fi flaticon-calendar"></i>{" "}
                            {new Date(
                              article?.attributes?.createdAt
                            ).toLocaleDateString("en-GB")}
                          </li>
                          <li>
                            <i className="fa-regular fa-clock"></i>&nbsp;
                            {Math.ceil(wordCount / 200)} min read
                          </li>
                        </ul>
                      </div>

                      <div className="custom-list">
                        <ReactMarkdown
                          children={article.attributes?.Description}
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                          transformImageUri={(uri) =>
                            uri.startsWith("http")
                              ? uri
                              : `${globalEnv.api}${uri}`
                          }
                          className="markdown"
                        />
                      </div>
                    </>
                  ) : (
                    <p>
                     
                      <ShimmerThumbnail height={350} rounded />
                      <Skeleton count={40}/>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <BlogSidebar blLeft={blLeft} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(HighlightDetails);
