import React, { Fragment } from "react";
import PageTitle from "../../components/pagetitle/PageTitle";
import BlogList from "../../components/BlogList/BlogList.js";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer-12";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const { slug } = useParams();

  return (
    <Fragment>
      <Navbar />
      <PageTitle pageTitle={`Category/${slug}`} pagesub={"Blog"} />
      <BlogList slug={slug} />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default BlogPage;
