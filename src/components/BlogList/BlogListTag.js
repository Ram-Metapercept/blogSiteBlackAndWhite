import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import BlogSidebar from "../BlogSidebar/BlogSidebar.js";
import globalEnv from "../../api/globalenv.js";
import Pagination from "react-bootstrap/Pagination";

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

const BlogListTag = ({ slug }, props) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 2;

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
  const currentArticles = useMemo(() => {
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    return articles.slice(indexOfFirstArticle, indexOfLastArticle);
  }, [articles, currentPage]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
              <Pagination>
                <Pagination.Prev
                  onClick={() => {
                    if (currentPage > 1) {
                      handlePageChange(currentPage - 1);
                    }
                  }}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft />
                </Pagination.Prev>
                {Array.from({
                  length: Math.ceil(articles.length / articlesPerPage),
                }).map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => {
                    if (
                      currentPage < Math.ceil(articles.length / articlesPerPage)
                    ) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                  disabled={
                    currentPage === Math.ceil(articles.length / articlesPerPage)
                  }
                >
                  <FaChevronRight />
                </Pagination.Next>
              </Pagination>
            </div>
          </div>

          {/* BlogSidebar component */}
          <BlogSidebar blLeft={props?.blLeft} />
        </div>
      </div>
    </section>
  );
};

export default BlogListTag;
