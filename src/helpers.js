// eslint-disable-next-line no-extend-native
export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}

export function isString(str) {
  return typeof str === "string";
}

export function isDate(obj) {
  // Check if string is [object Date]
  return Object.prototype.toString.call(obj) === "[object Date]";
}
