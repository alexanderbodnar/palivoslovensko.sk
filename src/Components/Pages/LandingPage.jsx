import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const { t } = useTranslation();
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t("landingPage.welcome")}
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="statistiky"
            className="animate-bounce rounded-md text-lg font-semibold bg-indigo-600 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 p-4"
          >
            {t("landingPage.goToStatistics")}
          </a>
        </div>
      </div>
    </main>
  );
}
