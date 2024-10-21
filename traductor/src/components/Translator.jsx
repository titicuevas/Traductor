import { useState, useEffect } from 'react';
import { translateText } from '../lib/libreTranslate';
import { LanguageSelector } from './LanguageSelector';
import '../App.css';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('EN');
  const [targetLanguage, setTargetLanguage] = useState('ES');

  // Traduce el texto cada vez que el texto de entrada, el idioma de origen o el idioma de destino cambian.
  useEffect(() => {
    const handleTranslate = async () => {
      if (inputText) {
        const translation = await translateText(inputText, targetLanguage, sourceLanguage);
        console.log(`Translation result: ${translation}`);
        setTranslatedText(translation);
      } else {
        setTranslatedText('');
      }
    };
    handleTranslate();
  }, [inputText, sourceLanguage, targetLanguage]);

  // Intercambia los idiomas y traduce el texto de entrada en el nuevo idioma.
  const handleSwapLanguages = async () => {
    // Intercambia los idiomas
    const tempSource = sourceLanguage;
    const tempTarget = targetLanguage;

    // Intercambia los idiomas en los estados
    setSourceLanguage(tempTarget);
    setTargetLanguage(tempSource);

    // Traduce el texto de entrada con los nuevos idiomas
    const newTranslation = await translateText(inputText, tempTarget, tempSource);
    setInputText(newTranslation); // Establece el texto de entrada al texto traducido
    setTranslatedText(inputText); // Establece el texto traducido al texto original
  };

  return (
    <div className="translator-container">
      <h1>Traductor</h1>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5 mb-3 text-area-container">
          <LanguageSelector
            language={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          />
          <textarea
            className="form-control"
            rows="8"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ingresa el texto a traducir"
            style={{ resize: 'none' }}
          />
        </div>
        <div className="col-md-2 text-center">
          <button className="btn btn-secondary swap-btn" onClick={handleSwapLanguages}>
            ↔️
          </button>
        </div>
        <div className="col-md-5 mb-3 text-area-container">
          <LanguageSelector
            language={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          />
          <textarea
            className="form-control"
            rows="8"
            value={translatedText}
            readOnly
            placeholder="Texto traducido aparecerá aquí"
            style={{ resize: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Translator;
