/**
 * Converts a number >= 1000 into the format 13k.
 * @param stat Number to convert.
 * @returns A tuple containing the number and the unit.
 */
export const getFormattedNumberIntoThousands = (num: number): [number, string] => {
  if (num >= 1000) {
    const formatted = Math.floor(num / 1000);
    return [formatted, 'k'];
  }
  return [num, ''];
};
