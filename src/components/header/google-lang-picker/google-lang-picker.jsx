import React, { useEffect, useState } from "react";
import { translateLanguage } from "./google-language-selector";
import "./google-picker.css";
function GoogleLangPicker({ classes = "" }) {
  const [language, setLanguage] = useState("");

  useEffect(() => {
    // console.log(localStorage.getItem("currentLang"), language);
    let lang = localStorage.getItem("currentLang") || "English";
    // if (lang) {
    //   translateLanguage(lang);
    // }
    window.onload = function () {
      console.log("in window.onload", lang);
      translateLanguage(lang);
    };
    setLanguage(lang);
  }, []);
  return (
    <select
      key={language}
      className={` selectpicker ${classes}`}
      id="selectpicker"
      data-width="fit"
      defaultValue={language}
      onClick={(e) => {
        translateLanguage(e.target.value);
      }}
    >
      <option value="English" translate="no">
        English
      </option>
      <option value="French" translate="no">
        French
      </option>
      <option value="German" translate="no">
        German
      </option>
      <option value="Spanish" translate="no">
        Spanish
      </option>
    </select>
  );
}

export default GoogleLangPicker;
