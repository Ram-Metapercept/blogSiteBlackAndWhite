// import React, { useEffect, useState } from "react";
// import { translateLanguage } from "./google-language-selector";
// import "./google-picker.css";
// function GoogleLangPicker({ classes = "" }) {
//   const [language, setLanguage] = useState("");

//   useEffect(() => {
//     // console.log(localStorage.getItem("currentLang"), language);
//     let lang = localStorage.getItem("currentLang") || "English";
//     // if (lang) {
//     //   translateLanguage(lang);
//     // }
//     window.onload = function () {
//       console.log("in window.onload", lang);
//       translateLanguage(lang);
//     };
//     setLanguage(lang);
//   }, []);
//   return (
//     <select
//       key={language}
//       className={` selectpicker ${classes}`}
//       id="selectpicker"
//       data-width="fit"
//       defaultValue={language}
//       onClick={(e) => {
//         translateLanguage(e.target.value);
//       }}
//     >
//       <option value="English" translate="no">
//         English
//       </option>
//       <option value="French" translate="no">
//         French
//       </option>
//       <option value="German" translate="no">
//         German
//       </option>
//       <option value="Spanish" translate="no">
//         Spanish
//       </option>
//     </select>
//   );
// }

// export default GoogleLangPicker;


import React, { useEffect, useState } from "react";
import { translateLanguage } from "./google-language-selector";
import imggr from "../../../images/german.png"
import imgsp from "../../../images/spain.png"
import imen from "../../../images/english.png"
import imgfr from "../../../images/france.png"
import "./google-picker.css";
// function GoogleLangPicker({ classes = "" }) {
//   const [language, setLanguage] = useState("");

//   useEffect(() => {
//     let lang = localStorage.getItem("currentLang") || "English";

//     window.onload = function () {
//       translateLanguage(lang);
//     };
//     setLanguage(lang);
//   }, []);
//   return (
//     <select
//       key={language}
//       className={` selectpicker ${classes}`}
//       id="selectpicker"
//       data-width="fit"
//       defaultValue={language}
//       onClick={(e) => {
//         translateLanguage(e.target.value);
//       }}
//     >
//       <option value="English" translate="no">
//       English
//       </option>
//       <option value="French" translate="no">
//        French
//       </option>
//       <option value="German" translate="no">
//       German
//       </option>
//       <option value="Spanish" translate="no">
//         Spanish
//       </option>
//     </select>
//   );
// }

// export default GoogleLangPicker;



// import { translateLanguage } from "@/utils/google-language-selector";
// import React, { useEffect, useState } from "react";

function GoogleLangPicker({ classes = "" }) {
  const options = [
    {
      label: "en",
      image: imen,
      language: "English",
    },
    {
      label: "es",
      image: imgsp,
      language: "Spanish",
    },
    {
      label: "de",
      image: imggr,
      language: "German",
    },

    {
      label: "fr",
      image:imgfr,
      language: "French",
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [language, setLanguage] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    let lang = localStorage.getItem("currentLang") || "English";
    window.onload = function () {
            translateLanguage(lang);
          };

    setLanguage(lang);
    let tempSelected = options.filter((option) => option.language === lang);
    // console.log(tempSelected);
    selectOption(tempSelected[0]);
  }, []);

  return (
    <>
      <div className={`dropdownCustom ${classes}`}>
        <div className="dropdown-toggle" onClick={toggleDropdown}>
          {selectedOption && (
            <img
              src={selectedOption.image}
              alt={selectedOption.label}
              width={20}
              className="dropdown-option-image mr-10"
            />
          )}
          <span className="dropdown-option-label" translate="no">
            {selectedOption ? selectedOption.label : "en"}
          </span>
          {/* <span className="dropdown-caret"></span> */}
          <ul
            className={`dropdown-menu-custom ps-0 ${
              isDropdownOpen ? "d-block" : "d-none"
            }`}
          >
            {options.map((option, index) => (
              <li
                className="me-0 d-block"
                key={index}
                onClick={() => {
                  selectOption(option);
                  translateLanguage(option.language);
                }}
                translate="no"
              >
                <img
                  width={20}
                  src={option.image}
                  alt={option.label}
                  className="dropdown-option-image mr-10"
                />
                <span className="dropdown-option-label">{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default GoogleLangPicker;



