import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import BlogSidebar from "../BlogSidebar/BlogSidebar.js";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "./BlogSingle.css";
import globalEnv from "../../api/globalenv.js";

const BlogSingle = (props) => {
  const { slug } = useParams();

  const [item, setItem] = useState([]);

  const [author, setAuthor] = useState([]);
  const [catItem, setCatItem] = useState([]);

  useEffect(() => {
    const ids = parseInt(slug);
    fetch(`${globalEnv.api}/api/articles/${ids}?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data.data);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  useEffect(() => {
    fetch(
      `${globalEnv.api}/api/categories?filters[title][$eq]=${item?.attributes?.Category?.data?.attributes?.Title}&populate=Articles.Image,Article.Author`
    )
      .then((response) => response.json())
      .then((data) => {
        setCatItem(data.data);
      })
      .catch((error) => console.error(error));
  }, [item]);

  useEffect(() => {
    fetch(`${globalEnv.api}/api/articles/${slug}?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setAuthor(data.data);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  let index = catItem[0]?.attributes?.Articles?.data.findIndex((x) => {
    return x?.id === item?.id;
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  const handleNext = () => {
    if (currentIndex < item[0]?.attributes?.Articles?.data?.length - 1) {
      setCurrentIndex((currentIndex) => currentIndex + 1);
    }
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((currentIndex) => currentIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const currentData = catItem[0]?.attributes?.Articles?.data[currentIndex];
  const nextData = catItem[0]?.attributes?.Articles?.data[currentIndex + 1];
  const prevData = catItem[0]?.attributes?.Articles?.data[currentIndex - 1];

  function countWords(str) {
    return str?.trim().split(/\s+/).length;
  }
  const renderers = {
    listItem: ({ children }) => (
      <li style={{ listStyle: "disc" }}>{children}</li>
    ),
  };

  return (
    <section className="wpo-blog-single-section section-padding">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
            <div className="wpo-blog-content">
              <div className="post format-standard-image">
                <div className="entry-media">
                  <img
                    src={`${globalEnv.api}${currentData?.attributes?.Image?.data[0]?.attributes?.url}`}
                    alt=""
                    key={currentData?.id}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="entry-meta">
                  <ul style={{ listStyle: "none !important" }}>
                    <li>
                      <i className="fi flaticon-user"> </i> By{" "}
                      {
                        author?.attributes?.Author?.data[0]?.attributes
                          ?.fullname
                      }
                    </li>
                    <li>
                      <i className="fi flaticon-calendar"></i>{" "}
                      {new Date(
                        currentData?.attributes?.createdAt
                      ).toLocaleDateString("en-GB")}{" "}
                    </li>
                    <li>
                      <i className="fa-regular fa-clock-desk"></i> &nbsp;
                      {Math.ceil(
                        countWords(currentData?.attributes?.Description) / 200
                      )}{" "}
                      min read
                    </li>
                  </ul>
                </div>
                {/* <h1>{currentData?.attributes?.Title}</h1> */}
                <div className="custom-list">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    children={currentData?.attributes?.Description}
                    rehypePlugins={[rehypeRaw]}
                    transformImageUri={(uri) =>
                      uri.startsWith("http") ? uri : `${globalEnv.api}${uri}`
                    }
                    renderers={renderers}
                  />
                </div>
              </div>

              <div className="more-posts">
                <div className="previous-post">
                  {prevData ? (
                    <Link to={`/blog-single/${prevData?.id}`}>
                      <span
                        className="post-control-link"
                        onClick={handlePrevious}
                      >
                        Previous Post
                      </span>
                      <span className="post-name">
                        {prevData?.attributes?.Title}
                      </span>
                    </Link>
                  ) : (
                    <div>
                      <span className="post-control-link disabled">
                        Previous Post
                      </span>
                    </div>
                  )}
                </div>
                <div className="next-post">
                  {nextData ? (
                    <Link to={`/blog-single/${nextData?.id}`}>
                      <span className="post-control-link" onClick={handleNext}>
                        Next Post
                      </span>
                      <span className="post-name">
                        {nextData?.attributes?.Title}
                      </span>
                    </Link>
                  ) : (
                    <div>
                      <span className="post-control-link disabled">
                        Next Post
                      </span>
                      <span className="post-name"></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <BlogSidebar blLeft={props.blLeft} />
        </div>
      </div>
    </section>
  );
};

export default BlogSingle;
