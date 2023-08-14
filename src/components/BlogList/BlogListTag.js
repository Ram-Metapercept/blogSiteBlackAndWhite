import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import BlogSidebar from "../BlogSidebar/BlogSidebar.js";
import globalEnv from "../../api/globalenv.js";
import { AiOutlinePlus } from "react-icons/ai";

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

const BlogListTag = ({ slug, blRight }) => {
  const [articles, setArticles] = useState([]);

  const [visibleItems, setVisibleItems] = useState(2);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [hasMoreContent, setHasMoreContent] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${globalEnv.api}/api/articles?filters[Tag][$eq]=${encodeURIComponent(
            slug
          )}&filters[Archived][$eq]=false&populate=*`
        );
        const data = await response.json();
        setArticles(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [slug]);

  const propsToPass = {
    prop1: slug,
  };

  function countWords(str) {
    return str?.trim().split(/\s+/).length;
  }

  const components = {
    li: ({ children }) => (
      <li style={{ listStyle: "disc !important" }}>{children}</li>
    ),
  };

  const totalItems = articles.length;

  const currentArticles = useMemo(() => {
    return articles.slice(0, visibleItems);
  }, [articles, visibleItems]);

  const loadMoreItems = () => {
    if (visibleItems + 2 >= totalItems) {
      setVisibleItems(totalItems);
      setLoadMoreVisible(false);
      setHasMoreContent(false);
    } else {
      setVisibleItems(visibleItems + 2);
      setHasMoreContent(true);
    }
  };

  return (
    <section className="wpo-blog-pg-section section-padding">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${blRight}`}>
            <div className="wpo-blog-content">
              {currentArticles.map((blog, bitem) => (
                <div className={`post ${blog.blClass}`} key={bitem}>
                  <div className="entry-media video-holder"
                   style={{
                    width: "100%",
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "50vh",
                    overflow: "hidden",
                    borderRadius: "10px",
                  }}
  >
                    <img
                      src={`${globalEnv.api}${blog.attributes.Image.data[0].attributes.url}`}
                      alt=""
                      key={blog.id}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                        maxHeight:"50vh !important"
                      }}
                    />
                  </div>
                  <div className="entry-meta">
                    <ul>
                      {blog?.attributes?.Author?.data[0]?.attributes
                        ?.fullname && (
                        <li>
                          <i className="fi flaticon-user"> </i>By{" "}
                          {
                            blog?.attributes?.Author?.data[0]?.attributes
                              ?.fullname
                          }
                        </li>
                      )}

                      <li>
                        <i className="fi flaticon-calendar"></i>{" "}
                        {new Date(
                          blog?.attributes?.createdAt
                        ).toLocaleDateString("en-GB")}
                      </li>
                      <li>
                        <i className="fa-regular fa-clock"></i>&nbsp;
                        {Math.ceil(
                          countWords(blog?.attributes?.Description) / 200
                        )}{" "}
                        min read
                      </li>
                    </ul>
                  </div>
                  <h1>{blog?.attributes?.Title}</h1>
                  <div className="entry-details">
                    <div className="custom-list">
                    <div className="listing" id="cutoffText1">
                      <ReactMarkdown
                        children={
                          blog?.attributes?.Description+ "...."
                        }
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        transformImageUri={(uri) =>
                          uri.startsWith("http")
                            ? uri
                            : `${globalEnv.api}${uri}`
                        }
                        className="markdown"
                        components={components}
                      />
                      </div>
                    </div>
                    <Link
                      onClick={ClickHandler}
                      to={`/blog-single/tag/${blog?.attributes?.Slug}`}
                      state={propsToPass}
                      className="read-more"
                    >
                      READ MORE...
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination-wrapper">
              {loadMoreVisible &&
                hasMoreContent &&
                totalItems > visibleItems && (
                  <div className="pt-istop-btn-wrapper text-center mt-30">
                    <button
                      className="tp-common-btn text-center"
                      onClick={loadMoreItems}
                    >
                      <span className="text-center button-space">
                        <span>Load More</span>
                        <span>
                          <AiOutlinePlus />
                        </span>
                      </span>
                    </button>
                  </div>
                )}
            </div>
          </div>
          <BlogSidebar blLeft={blRight} />
        </div>
      </div>
    </section>
  );
};

export default BlogListTag;
