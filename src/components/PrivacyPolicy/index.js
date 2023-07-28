
import React from "react";
import PrivacyPolicyArea from "./privacy-policy-area";
import Hero from "../hero/hero";

function PrivacyPolicy() {
  return (
    <div style={{ "--tp-heading-primary": "var(--tp-theme-vogue)" }}>
       <Hero/>
      <PrivacyPolicyArea />
    </div>
  );
}

export default PrivacyPolicy;
