export function categoryFilters(table, category) {
  const filters = {};

  table.forEach((element) => {
    filters[element[category]] = element[category];
  });

  const filterList = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(filters)) {
    filterList.push(
      {
        text: key,
        value,
      },
    );
  }

  return filterList;
}
