import React from "react";

const social_links = [
  {
    link: "https://www.facebook.com/metapercepttechservices/",
    target: "_blank",
    icon: "fab fa-facebook-f",
    name: "Facebook",
    rel: "noreferrer",
    backColor: "rgb(8,109,56)",
    img: "/assets/img/footer/facebook.png",
  },
  {
    link: "https://twitter.com/MetaPercept",
    target: "_blank",
    icon: "fab fa-twitter",
    rel: "noreferrer",
    name: "Twitter",
    backColor: "rgb(50,77,160)",
    img: "/assets/img/footer/twitter.png",
  },
  {
    link: "https://www.linkedin.com/company/metapercept-technology-services-llp/mycompany/",
    target: "_blank",
    icon: "fa-brands fa-linkedin-in",
    rel: "noopener noreferrer", 
    name: "linkedin",
    backColor: "rgb(244,127,32)",
    img: "/assets/img/footer/linkedin.png",
  },
  {
    link: "https://blog.metapercept.com/",
    target: "_blank",
    rel: "noreferrer",
    icon: "fa-solid fa-blog",
    name: "blogs",
    backColor: "rgb(252,183,19)",
    img: "/assets/img/footer/media.png",
  },
];

const SocialLinks = () => {
  return (
    <>
      {social_links.map((item, i) => (
        <a
          key={i}
          target="_blank"
          rel="noreferrer" // Add rel="noreferrer" here
          href={item.link}
          style={{ backgroundColor: item.backColor, color: "whitesmoke" }}
          aria-label={item.name}
        >
          <i className={item.icon}></i>
        </a>
      ))}

      
    </>
  );
};

export default SocialLinks;

const social_links_home_two = [
  {
    link: "https://www.facebook.com/metapercepttechservices/",
    target: "_blank",
    rel: "noreferrer",
    icon: "fab fa-facebook-f",
    name: "Facebook",
  },
  {
    link: "https://twitter.com/MetaPercept",
    target: "_blank",
    icon: "fab fa-twitter",
    name: "Twitter",
    rel: "noreferrer",
  },
  {
    link: "https://www.linkedin.com/company/metapercept-technology-services-llp/mycompany/",
    target: "_blank",
    icon: "fa-brands fa-linkedin-in",
    name: "linkedin",
    rel: "noreferrer",
  },
  {
    link: "https://blog.metapercept.com/",
    target: "_blank",
    icon: "fa-solid fa-blog",
    name: "blogs",
    rel: "noreferrer",
  },
];

export const SocialLinksHomeTwo = () => {
  return (
    <>
      {social_links_home_two.map((item, i) => (
        <a
          key={i}
          target="_blank"
          rel="noreferrer" // Add rel="noreferrer" here
          href={item.link}
        >
          <i className={item.icon}></i>
        </a>
      ))}
    </>
  );
};
