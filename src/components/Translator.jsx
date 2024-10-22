import { useState, useEffect } from 'react'
import { translateText } from '../lib/libreTranslate'
import { LanguageSelector } from './LanguageSelector'
import '../App.css'

// Función debounce fuera del componente
const debounce = (func, delay) => {
  let debounceTimeout
  return (...args) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }
    debounceTimeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

const Translator = () => {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('EN')
  const [targetLanguage, setTargetLanguage] = useState('ES')

  // Almacena la función debouncedHandleTranslate fuera del useEffect
  const debouncedHandleTranslate = debounce(async (text) => {
    if (text) {
      const translation = await translateText(text, targetLanguage, sourceLanguage)
      setTranslatedText(translation)
    } else {
      setTranslatedText('')
    }
  }, 500)

  // Llamada a la traducción cuando cambia el inputText, sourceLanguage o targetLanguage
  useEffect(() => {
    debouncedHandleTranslate(inputText)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, sourceLanguage, targetLanguage])

  // Función para intercambiar los idiomas
  const handleSwapLanguages = async () => {
    const tempSource = sourceLanguage
    const tempTarget = targetLanguage

    setSourceLanguage(tempTarget)
    setTargetLanguage(tempSource)

    // Traducir el texto actual con los nuevos idiomas
    if (inputText) {
      const newTranslation = await translateText(inputText, tempTarget, tempSource)
      setInputText(newTranslation) // Actualiza el texto de entrada con la nueva traducción
      setTranslatedText('') // Limpiar el texto traducido para evitar confusión
    } else {
      setTranslatedText('') // Limpia el texto traducido si no hay entrada
    }
  }

  return (
    <div className="translator-container">
      <h1 className="text-center mb-4">Traductor</h1>
      <div className="row">
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
          />
        </div>
      </div>
    </div>
  )
}

export default Translator
