import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/footer-12";
import HighlightDetails from "./highlight/HighlightDetails";
import globalEnv from "../../api/globalenv.js";

const HighlightSingle = () => {
  const [article, setArticle] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    fetch(`${globalEnv.api}/api/articles/${slug}?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data.data);
      })
      .catch((error) => console.error(error));
  }, [slug]);
  return (
    <Fragment>
      <Navbar />
      <PageTitle pageTitle={article?.attributes?.Title} />
      <HighlightDetails article={article} slug={slug} />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default HighlightSingle;
