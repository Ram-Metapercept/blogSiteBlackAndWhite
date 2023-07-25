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

const BlogListTag = ({ slug }, props) => {
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
  const renderers = {
    listItem: ({ children }) => (
      <li style={{ listStyle: "disc !important" }}>{children}</li>
    ),
  };
  const totalItems = articles.length;
  console.log(totalItems);
  const currentArticles = useMemo(
    (totalItems) => {
      return articles.slice(0, visibleItems);
    },
    [visibleItems, totalItems]
  );
  console.log(visibleItems);

  const loadMoreItems = () => {
    if (visibleItems + 6 >= totalItems) {
      setVisibleItems(totalItems);
      setLoadMoreVisible(false);
      setHasMoreContent(false);
    } else {
      setVisibleItems(visibleItems + 6);
      setHasMoreContent(false);
    }
  };
  return (
    <section className="wpo-blog-pg-section section-padding">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
            <div className="wpo-blog-content">
              {currentArticles.map((blog, bitem) => (
                <div className={`post ${blog.blClass}`} key={bitem}>
                  <div className="entry-media video-holder">
                    <img
                      src={`${globalEnv.api}${blog.attributes.Image.data[0].attributes.url}`}
                      alt=""
                      key={blog.id}
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
                        <i className="fi flaticon-user"> </i>By{" "}
                        {
                          blog?.attributes?.Author?.data[0]?.attributes
                            ?.fullname
                        }
                      </li>
                      <li>
                        <i className="fi flaticon-calendar"></i>{" "}
                        {new Date(
                          blog?.attributes?.createdAt
                        ).toLocaleDateString("en-GB")}
                      </li>
                      <li>
                        <i className="fa-regular fa-clock-desk"></i> &nbsp;
                        {Math.ceil(
                          countWords(blog?.attributes?.Description) / 200
                        )}{" "}
                        &nbsp;min read
                      </li>
                    </ul>
                  </div>
                  <h1>{blog?.attributes?.Title}</h1>
                  <div className="entry-details">
                    <div className="custom-list">
                      <ReactMarkdown
                        children={
                          blog?.attributes?.Description.slice(0, 250) + "...."
                        }
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        transformImageUri={(uri) =>
                          uri.startsWith("http")
                            ? uri
                            : `${globalEnv.api}${uri}`
                        }
                        className="markdown"
                        renderers={renderers}
                      />
                    </div>

                    <Link
                      onClick={ClickHandler}
                      to={`/blog-single/tag/${blog?.id}`}
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
              {loadMoreVisible && hasMoreContent && (
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

          <BlogSidebar blLeft={props?.blLeft} />
        </div>
      </div>
    </section>
  );
};

export default BlogListTag;
