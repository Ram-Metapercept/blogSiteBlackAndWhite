import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BlogSidebar from "../BlogSidebar/BlogSidebar.js";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "./BlogSingleTag.css";
import globalEnv from "../../api/globalenv.js";

const BlogSingleTag = ({ data, ...props }) => {
  const { slug } = useParams();
  const [item, setItem] = useState([]);
  const [tagItem, setTagItem] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ids = parseInt(slug);
        const response = await fetch(
          `${globalEnv.api}/api/articles/${ids}?populate=*`
        );
        const data = await response.json();
        setItem(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [slug]);

  function countWords(str) {
    return str?.trim().split(/\s+/).length;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${globalEnv.api}/api/articles?filters[tag][$eq]=${item?.attributes?.Tag}&populate=*`
        );
        const data = await response.json();
        setTagItem(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [item]);

  useEffect(() => {
    const index = tagItem.findIndex((x) => x?.id === data?.id);
    setCurrentIndex(index);
  }, [slug, tagItem, data]);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const currentData = tagItem[currentIndex];
  const nextData = tagItem[currentIndex + 1];
  const prevData = tagItem[currentIndex - 1];

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
                    style={{ width: "100%", height: "auto",borderRadius:"10px" }}
                  />
                </div>
                <div className="entry-meta">
                  <ul>
                 
                    <li>
                      <i className="fi flaticon-user"> </i> By{" "}
                      {
                        currentData?.attributes?.Author?.data[0]?.attributes
                          ?.fullname
                      }
                    </li>
                    <li>
                      <i className="fi flaticon-calendar"></i>
                      {new Date(
                        currentData?.attributes?.createdAt
                      ).toLocaleDateString("en-GB")}
                    </li>
                    <li>
                      <i className="fa-regular fa-clock-desk"></i> &nbsp;
                      {Math.ceil(
                        countWords(currentData?.attributes?.Description) / 200
                      )}{" "}
                        &nbsp;min read
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
                />
                  </div>
              </div>
              <div className="more-posts">
                <div className="previous-post">
                  {prevData ? (
                    <Link to={`/blog-single/tag/${prevData?.id}`}>
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
                    <>
                      <span className="post-control-link inactive">
                        Previous Post
                      </span>
                      <span className="post-name"></span>
                    </>
                  )}
                </div>
                <div className="next-post">
                  {nextData ? (
                    <Link to={`/blog-single/tag/${nextData?.id}`}>
                      <span className="post-control-link" onClick={handleNext}>
                        Next Post
                      </span>
                      <span className="post-name">
                        {nextData?.attributes?.Title}
                      </span>
                    </Link>
                  ) : (
                    <>
                      <span className="post-control-link inactive">
                        Next Post
                      </span>
                      <span className="post-name"></span>
                    </>
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

export default BlogSingleTag;
