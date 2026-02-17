import React, { useEffect } from 'react';
import './GoogleTranslate.css'; // Import the CSS file

const GoogleTranslate = () => {
  useEffect(() => {
    if (!document.getElementById('google_translate_script')) {
      const addScript = document.createElement('script');
      addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      addScript.type = 'text/javascript';
      addScript.id = 'google_translate_script';
      document.body.appendChild(addScript);
      // console.log('Google Translate script added');

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'hi,en,ta,te,ml,kn,gu,mr,bn,pa,or,as,ur', // Indian languages
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
        // console.log('Google Translate initialized with Indian languages');
      };
    }
  }, []);

  return <div id="google_translate_element" className="translate-element"></div>;
};

export default GoogleTranslate;
