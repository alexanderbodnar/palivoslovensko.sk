import { useStatisticsSectionContext } from "../../Context/StatisticsSectionContext";
import { useTranslation } from "react-i18next";
import Spinner from "../Common/Spinner";

function getFuelWithMaxOrMinValue(fuelArray, type) {
  if (type !== "max" && type !== "min") {
    throw new Error("Invalid input: type must be 'max' or 'min'");
  }

  return fuelArray?.map((fuel) => {
    const validMeasures = fuel.measuresArray.filter(
      (measure) => typeof measure.value === "number"
    );

    if (validMeasures.length === 0) {
      return { name: fuel.name, value: null, week: null };
    }

    const desiredMeasure = validMeasures.reduce((acc, current) => {
      if (type === "max") {
        return current.value > acc.value ? current : acc;
      } else {
        return current.value < acc.value ? current : acc;
      }
    }, validMeasures[0]);

    return {
      name: fuel.name,
      value: desiredMeasure.value,
      week: desiredMeasure.week,
    };
  });
}

export default function RecordsTable({ type }) {
  const { data, loading } = useStatisticsSectionContext();
  const { t } = useTranslation();

  if (loading) return <Spinner />;
  const processedData = getFuelWithMaxOrMinValue(data, type);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse table-auto">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">{t("common.fuelName")}</th>
            <th className="px-4 py-2 text-left">{t("common.price")}</th>
            <th className="px-4 py-2 text-left">{t("common.week")}</th>
          </tr>
        </thead>
        <tbody>
          {processedData?.map((fuel, index) => (
            <tr
              key={index}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-4 py-2">{fuel.name}</td>
              <td className="px-4 py-2">
                {fuel.value !== null ? fuel.value : "N/A"}
              </td>
              <td className="px-4 py-2">
                {fuel.week !== null ? fuel.week : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
