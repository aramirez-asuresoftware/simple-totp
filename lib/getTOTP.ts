import { getCode } from "./getCode";
import { getCounter } from "./getCounter";
import { getHMAC } from "./getHMAC";
import { getKey } from "./getKey";

export const getTOTP = (
  seed: string | Buffer,
  encoding: BufferEncoding | "base32",
  timestamp: number = Date.now(),
  nDigits = 6,
  T0 = 0,
  Tx = 30000
): { totp: string; remainingMs: number } => {
  const secret = getKey(seed, encoding);
  const { counterBuffer, remainingMs } = getCounter(timestamp, T0, Tx);
  const hmac = getHMAC(secret, counterBuffer);
  const totp = getCode(hmac, nDigits);
  return { totp, remainingMs };
};
