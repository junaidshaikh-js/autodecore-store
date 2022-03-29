export function isInList(list, id) {
  return Boolean(list.find((item) => item._id === id));
}
