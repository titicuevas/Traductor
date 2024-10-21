import PropTypes from 'prop-types';

const languages = [
  { code: 'EN', name: 'English' },   // Inglés
  { code: 'ES', name: 'Español' },    // Español
  { code: 'FR', name: 'Français' },   // Francés
  { code: 'IT', name: 'Italiano' },   // Italiano
  { code: 'DE', name: 'Deutsch' },    // Alemán
];

const LanguageSelector = ({ language, onChange }) => {
  return (
    <select className="form-select mb-2" value={language} onChange={onChange}>
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

// Validación de propiedades con PropTypes
LanguageSelector.propTypes = {
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { LanguageSelector };