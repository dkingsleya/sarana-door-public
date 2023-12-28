export const updateSearchParams = (type: string, value: string) => {
  const searchParamas = new URLSearchParams(window.location.search);
  searchParamas.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParamas.toString()}`;

  return newPathName;
};
