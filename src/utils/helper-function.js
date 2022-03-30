export function isInList(list, id) {
  return Boolean(list.find((item) => item._id === id));
}

export function getProduct(list, id) {
  return list.find((item) => item._id === id);
}
