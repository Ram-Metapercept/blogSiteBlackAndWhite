// const selectPicker = (e) => {
//   // const dropDown = document.getElementById("selectpicker");
//   console.log("first picker selected", e.target.getElementsByTagName("option"));
//   const lang = ["English", "French", "German", "Spanish"];
//   let options = e.target.getElementsByTagName("option");
//   console.log(options);
//   for (var i = 0; i < options.length; i++) {
//     console.log(options[i].innerText);
//     options[i].innerText = lang[i];
//     // options[i].innerHTML = options[i].value;
//     console.log(options[i].innerText);
//   }
// };

// function googleTranslateElementInit() {
//   if (window && window.google && window.google.translate) {
//     new window.google.translate.TranslateElement(
//       {
//         pageLanguage: "en",
//         layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//         autoDisplay: false,
//       },
//       "google_translate_element"
//     );
//   } else {
//     console.error("google_translate_element initialization failed");
//   }
// }

// export function translateLanguage(e) {
//   googleTranslateElementInit();
//   console.log("language: " + e);
//   var frame = document.querySelector(".VIpgJd-ZVi9od-xl07Ob-OEVmcd");
//   if (!frame) {
//     console.error("Error: Could not find Google translate frame.");
//     // return false;
//   }

//   var spans = frame.contentDocument.querySelectorAll(
//     ".VIpgJd-ZVi9od-vH1Gmf-ibnC6b span.text"
//   );

//   localStorage.setItem("currentLang", e);

//   console.log(spans);
//   for (var i = 0; i < spans.length; i++) {
//     console.log(spans[i].textContent);
//     if (spans[i].textContent.includes(e)) {
//       console.log("clicked freanch", spans[i]);
//       spans[i].click();
//       spans[i].click();
//       // return false;
//     }
//   }
// }





function googleTranslateElementInit() {
  if (window && window.google && window.google.translate) {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
  } else {
    console.error("google_translate_element initialization failed");
  }
}

export function translateLanguage(e) {
  googleTranslateElementInit();
  // console.log("language: " + e.target.value);
  var frame = document.querySelector(".VIpgJd-ZVi9od-xl07Ob-OEVmcd");
  if (!frame) {
    console.error("Error: Could not find Google translate frame.");
    // return false;
  }

  var spans = frame.contentDocument.querySelectorAll(
    ".VIpgJd-ZVi9od-vH1Gmf-ibnC6b span.text"
  );

  localStorage.setItem("currentLang", e);

  // console.log(spans);
  for (var i = 0; i < spans.length; i++) {
    // console.log(spans[i].textContent);
    if (spans[i].textContent.includes(e)) {
      // console.log("clicked freanch", spans[i]);
      spans[i].click();
      spans[i].click();
      // return false;
    }
  }
}
