import React,{useEffect} from "react";
import PrivacyPolicyArea from "./privacy-policy-area";
import PrivacyHeader from "../hero/privacyHeader";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/footer-12";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ "--tp-heading-primary": "var(--tp-theme-vogue)" }}>
      <Navbar />
      <PrivacyHeader />
      <PrivacyPolicyArea />
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
