export default function LanguageButton({ code, language, i18n }) {
  const changeLanguage = (language) => {
    console.log(language);
    i18n.changeLanguage(language);
  };

  return (
    <>
      <button onClick={() => changeLanguage(code)}>{language}</button>
    </>
  );
}
