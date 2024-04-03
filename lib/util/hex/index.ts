import { Buffer } from "node:buffer";

/**
 * Encodes a given text string into hexadecimal format.
 *
 * @param text - The text string to be encoded.
 * @returns The encoded text string in hexadecimal format.
 */
export const encodeHex = (text: string) => {
  return Buffer.from(text).toString("hex");
};

/**
 * Decodes a hexadecimal string into its corresponding text representation.
 *
 * @param text - The hexadecimal string to decode.
 * @returns The decoded text.
 */
export const decodeHex = (text: string) => {
  const bytes = [...text.matchAll(/[0-9a-f]{2}/g)].map((a) =>
    parseInt(a[0], 16)
  );
  return Buffer.from(bytes).toString();
};
