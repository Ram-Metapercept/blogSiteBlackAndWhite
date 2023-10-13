
import React, { useEffect, useState } from "react";
import { Link ,useNavigate  } from "react-router-dom";
import NavMenu from "./nav-menu-new";
import Logo1 from "../../images/Metapercept_footer_logo2.svg";
import Sidebar from "./sidebar-new";
import "../../css/mainHeader.css";
import MainSiteUrl from "../../api/MainSiteUrl";
import "./header.css"
import { loadGoogleTranslateScript } from './googleTranslateManager';

import { useLocation } from 'react-router-dom';
const useSticky = () => {
  const [sticky, setSticky] = useState(false);

  const stickyHeader = () => {
    if (window.scrollY > 200) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", stickyHeader);
  }, []);

  return {
    sticky,
  };
};


const NewHeader = (style_home_one) => {
  const { sticky } = useSticky();
  const [isActive, setIsActive] = useState(false);


  
// const googleTranslateElementInit = () => {
//   console.log("Initializing Google Translate...");
//   new window.google.translate.TranslateElement({
//     pageLanguage: 'en',
//     autoDisplay: true,
//     includedLanguages: 'en,es,de,fr',
//     layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
//   }, 'google_translate_element');
//   console.log("Google Translate initialized.");
// }

  // useEffect(() => {
  //   let script;

  //   const addScript = () => {
  //     if (typeof window.google === 'undefined') {
  //       const script = document.createElement('script');
  //       script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  //       script.async = true;
  //       document.body.appendChild(script);
  //       script.addEventListener('load', googleTranslateElementInit);
  //     } else if (typeof window.google.translate !== 'undefined') {
  //       // Script is loaded, but translation is not yet defined, so initialize it
  //       googleTranslateElementInit();
  //     }
  //   };

  //   const removeScript = () => {
  //     if (script) {
  //       document.body.removeChild(script);
  //     }
  //     // const translateElement = document.getElementById('google_translate_element');
  //     // if (translateElement) {
  //     //   translateElement.innerHTML = '';
  //     // }
  //   };
  //   removeScript();
  //   addScript();

  //   return () => {
  //     removeScript();
  //   };
  // }, []);
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: "true",
        includedLanguages: "en,es,de,fr",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };

useEffect(() => {
  console.log("afsh")
  
 
  const id = "google-translate-script";
  const addScript = () => {
    const s = document.createElement("script");
    try {
      s.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      s.setAttribute("id", id);
      s.async=true
      const q = document.getElementById(id);
      if (!q) {
        document.body.appendChild(s);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }
    } catch (error) {
      console.log(error)
    }
   
  };

  const removeScript = () => {
    const q = document.getElementById(id);
    if (q) q.remove();
    const w = document.getElementById("google_translate_element");
    if (w) w.innerHTML = "";
  };

  removeScript();
      addScript();
    
},[])

// useEffect(()=>{
//     // document.body.insertAdjacentHTML("beforeend",'<script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>')
//   const googleTranslateElementInit = () => {
//   new window.google.translate.TranslateElement(
//     {
//       pageLanguage: "en",
//       autoDisplay: "true",
//       includedLanguages: "en,es,de,fr",
//       // layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//     },
//     "google_translate_element"
//   );
// };
// googleTranslateElementInit();},[])



// useEffect(() => {
//   // const googleTranslateElementInit = () => {
//   //   new window.google.translate.TranslateElement(
//   //     {
//   //       pageLanguage: 'en',
//   //       autoDisplay: false,
//   //     },
//   //     'google_translate_element'
//   //   );
//     // After initializing the Google Translate widget, set its style if it exists
//     const translateElement = document.getElementById('google_translate_element');
//     if (translateElement) {
//       translateElement.style.display = 'block'; // Set the desired style here
//     }
//   // };

//   const loadGoogleTranslateScript = (retryCount = 0) => {
//     if (typeof window.google !== 'undefined' && typeof window.google.translate !== 'undefined') {
//       setIsScriptLoaded(true);
//     } else {
//       if (retryCount < 3) {
//         const script = document.createElement('script');
//         script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//         script.async = true;
//         script.addEventListener('load', () => {
//           setIsScriptLoaded(true);
//           googleTranslateElementInit();
//         });
//         document.body.appendChild(script);
//       }
//     }
//   };

//   loadGoogleTranslateScript();

//   return () => {
//     // Cleanup code here if needed
//   };
// }, []);



  
  return (
    <>
  
      <header>
        <div
          className={`${
            style_home_one ? "" : "tp-header__1 theme-bg p-relative"
          }`}
        >
          <div
            id="header-sticky"
            className={`tp-header__1-main header-border-button pl-105 pr-105  ${
              sticky ? "header-sticky" : ""
            }`}
          >
            <div className="container-fluid p-relative">
            <div id="google_translate_element" className="d-none d-xl-block"></div>
            <div>
      {/* {!isScriptLoaded && <p>Loading Google Translate...</p>}
      {isScriptLoaded && <div id="google_translate_element"></div>} */}
      {/* Your component JSX */}
    </div>
            {/* <div id="google_translate_element" style={{width:'0px',height:'0px',position:'absolute',left:'50%',zIndex:-99999}}></div> */}
     
              <div className="mega-menu-wrapper">
                <div className="row align-items-center">
                  {/* <div className="col-xxl-3 col-xl-3 col-6"> */}
                  <div className="col-xxl-3 col-xl-2 col-6">
                    <div className="logo border-right">
                      <Link to={`${MainSiteUrl.url}`} target="_blank">
                        <img
                          src={Logo1}
                          alt="logo"
                          style={{ maxWidth: "200px", minWidth: "150px" }}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="col-xxl-7 col-xl-8 d-none d-xl-flex justify-content-center">
                    <div className="main-menu p-relative">
                      <nav id="mobile-menu">
                        <NavMenu />
                      </nav>
                    </div>
                  </div>
                  <div className="col-xxl-2 col-xl-2 col-md-6 col-6">
                    <div className="tp-header__1-right d-flex justify-content-end align-items-center">
                   <div className="header-mail-info mt-4">
                     
                        <a
                          href="mailto:info@metapercept.com"
                          style={{
                            textTransform: "lowercase",
                            fontSize: "18px",
                            fontWeight:"400",
                            color: "#070707",
                          }}
                        >
                         
                          {/* <i className="fas fa-envelope-open "></i> */}
                          info@metapercept.com
                        </a>
                      </div> 
                      
                   
                      <div className="tp-header-search-nav d-flex justify-content-end d-xl-none">
                        <div
                          className="tp-header-nav"
                          onClick={() => setIsActive(true)}
                        >
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar isActive={isActive} setIsActive={setIsActive} />
    </>
  );
};

export default NewHeader;


