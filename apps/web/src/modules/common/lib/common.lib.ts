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
