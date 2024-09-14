const apiURL = `https://data.statistics.sk/api/v2/dataset/sp0207ts/`;

export const getDataWithParams = async (
  week = "all",
  fuel = "all",
  lang = "sk"
) => {
  const response = await fetch(
    `${apiURL}${week}/${fuel}?lang=${lang}&type=json`
  );
  console.log(`${apiURL}${week}/${fuel}?lang=${lang}&type=json`);
  const result = await response.json();
  return result;
};
