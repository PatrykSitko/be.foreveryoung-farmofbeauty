export function clone(object) {
  let clone = {};
  for (let key in object) {
    if (typeof object[key] === "object") {
      clone[key] = clone(object[key]);
    } else {
      clone[key] = object[key];
    }
  }
  return clone;
}
/**
 *
 * @param {object} dna1
 * @param {object} dna2
 * @returns {undefined || boolean} undefined if dna1 && dna2 !== typeof object || true | false;
 */
export function rectEquals(dna1, dna2) {
  if (typeof dna1 !== "object" || typeof dna2 !== "object") {
    return undefined;
  }
  const dna1Keys = Object.keys(dna1);
  const dna2Keys = Object.keys(dna2);
  if (dna1Keys.length !== dna2Keys.length) {
    return false;
  }
  for (let dna1Key of dna1Keys) {
    if (!dna2Keys.includes(dna1Key) || dna2[dna1Key] !== dna1[dna1Key]) {
      return false;
    }
  }
  return true;
}
export default { clone, rectEquals };
