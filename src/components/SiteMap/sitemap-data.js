import siteMapUrl from "../../api/siteMapUrl";
import portfolioUrl from "../../api/portfolioUrl";
import careerUrl from "../../api/careerUrl";
const sitemap_data = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: `${siteMapUrl.url}/services`,
    title: "Services",
    subMenu: [
      {
        link: `${siteMapUrl.url}/services/softwaredevelopment`,
        title: "Software Development",
        subMenu: [
          {
            link: `${siteMapUrl.url}/services/softwaredevelopment/webdevelopment`,
            title: "Web Development",
          },
          {
            link: `${siteMapUrl.url}/services/softwaredevelopment/devops`,
            title: "DevOps",
          },
          {
            link: `${siteMapUrl.url}/services/softwaredevelopment/integration`,
            title: "Application integration",
          },
        ],
      },
      {
        link: `${siteMapUrl.url}/services/technicalwriting`,
        title: "Technical Writing",
        subMenu: [
          {
            link: `${siteMapUrl.url}/services/technicalwriting/docmigration`,
            title: "Document Migration",
          },
          {
            link: `${siteMapUrl.url}/services/technicalwriting/structureauth`,
            title: "Structured Authoring",
          },
          {
            link: `${siteMapUrl.url}/services/technicalwriting/contentconversion`,
            title: "Content Conversion",
          },
          {
            link: `${siteMapUrl.url}/services/technicalwriting/edit_proof`,
            title: "Editing & Proofreading",
          },
          {
            link: `${siteMapUrl.url}/services/technicalwriting/templatedesign`,
            title: "Template Design & Development",
          },
          {
            link: `${siteMapUrl.url}/services/technicalwriting/knowledge`,
            title: "Knowledge Management",
          },
        ],
      },
      {
        link: "#",
        title: "Training & certification",
      },
    ],
  },
  {
    link: `${siteMapUrl.url}/solutions`,
    title: "Solutions",
    subMenu: [
      {
        link: `${siteMapUrl.url}/solutions/softwareengineering`,
        title: "Software Engineering",
      },
      {
        link: `${siteMapUrl.url}/solutions/technicalpublication`,
        title: "Technical Publication",
      },
      {
        link: `${siteMapUrl.url}/solutions/informationarchitecture`,
        title: "Information Architecture",
      },
      {
        link: `${siteMapUrl.url}/solutions/staffaugmentation`,
        title: "Staff Augmentation",
      },

    ],
  },
  {
    link: `${siteMapUrl.url}/aboutus`,
    title: "About Us",
    subMenu: [
      {
        link: `${siteMapUrl.url}/aboutus/company`,
        title: "Company",
        subMenu: [
          {
            link: `${careerUrl.url}`,
            title: "Our Team",
          },
        ],
      },
  
      {
        link: `${portfolioUrl.url}`,
        title: "Portfolio",
      },
      {
        link: `${careerUrl.url}`,
        title: "Careers",
      },
    ],
  },
  {
    link: `${siteMapUrl.url}/contact`,
    title: "Contact Us",
  },
  {
    link: `${siteMapUrl.url}/privacy-policy`,
    title: "Privacy Policy",
  },
];

export { sitemap_data };
