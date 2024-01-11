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

export const capitalize = (string: string): string => {
  if (string.length === 0) return '';
  return string.charAt(0).toUpperCase().concat(string.substring(1).toLowerCase());
};

interface SWRError extends Error {
  status: number;
}

export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = await res.text();
    const err = new Error(error) as SWRError;
    err.status = res.status;
    throw err;
  }

  return res.json();
}
