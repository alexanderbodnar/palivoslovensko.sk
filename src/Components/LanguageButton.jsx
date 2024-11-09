export default function LanguageButton({ code, language, i18n }) {
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <button
        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
        onClick={() => changeLanguage(code)}
      >
        {language}
      </button>
    </>
  );
}
