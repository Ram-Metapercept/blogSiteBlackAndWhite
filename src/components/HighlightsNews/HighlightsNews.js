// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../HighlightsNews/HighlightsNews.css"; // Import the CSS file for styling
// import globalEnv from "../../api/globalenv.js";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import Pagination from "react-bootstrap/Pagination";
// import "./HighlightsNews.css";
// const truncate = require("truncate");
// const HighlightsNews = (props) => {
//   const [articles, setArticles] = useState([]);
//   const [latest, setLatest] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [archived, setArchived] = useState([]);
//   const [visibleItems, setVisibleItems] = useState();
//   const [loadMoreVisible, setLoadMoreVisible] = useState(true);

//   const ClickHandler = () => {
//     window.scrollTo(10, 0);
//   };

//   useEffect(() => {
//     fetch(`${globalEnv.api}/api/articles?populate=*`)
//       .then((response) => response.json())
//       .then((data) => {
//         setArticles(data.data);
//       })
//       .catch((error) => console.error(error));
//   }, [articles]);

//   useEffect(() => {
//     fetch(
//       `${globalEnv.api}/api/articles?filters[Archived][$eq]=true&populate=*`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setArchived(data.data);
//       })
//       .catch((error) => console.error(error));
//   }, [archived]);

//   useEffect(() => {
//     fetch(`${globalEnv.api}/api/categories?populate=*`)
//       .then((response) => response.json())
//       .then((data) => {
//         setCategory(data.data);
//       })
//       .catch((error) => console.error(error));
//   }, [category]);

//   useEffect(() => {
//     fetch(
//       `${globalEnv.api}/api/articles?pagination[page]=1&pagination[pageSize]=6&sort[0]=createdAt:desc&populate=*`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setLatest(data.data);
//       })
//       .catch((error) => console.error(error));
//   }, [currentPage, itemsPerPage]);

//   const totalItems = articles.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const displayData = articles.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const uniqueTags = new Set();
//   const objectsWithUniqueTags = [];

//   for (const obj of articles) {
//     if (!uniqueTags.has(obj?.attributes?.Tag)) {
//       uniqueTags.add(obj?.attributes?.Tag);
//       objectsWithUniqueTags.push(obj);
//     }
//   }
//   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//   return (
//     <>
//       <style>{`
//         .it-blog-wrapper .ca-service__item-title a {
//           overflow: hidden;
//           display: -webkit-box !important;
//           -webkit-box-orient: vertical;
//           -webkit-line-clamp: 2;
//         }
//       `}</style>

//       <section className="wpo-blog-highlights-section">
//         <div className="container">
//           <div className="wpo-section-title">
//             <h2>Posts</h2>
//           </div>
//           <div className="row">
//             <div className={`col col-lg-8 col-md-12 ${props.colClass}`}>
//               <div className="wpo-blog-highlights-wrap">
//                 <div className="wpo-blog-items">
//                   <div className="row">
//                     <div className="row">
//                       {displayData.map((item, i) => (
//                         <div key={i} className="col-lg-6">
//                           <div
//                             className="it-blog tp-lasted-blog mb-30 aos-init aos-animate it-blog-wrapper"
//                             data-aos="fade-up"
//                             data-aos-duration="1000"
//                           >
//                             <div className="it-blog__thumb w-img">
//                               <div className="fix">
//                                 <img
//                                   src={`${globalEnv.api}${item?.attributes?.Image?.data[0]?.attributes?.url}`}
//                                   alt="them-pure"
//                                 />
//                               </div>
//                               <div className="it-blog-date">
//                                 <span className="date">
//                                  <b>{new Date(
//                                     item?.attributes?.createdAt
//                                   ).getDate()}</b>{months[new Date(
//                                     item?.attributes?.createdAt
//                                   ).getMonth()]}
//                                 </span>

//                               </div>
//                             </div>
//                             <div className="it-blog-info white-bg">
//                             <button style={{ border:"1px solid #3756f7",padding:"2px 5px", borderRadius:"25px",marginBottom:"15px",color:"black",fontSize:"12px"}}>{item?.attributes?.Category?.data?.attributes?.Title}</button>
//                               <h3 className="ca-service__item-title mb-30">
//                                 <Link
//                                   to={`/highlight-single/${item?.id}`}
//                                   style={{ color: "var(--tp-heading-primary)" }}
//                                 >
//                                   {truncate(item.attributes.Title, 60)}
//                                 </Link>
//                               </h3>
//                               <div
//                                 className="tp-seo-full-btn"
//                                 style={{ "--tp-theme-redical": "#3756f7" }}
//                               >
//                                 <Link
//                                   to={`/highlight-single/${item?.id}`}
//                                   className="it-portfolio-item__btn"
//                                 >
//                                   Read More
//                                   <span className="mt-1">
//                                     <i className="fal fa-long-arrow-right"></i>
//                                     <i className="fal fa-long-arrow-right"></i>
//                                   </span>
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <Pagination>
//                 <Pagination.Prev
//                   disabled={currentPage === 1}
//                   onClick={() => handlePageChange(currentPage - 1)}
//                 >
//                   <FaChevronLeft />
//                 </Pagination.Prev>

//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <Pagination.Item
//                     key={index}
//                     active={currentPage === index + 1}
//                     onClick={() => handlePageChange(index + 1)}
//                   >
//                     {index + 1}
//                   </Pagination.Item>
//                 ))}

//                 <Pagination.Next
//                   disabled={currentPage === totalPages}
//                   onClick={() => handlePageChange(currentPage + 1)}
//                 >
//                   <FaChevronRight />
//                 </Pagination.Next>
//               </Pagination>
//             </div>
//             <div className={`col col-lg-4 col-md-12 ${props.hideClass}`}>
//               <div className="blog-sidebar">
//                 <div className="widget category-widget">
//                   <h3 style={{fontWeight:"700",color:"#070707"}}>Post Categories</h3>
//                   <ul>
//                     {category.map((blog) => (
//                       <li key={blog?.id}>
//                         <Link
//                           onClick={ClickHandler}
//                           to={`/blog/${blog?.attributes?.Title}`}
//                         >
//                           {blog?.attributes?.Title}
//                           <span>({blog?.attributes?.Articles?.data?.length})</span>
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="widget recent-post-widget">
//                   <h3 style={{fontWeight:"700",color:"#070707"}}>Latest Post</h3>
//                   {latest.slice(0, 5).map((blog, bitem) => (
//                     <div className="posts" key={bitem}>
//                       <div className="post">
//                         <div className="img-holder">
//                           <img
//                             src={`${globalEnv.api}${blog?.attributes?.Image?.data[0]?.attributes?.url}`}
//                             alt=""
//                           />
//                         </div>
//                         <div className="details">
//                           <span className="date">
//                             {new Date(
//                               blog?.attributes?.createdAt
//                             ).toLocaleDateString("en-GB")}{" "}
//                           </span>
//                           <h4>
//                             <Link
//                               onClick={ClickHandler}
//                               to={`/highlight-single/${blog.id}`}
//                             >
//                               {truncate(blog.attributes.Title, 60)}
//                             </Link>
//                           </h4>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="widget recent-post-widget">
//                   <h3 style={{fontWeight:"700",color:"#070707"}}>Archived Content</h3>
//                   {archived.slice(0, 5).map((blog, bitem) => (
//                     <div className="posts" key={bitem}>
//                       <div className="post">
//                         <div className="img-holder">
//                           <img
//                             src={`${globalEnv.api}${blog?.attributes?.Image?.data[0]?.attributes?.url}`}
//                             alt=""
//                           />
//                         </div>
//                         <div className="details">
//                           <h4>
//                             <Link
//                               onClick={ClickHandler}
//                               to={`/highlight-single/${blog?.id}`}
//                             >
//                               {truncate(blog?.attributes?.Title, 60)}
//                             </Link>
//                           </h4>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HighlightsNews;

// import React, { useEffect, useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import "../HighlightsNews/HighlightsNews.css";
// import globalEnv from "../../api/globalenv.js";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import Pagination from "react-bootstrap/Pagination";
// import "./HighlightsNews.css";

// const HighlightsNews = (props) => {
//   const [articles, setArticles] = useState([]);
//   const [latest, setLatest] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(6);
//   const [archived, setArchived] = useState([]);

//   const ClickHandler = () => {
//     window.scrollTo(10, 0);
//   };

//   useEffect(() => {
//     Promise.all([
//       fetch(`${globalEnv.api}/api/articles?populate=*`),
//       fetch(
//         `${globalEnv.api}/api/articles?filters[Archived][$eq]=true&populate=*`
//       ),
//       fetch(`${globalEnv.api}/api/categories?populate=*`),
//       fetch(
//         `${globalEnv.api}/api/articles?pagination[page]=1&pagination[pageSize]=6&sort[0]=createdAt:desc&populate=*`
//       ),
//     ])
//       .then(
//         ([
//           articlesResponse,
//           archivedResponse,
//           categoriesResponse,
//           latestResponse,
//         ]) =>
//           Promise.all([
//             articlesResponse.json(),
//             archivedResponse.json(),
//             categoriesResponse.json(),
//             latestResponse.json(),
//           ])
//       )
//       .then(([articlesData, archivedData, categoriesData, latestData]) => {
//         setArticles(articlesData.data);
//         setArchived(archivedData.data);
//         setCategory(categoriesData.data);
//         setLatest(latestData.data);
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   const totalItems = articles.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const displayData = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return articles.slice(startIndex, startIndex + itemsPerPage);
//   }, [articles, currentPage, itemsPerPage]);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   return (
//     <>
//       <style>{`
//         .it-blog-wrapper .ca-service__item-title a {
//           overflow: hidden;
//           display: -webkit-box !important;
//           -webkit-box-orient: vertical;
//           -webkit-line-clamp: 2;
//         }
//       `}</style>

//       <section className="wpo-blog-highlights-section">
//         <div className="container">
//           <div className="wpo-section-title">
//             <h2>Posts</h2>
//           </div>
//           <div className="row">
//             <div className={`col col-lg-8 col-md-12 ${props.colClass}`}>
//               <div className="wpo-blog-highlights-wrap">
//                 <div className="wpo-blog-items">
//                   <div className="row">
//                     <div className="row">
//                       {displayData.map((item, i) => {
//                         const { Title, Category, createdAt, Image, id } =
//                           item.attributes;

//                         return (
//                           <div key={i} className="col-lg-6">
//                             <div
//                               className="it-blog tp-lasted-blog mb-30 aos-init aos-animate it-blog-wrapper"
//                               data-aos="fade-up"
//                               data-aos-duration="1000"
//                             >
//                               <div className="it-blog__thumb w-img">
//                                 <div className="fix">
//                                   <img
//                                     src={`${globalEnv.api}${Image?.data[0]?.attributes?.url}`}
//                                     alt="them-pure"
//                                   />
//                                 </div>
//                                 <div className="it-blog-date">
//                                   <span className="date">
//                                     <b>{new Date(createdAt).getDate()}</b>
//                                     {months[new Date(createdAt).getMonth()]}
//                                   </span>
//                                 </div>
//                               </div>
//                               <div className="it-blog-info white-bg">
//                                 <button
//                                   style={{
//                                     border: "1px solid black",
//                                     padding: "7px",
//                                     borderRadius: "25px",
//                                     marginBottom: "5px",
//                                     color: "#474f62",
//                                     fontWeight: "700",
//                                   }}
//                                 >
//                                   {Category?.data?.attributes?.Title}
//                                 </button>
//                                 <h3
//                                   className="ca-service__item-title mb-30"
//                                   style={{ color: "#474f62" }}
//                                 >
//                                   <Link
//                                     to={`/highlight-single/${id}`}
//                                     style={{
//                                       color: "var(--tp-heading-primary)",
//                                     }}
//                                   >
//                                     {Title.length > 60
//                                       ? `${Title.substring(0, 60)}...`
//                                       : Title}
//                                   </Link>
//                                 </h3>
//                                 <div
//                                   className="tp-seo-full-btn"
//                                   style={{ "--tp-theme-redical": "#3756f7" }}
//                                 >
//                                   <Link
//                                     to={`/highlight-single/${id}`}
//                                     className="it-portfolio-item__btn"
//                                   >
//                                     Read More
//                                     <span className="mt-1">
//                                       <i className="fal fa-long-arrow-right"></i>
//                                       <i className="fal fa-long-arrow-right"></i>
//                                     </span>
//                                   </Link>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <Pagination>
//                 <Pagination.Prev
//                   disabled={currentPage === 1}
//                   onClick={() => handlePageChange(currentPage - 1)}
//                 >
//                   <FaChevronLeft />
//                 </Pagination.Prev>

//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <Pagination.Item
//                     key={index}
//                     active={currentPage === index + 1}
//                     onClick={() => handlePageChange(index + 1)}
//                   >
//                     {index + 1}
//                   </Pagination.Item>
//                 ))}

//                 <Pagination.Next
//                   disabled={currentPage === totalPages}
//                   onClick={() => handlePageChange(currentPage + 1)}
//                 >
//                   <FaChevronRight />
//                 </Pagination.Next>
//               </Pagination>
//             </div>
//             <div className={`col col-lg-4 col-md-12 ${props.hideClass}`}>
//               <div className="blog-sidebar">
//                 <div className="widget category-widget">
//                   <h3 style={{ fontWeight: "700" }}>Post Categories</h3>
//                   <ul>
//                     {category.map((blog) => (
//                       <li key={blog?.id}>
//                         <Link
//                           onClick={ClickHandler}
//                           to={`/blog/${blog?.attributes?.Title}`}
//                         >
//                           {blog?.attributes?.Title}
//                           <span>
//                             {blog?.attributes?.Articles?.data?.length}
//                           </span>
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="widget recent-post-widget">
//                   <h3 style={{ fontWeight: "700" }}>Latest Post</h3>
//                   {latest.slice(0, 5).map((blog, bitem) => {
//                     const { Title, createdAt, Image, id } = blog.attributes;

//                     return (
//                       <div className="posts" key={bitem}>
//                         <div className="post">
//                           <div className="img-holder">
//                             <img
//                               src={`${globalEnv.api}${Image?.data[0]?.attributes?.url}`}
//                               alt=""
//                             />
//                           </div>
//                           <div className="details">
//                             <span className="date">
//                               {new Date(createdAt).toLocaleDateString("en-GB")}
//                             </span>
//                             <h4>
//                               <Link
//                                 onClick={ClickHandler}
//                                 to={`/highlight-single/${id}`}
//                               >
//                                 {Title.length > 60
//                                   ? `${Title.substring(0, 60)}...`
//                                   : Title}
//                               </Link>
//                             </h4>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <div className="widget recent-post-widget">
//                   <h3 style={{ fontWeight: "700" }}>Archived Content</h3>
//                   {archived.slice(0, 5).map((blog, bitem) => {
//                     const { Title, id } = blog.attributes;

//                     return (
//                       <div className="posts" key={bitem}>
//                         <div className="post">
//                           <div className="img-holder">
//                             <img
//                               src={`${globalEnv.api}${blog?.attributes?.Image?.data[0]?.attributes?.url}`}
//                               alt=""
//                             />
//                           </div>
//                           <div className="details">
//                             <h4>
//                               <Link
//                                 onClick={ClickHandler}
//                                 to={`/highlight-single/${blog?.id}`}
//                               >
//                                 {Title.length > 60
//                                   ? `${Title.substring(0, 60)}...`
//                                   : Title}
//                               </Link>
//                             </h4>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HighlightsNews;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../HighlightsNews/HighlightsNews.css"; // Import the CSS file for styling
import globalEnv from "../../api/globalenv.js";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import Pagination from "react-bootstrap/Pagination";
import "./HighlightsNews.css";
import { AiOutlinePlus } from "react-icons/ai";

const truncate = require("truncate");

const HighlightsNews = (props) => {
  const [articles, setArticles] = useState([]);
  const [latest, setLatest] = useState([]);
  const [category, setCategory] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [currentPage] = useState(1);
  // const [itemsPerPage] = useState(6);
  const [archived, setArchived] = useState([]);
  const [visibleItems, setVisibleItems] = useState(6);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  useEffect(() => {
    fetch(`${globalEnv.api}/api/articles?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(
      `${globalEnv.api}/api/articles?filters[Archived][$eq]=true&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setArchived(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`${globalEnv.api}/api/categories?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(
      `${globalEnv.api}/api/articles?pagination[page]=1&pagination[pageSize]=6&sort[0]=createdAt:desc&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setLatest(data.data);
      })
      .catch((error) => console.error(error));
  }, [currentPage]);

  const totalItems = articles.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const displayData = articles.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const uniqueTags = new Set();
  const objectsWithUniqueTags = [];

  for (const obj of articles) {
    if (!uniqueTags.has(obj?.attributes?.Tag)) {
      uniqueTags.add(obj?.attributes?.Tag);
      objectsWithUniqueTags.push(obj);
    }
  }
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const loadMoreItems = () => {
    if (visibleItems + 6 >= totalItems) {
      setVisibleItems(totalItems);
      setLoadMoreVisible(false);
    } else {
      setVisibleItems(visibleItems + 6);
    }
  };

  const filteredItems = articles.slice(0, visibleItems);

  return (
    <>
      <style>{`
        .it-blog-wrapper .ca-service__item-title a {
          overflow: hidden;
          display: -webkit-box !important;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
       
      `}</style>

      <section className="wpo-blog-highlights-section">
        <div className="container">
          <div className="wpo-section-title">
            <h2>Posts</h2>
          </div>
          <div className="row">
            <div className={`col col-lg-8 col-md-12 ${props.colClass}`}>
              <div className="wpo-blog-highlights-wrap">
                <div className="wpo-blog-items">
                  <div className="row">
                    <div className="row">
                      {filteredItems.map((item, i) => (
                        <div key={i} className="col-lg-6">
                          <div
                            className="it-blog tp-lasted-blog mb-30 aos-init aos-animate it-blog-wrapper"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                          >
                            <div className="it-blog__thumb w-img">
                              <div className="fix">
                                <img
                                  src={`${globalEnv.api}${item?.attributes?.Image?.data[0]?.attributes?.url}`}
                                  alt="them-pure"
                                  effect="blur"
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "cover",
                                    aspectRatio: "1.5 / 1",
                                  }}
                                />
                              </div>

                              <div className="it-blog-date">
                                <span className="date">
                                  <b>
                                    {new Date(
                                      item?.attributes?.createdAt
                                    ).getDate()}
                                  </b>
                                  {
                                    months[
                                      new Date(
                                        item?.attributes?.createdAt
                                      ).getMonth()
                                    ]
                                  }
                                </span>
                              </div>
                            </div>
                            <div className="it-blog-info white-bg">
                              <button
                                style={{
                                  border: "1px solid #3756f7",
                                  padding: "2px 5px",
                                  borderRadius: "25px",
                                  marginBottom: "15px",
                                  color: "black",
                                  fontSize: "12px",
                                }}
                              >
                                {
                                  item?.attributes?.Category?.data?.attributes
                                    ?.Title
                                }
                              </button>
                              <h3 className="ca-service__item-title mb-30">
                                <Link
                                  to={`/highlight-single/${item?.id}`}
                                  style={{ color: "#032B5F" }}
                                >
                                  {truncate(item.attributes.Title, 60)}
                                </Link>
                              </h3>
                              <div
                                className="tp-seo-full-btn"
                                style={{ "--tp-theme-redical": "#3756f7" }}
                              >
                                <Link
                                  to={`/highlight-single/${item?.id}`}
                                  className="it-portfolio-item__btn"
                                >
                                  Read More
                                  <span className="mt-1">
                                    <i className="fal fa-long-arrow-right"></i>
                                    <i className="fal fa-long-arrow-right"></i>
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* <Pagination>
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <FaChevronLeft />
                </Pagination.Prev>

                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index}
                    active={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <FaChevronRight />
                </Pagination.Next>
              </Pagination> */}
              {loadMoreVisible && (
                <div className="pt-istop-btn-wrapper  text-center mt-30 ">
                  <button className="tp-common-btn text-center " onClick={loadMoreItems}>
                
                    <span className="text-center button-space">
                      <span>
                    Load More
                    </span>
                    <span>
                      <AiOutlinePlus />
                      </span>
                    </span>
                  </button>
                </div>
              )}
            </div>
            <div className={`col col-lg-4 col-md-12 ${props.hideClass}`}>
              <div className="blog-sidebar">
                <div className="widget category-widget">
                  <h3 style={{ fontWeight: "700", color: "#070707" }}>
                    Post Categories
                  </h3>
                  <ul>
                    {category.map((blog) => (
                      <li key={blog?.id}>
                        <Link
                          onClick={ClickHandler}
                          to={`/blog/${blog?.attributes?.Title}`}
                        >
                          {blog?.attributes?.Title}
                          <span>
                            ({blog?.attributes?.Articles?.data?.length})
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="widget recent-post-widget">
                  <h3 style={{ fontWeight: "700", color: "#070707" }}>
                    Latest Post
                  </h3>
                  {latest.slice(0, 5).map((blog, bitem) => (
                    <div className="posts" key={bitem}>
                      <div className="post">
                        <div className="img-holder">
                          <img
                            src={`${globalEnv.api}${blog?.attributes?.Image?.data[0]?.attributes?.url}`}
                            alt=""
                          />
                        </div>
                        <div className="details">
                          <span className="date">
                            {new Date(
                              blog?.attributes?.createdAt
                            ).toLocaleDateString("en-GB")}{" "}
                          </span>
                          <h4>
                            <Link
                              onClick={ClickHandler}
                              to={`/highlight-single/${blog.id}`}
                            >
                              {truncate(blog.attributes.Title, 60)}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="widget recent-post-widget">
                  <h3 style={{ fontWeight: "700", color: "#070707" }}>
                    Archived Content
                  </h3>
                  {archived.slice(0, 5).map((blog, bitem) => (
                    <div className="posts" key={bitem}>
                      <div className="post">
                        <div className="img-holder">
                          <img
                            src={`${globalEnv.api}${blog?.attributes?.Image?.data[0]?.attributes?.url}`}
                            alt=""
                          />
                        </div>
                        <div className="details">
                          <h4>
                            <Link
                              onClick={ClickHandler}
                              to={`/highlight-single/${blog?.id}`}
                            >
                              {truncate(blog?.attributes?.Title, 60)}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HighlightsNews;
