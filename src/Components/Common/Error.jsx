import React from "react";
import { useTranslation } from "react-i18next";

export default function Error({ messageKey }) {
  const { t } = useTranslation();

  return (
    <div className="error-container bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">{t(messageKey)}</span>
    </div>
  );
}
