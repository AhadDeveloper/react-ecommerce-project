const useFormattedCategory = (category) => {
  const formattedCategory = category
    .split("-")
    .map((item) => item[0].toUpperCase() + item.slice(1, item.length))
    .join(" ");

  return { formattedCategory };
};

export default useFormattedCategory;
