/**
 * Creates an array of binary characters from a binary string.
 *
 * @param binaryString - The binary string to convert into an array.
 * @returns An array of binary characters.
 */
export const createBinaryArray = (binaryString: string) => {
  const binaryArray: string[] = [];
  for (let i = 0; i < binaryString.length; i += 8) {
    const binaryChar = binaryString.substr(i, 8);
    binaryArray.push(binaryChar);
  }
  return binaryArray;
};

// --------- binary and decimal ---------

/**
 * Converts a binary string to an array of decimal numbers.
 *
 * @param bin - The binary string to convert.
 * @returns An array of decimal numbers.
 * @throws {Error} If the binary string is invalid.
 */
export const bin2des = (bin: string) => {
  const binaryArray = createBinaryArray(bin);
  let decim: string[] = [];
  binaryArray.forEach((binary) => {
    if (binary.length > 8) {
      throw new Error("Check Binary Number");
    }
    const deci: string = parseInt(binary, 2).toString();
    decim.push(deci);
  });
  return decim;
};

/**
 * Converts a decimal number to binary representation.
 *
 * @param des - The decimal number to convert to binary.
 * @returns The binary representation of the decimal number.
 */
export const des2bin = (des: any) => {
  return des.toString(2);
};

// -----------

/**
 * Converts a binary string to a hexadecimal string.
 *
 * @param bin - The binary string to convert.
 * @returns The hexadecimal string representation of the binary string.
 * @throws {Error} If the binary string is not valid.
 */
export const bin2hex = (bin: string) => {
  const binn = createBinaryArray(bin);
  let hexArray: string[] = [];
  binn.forEach((binary) => {
    if (binary.length > 8) {
      throw new Error("Check Binary Number");
    }
    const decimal = parseInt(binary, 2);
    const hex = decimal.toString(16);
    hexArray.push(hex);
  });
  const hexx = hexArray.join("");
  return hexx;
};

// ------------ text and binary -----------------

/**
 * Converts a given text into binary representation.
 *
 * @param text - The text to be converted into binary.
 * @returns The binary representation of the given text.
 */
export const text2bin = (text: string) => {
  let binary = "";
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const binaryChar = charCode.toString(2).padStart(8, "0");
    binary += binaryChar;
  }
  return binary;
};
/**
 * Converts a binary string to a text string.
 *
 * @param binary - The binary string to convert.
 * @returns The converted text string.
 */
export const bin2text = (binary: any) => {
  let text = "";
  for (let i = 0; i < binary.length; i += 8) {
    const binaryChar = binary.substr(i, 8);
    const charCode = parseInt(binaryChar, 2);
    const char = String.fromCharCode(charCode);
    text += char;
  }
  return text;
};

// ------------------------

/**
 * Converts a given text to base64 encoding.
 *
 * @param text - The text to be converted.
 * @returns The base64 encoded string.
 */
export const text2b64 = (text: string) => {
  return Buffer.from(text).toString("base64");
};

// ---------------------------