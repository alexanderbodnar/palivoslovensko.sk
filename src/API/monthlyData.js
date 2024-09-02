const apiStart = `https://data.statistics.sk/api/v2/dataset/sp0207ts/`;
const apiEnd = "?lang=sk&type=json";

export const getDataWithParams = async (week = "all", fuel = "all") => {
  const response = await fetch(`${apiStart}${week}/${fuel}${apiEnd}`);
  const result = await response.json();
  return result;
};
