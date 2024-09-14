export const fillWeeksArray = (data, numOfWeeks) => {
  const pricesArr = data.value;
  const splitedArr = [];

  for (let i = 0; i < pricesArr.length; i += numOfWeeks) {
    const chunk = pricesArr
      .slice(i, i + numOfWeeks)
      .map((value) => (value === null ? "No data" : value));
    splitedArr.push(chunk);
  }

  const weeksArr = Object.values(data.dimension.sp0207ts_tyz.category.label);
  const resultArray = [];

  weeksArr.forEach((week, index) => {
    let tableData = {
      weekName: week,
      fuelPrice: splitedArr[index],
    };

    resultArray.push(tableData);
  });

  return resultArray;
};
