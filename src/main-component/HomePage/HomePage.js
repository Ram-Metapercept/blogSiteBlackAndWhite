import React, { Fragment,useEffect } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/hero/hero";
import Scrollbar from "../../components/scrollbar/scrollbar";
import HighlightsNews from "../../components/HighlightsNews/HighlightsNews";
import Footer from "../../components/footer/footer-12";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <Navbar hclass={"wpo-header-style-1"} topbarNone={"topbar-none"} />
      <Hero />
      <Container>
        <HighlightsNews />
      </Container>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default HomePage;
