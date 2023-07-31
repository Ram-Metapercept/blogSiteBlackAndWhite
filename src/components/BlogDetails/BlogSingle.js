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

  const [catItem, setCatItem] = useState([]);

  useEffect(() => {
    fetch(`${globalEnv.api}/api/articles?filters[Slug][$eq]=${slug}&populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data.data);
      })
      .catch((error) => console.error(error));
  }, [slug]);
  useEffect(() => {
    let url = item
      .map((item1) => item1?.attributes?.Category?.data?.attributes?.Title)
      .join(",");
    fetch(
      `${globalEnv.api}/api/categories?filters[Title][$eq]=${url}&populate=Articles.Image,Articles.Author`
    )
      .then((response) => response.json())
      .then((data) => {
        setCatItem(data.data);
      })
      .catch((error) => console.error(error));
  }, [item]);

  let index = catItem[0]?.attributes?.Articles?.data.findIndex((x) => {
    return item.map((p) => p?.id)?.includes(x?.id);
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
  const components = {
    listItem: ({ children }) => (
      <li style={{ listStyle: "disc" }}>{children}</li>
    ),
  };

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
                  <ul style={{ listStyle: "none !important" }}>
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
                      <i className="fi flaticon-calendar"></i>{" "}
                      {new Date(
                        currentData?.attributes?.createdAt
                      ).toLocaleDateString("en-GB")}{" "}
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
                    components={components}
                  />
                </div>
              </div>

              <div className="more-posts d-flex align-items-stretch flex-wrap p-0">
                <div className="previous-post" style={{ padding: "40px 25px" }}>
                  {prevData ? (
                    <Link
                      to={`/blog-single/${prevData?.attributes?.Slug}`}
                      onClick={handlePrevious}
                    >
                      <span className="post-control-link">Previous Post</span>
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
                <div className="next-post" style={{ padding: "40px 25px" }}>
                  {nextData ? (
                    <Link
                      to={`/blog-single/${nextData?.attributes?.Slug}`}
                      onClick={handleNext}
                    >
                      <span className="post-control-link">Next Post</span>
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
