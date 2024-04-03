import { createHmac, createHash } from "crypto";

/**
 * Calculates the HMAC (Hash-based Message Authentication Code) using the SHA256 algorithm.
 *
 * @param secret - The secret key used for generating the HMAC.
 * @returns The HMAC value as a hexadecimal string.
 */
export const hmac = (secret: any) => {
  const mac = createHmac("sha256", secret).update("Mingalarpar").digest("hex");
  return mac;
};
/**
 * Calculates the SHA256 hash of a given secret.
 *
 * @param secret - The secret to be hashed.
 * @returns The SHA256 hash of the secret.
 */
export const hash = (secret: any) => {
  const has = createHash("sha256", secret).update("Mingalarpar").digest("hex");
  return has;
};
