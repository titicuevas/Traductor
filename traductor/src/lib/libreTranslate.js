export const translateText = async (text, targetLanguage) => {
    const apiKey = "cd01ca9a-91d7-446b-be73-7cb9758f9f36";
    const url = `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}:fx&text=${encodeURIComponent(text)}&target_lang=${targetLanguage}`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to translate text: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data && data.translations && data.translations.length > 0) {
        return data.translations[0].text;
      } else {
        throw new Error("No translation available");
      }
    } catch (error) {
      console.error("Error translating text:", error);
      return text; // Devuelve el texto original en caso de error
    }
  };
  