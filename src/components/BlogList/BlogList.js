import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogSidebar from "../BlogSidebar/BlogSidebar.js";
import Pagination from "react-bootstrap/Pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./BlogList.css";
import globalEnv from "../../api/globalenv.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
const truncate = require("truncate");
const ClickHandler = () => {
  window.scrollTo(10, 0);
};
function countWords(str) {
  return str?.trim().split(/\s+/).length;
}
const BlogList = ({ slug }, props) => {
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${globalEnv.api}/api/categories?filters[Title][$eq]=${slug}&populate[Articles][populate]=*`
        );
        const data = await response.json();
        setCategory(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [slug]);

  const totalPages = Math.ceil(
    category.flatMap((blog) => blog?.attributes?.Articles?.data).length /
      articlesPerPage
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = category
    .flatMap((blog) => blog?.attributes?.Articles?.data)
    .slice(indexOfFirstArticle, indexOfLastArticle);

  const propsToPass = {
    prop1: slug,
  };

  return (
    <section className="wpo-blog-pg-section section-padding">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
            <div className="wpo-blog-content">
              {currentArticles.map((blog) => (
                <div className="post" key={blog.id}>
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
                        <i className="fi flaticon-user"> </i> By{" "}
                        {
                          blog?.attributes?.Author?.data[0]?.attributes
                            ?.fullname
                        }
                      </li>
                      <li className="custom-list">
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
                  <div className="entry-details">
                    <Link onClick={ClickHandler} to={`/blog-single/${blog.id}`}>
                      <h1>{blog?.attributes?.Title}</h1>
                      <ReactMarkdown
                        children={
                          // blog?.attributes?.Description.slice(0, 250) + "...."
                          truncate(blog?.attributes?.Description, 450)
                        }
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        transformImageUri={(uri) =>
                          uri.startsWith("http")
                            ? uri
                            : ` ${globalEnv.api}``${uri}`
                        }
                        className="markdown"
                      />
                      <Link
                        onClick={ClickHandler}
                        to={`/blog-single/${blog?.id}`}
                        className="read-more"
                        state={propsToPass}
                      >
                        READ MORE...
                      </Link>
                    </Link>
                  </div>
                </div>
              ))}
              <div className="pagination-wrapper">
                <Pagination className="list">
                  <Pagination.Prev
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={isFirstPage}
                  >
                    <FaChevronLeft />
                  </Pagination.Prev>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={isLastPage}
                  >
                    <FaChevronRight />
                  </Pagination.Next>
                </Pagination>
              </div>
            </div>
          </div>
          <BlogSidebar blLeft={props.blLeft} />
        </div>
      </div>
    </section>
  );
};

export default BlogList;
