import React, { useMemo,useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import BlogSidebar from "../../../components/BlogSidebar/BlogSidebar";
import globalEnv from "../../../api/globalenv";
import "./HighlightDetails.css";

const HighlightDetails = ({ article }, props) => {
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
            <div className={`col col-lg-8 col-12  ${props.blRight}`}>
              <div className="wpo-blog-content">
                <div className="post format-standard-image">
                  <div className="entry-media">
                    {imageUrl ? (
                      <img
                        src={`${globalEnv?.api}${imageUrl}`}
                        alt="them-pure"
                        effect="blur"
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                          aspectRatio: "1.5 / 1",
                          borderRadius:"10px"
                        }}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/fallback-image.jpg";
                        }}
                      />
                    ) : (
                      <span>Image loading........</span>
                    )}
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
                        <i className="fa-regular fa-clock"></i>&nbsp;
                        {Math.ceil(wordCount / 200)} min read
                      </li>
                    </ul>
                  </div>

                  <div className="custom-list">
                    <ReactMarkdown
                      children={article?.attributes?.Description}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      transformImageUri={(uri) =>
                        uri.startsWith("http") ? uri : `${globalEnv.api}${uri}`
                      }
                      className="markdown"
                    />
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

export default React.memo(HighlightDetails);