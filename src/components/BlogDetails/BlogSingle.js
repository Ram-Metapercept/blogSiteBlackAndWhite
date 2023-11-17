import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import BlogSidebar from "../BlogSidebar/BlogSidebar.js";
import NoImge from "../../images/noImage.jpg";
import "./BlogSingle.css";
import globalEnv from "../../api/globalenv.js";
import Skeleton from "react-loading-skeleton";
import { ShimmerThumbnail } from "react-shimmer-effects";
import "react-loading-skeleton/dist/skeleton.css";

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
  const imageUrl = currentData?.attributes?.Image?.data[0]?.attributes?.url;

  return (
    <section className="wpo-blog-single-section section-padding">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
            <div className="wpo-blog-content">
              <div className="post format-standard-image">
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
                    <div
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
                        src={`${globalEnv?.api}${imageUrl}`}
                        alt={
                          currentData?.attributes?.Image.data[0].attributes.name
                            .replace(/\.[^.]+$/, "")
                            .slice(0, 30) + "..."
                        }
                        effect="blur"
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                          borderRadius: "10px",
                          maxHeight: "50vh !important",
                        }}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `${ NoImge}`;
                          e.target.classList.add("error-image")
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <ShimmerThumbnail height={320} rounded />
                    </div>
                  )}
                </div>

                {currentData ? (
                  <div>
                    <div className="entry-meta">
                      <ul style={{ listStyle: "none !important" }}>
                        {currentData?.attributes?.Author?.data[0]?.attributes
                          ?.fullname && (
                          <li>
                            <i className="fi flaticon-user"> </i> By{" "}
                            {
                              currentData?.attributes?.Author?.data[0]
                                ?.attributes?.fullname
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
                            countWords(currentData?.attributes?.Description) /
                              200
                          )}{" "}
                          min read
                        </li>
                      </ul>
                    </div>

                    <div className="custom-list">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            currentData.attributes?.Description.replace(
                              /src="(\/[^"]+)"/g,
                              (match, src) =>
                                src.startsWith("http")
                                  ? match
                                  : `src="${globalEnv.api}${src}"`
                            ) || "",
                        }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Skeleton count={30} />
                  </div>
                )}
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
