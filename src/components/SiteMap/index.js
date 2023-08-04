import React,{useEffect}from "react";
import SitemapArea from "./sitemap-area";
import SiteMapHeader from "../hero/siteMapHeader";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/footer-12";


function SiteMap() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div >
      <Navbar/>
      <SiteMapHeader/>
      <SitemapArea />
      <Footer/>
    </div>
  );
}

export default SiteMap;
