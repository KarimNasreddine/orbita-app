export const dateTransformer = (gregorianDate: string) => {
  const date = new Date(gregorianDate!);

  const year = date.getFullYear(); // 1
  const month = date.getMonth() + 1; // 1 (January)
  const day = date.getDate(); // 1

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`; // "1-01-01"
  return formattedDate;
};
