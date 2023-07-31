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
        const response = await fetch(
          `${globalEnv.api}/api/articles?filters[Slug][$eq]=${slug}&populate=*`
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
      let url = item.map((item1) => item1.attributes.Tag);
      try {
        const response = await fetch(
          `${globalEnv.api}/api/articles?filters[tag][$eq]=${url}&populate=*`
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
    const index = tagItem.findIndex((x) => {
      return item.map((p) => p?.id)?.includes(x?.id);
    });
    setCurrentIndex(index);
  }, [slug, tagItem, data, item]);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
    window.scrollTo(0, 0);
  };

  const currentData = tagItem[currentIndex];
  const nextData = tagItem[currentIndex + 1];
  const prevData = tagItem[currentIndex - 1];

  const imageUrl = currentData?.attributes?.Image?.data[0]?.attributes?.url;
  return (
    <section className="wpo-blog-single-section section-padding">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
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
                        borderRadius: "10px",
                      }}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/fallback-image.jpg";
                      }}
                    />
                  ) : (
                    <span>image loading....</span>
                  )}
                </div>
                <div className="entry-meta">
                  <ul>
                    {currentData?.attributes?.Author?.data[0]?.attributes
                      ?.fullname && (
                      <li>
                        <i className="fi flaticon-user"> </i> By{" "}
                        {
                          currentData?.attributes?.Author?.data[0]?.attributes
                            ?.fullname
                        }
                      </li>
                    )}

                    <li>
                      <i className="fi flaticon-calendar"></i>
                      {new Date(
                        currentData?.attributes?.createdAt
                      ).toLocaleDateString("en-GB")}
                    </li>
                    <li>
                      <i className="fa-regular fa-clock"></i>&nbsp;
                      {Math.ceil(
                        countWords(currentData?.attributes?.Description) / 200
                      )}{" "}
                      min read
                    </li>
                  </ul>
                </div>

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
              <div className="more-posts d-flex align-items-stretch flex-wrap p-0">
                <div className="previous-post" style={{ padding: "40px 25px" }}>
                  {prevData ? (
                    <Link
                      to={`/blog-single/tag/${prevData?.attributes.Slug}`}
                      onClick={handlePrevious}
                    >
                      <span className="post-control-link">Previous Post</span>
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
                <div className="next-post" style={{ padding: "40px 25px" }}>
                  {nextData ? (
                    <Link
                      to={`/blog-single/tag/${nextData?.attributes?.Slug}`}
                      onClick={handleNext}
                    >
                      <span className="post-control-link">Next Post</span>
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
