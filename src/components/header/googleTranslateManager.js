// googleTranslateManager.js

export function loadGoogleTranslateScript() {
    return new Promise((resolve, reject) => {
      if (typeof window.google !== 'undefined' && typeof window.google.translate !== 'undefined') {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        script.defer = true;
        script.addEventListener('load', resolve);
        script.addEventListener('error', reject);
        document.body.appendChild(script);
      }
    });
  }
  