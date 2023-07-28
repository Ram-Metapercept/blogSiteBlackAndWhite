
const sitemap_data = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "/services",
    title: "Services",
    subMenu: [
      {
        link: "/services/softwaredevelopment",
        title: "Software Development",
        subMenu: [
          {
            link: "/services/softwaredevelopment/webdevelopment",
            title: "Web Development",
          },
          {
            link: "/services/softwaredevelopment/devops",
            title: "DevOps",
          },
          {
            link: "/services/softwaredevelopment/integration",
            title: "Application integration",
          },
        ],
      },
      {
        link: "/services/technicalwriting",
        title: "Technical Writing",
        subMenu: [
          {
            link: "/services/technicalwriting/docmigration",
            title: "Document Migration",
          },
          {
            link: "/services/technicalwriting/structureauth",
            title: "Structured Authoring",
          },
          {
            link: "/services/technicalwriting/contentconversion",
            title: "Content Conversion",
          },
          {
            link: "/services/technicalwriting/edit_proof",
            title: "Editing & Proofreading",
          },
          {
            link: "/services/technicalwriting/templatedesign",
            title: "Template Design & Development",
          },
          {
            link: "/services/technicalwriting/knowledge",
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
    link: "/solutions",
    title: "Solutions",
    subMenu: [
      {
        link: "/solutions/softwareengineering",
        title: "Software Engineering",
      },
      {
        link: "/solutions/technicalpublication",
        title: "Technical Publication",
      },
      {
        link: "/solutions/informationarchitecture",
        title: "Information Architecture",
      },
      {
        link: "/solutions/staffaugmentation",
        title: "Staff Augmentation",
      },
      // {
      //   link: "#",
      //   title: "Consulting",
      //   subMenu: [
      //     {
      //       link: "/solutions/contentmigration",
      //       title: "Content Migration",
      //     },
      //     {
      //       link: "/solutions/informationarchitecture",
      //       title: "Information Architecture",
      //     },
      //     {
      //       link: "/solutions/contentstrategy",
      //       title: "Content Strategy",
      //     },
      //     {
      //       link: "/solutions/staffaugmentation",
      //       title: "Staff Augmentation",
      //     },
      //   ],
      // },
    ],
  },
  {
    link: "/aboutus",
    title: "About Us",
    subMenu: [
      {
        link: "/aboutus/company",
        title: "Company",
        subMenu: [
          {
            link: "#",
            title: "Our Team",
          },
        ],
      },
      // {
      //   link: "/aboutus",
      //   title: "Business Partners",
      // },
      // {
      //   link: "/aboutus",
      //   title: "Industries",
      // },
      {
        link: "#",
        title: "Portfolio",
      },
      {
        link: "#",
        title: "Careers",
      },
    ],
  },
  {
    link: "/contact",
    title: "Contact Us",
  },
  {
    link: "/privacy-policy",
    title: "Privacy Policy",
  },
];

export { sitemap_data };
