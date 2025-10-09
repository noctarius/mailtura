/**
 * A timestamp is a number representing the number of seconds
 * since the Unix epoch.
 */
export type Timestamp = number & { readonly __brand: "Timestamp" };

/**
 * Converts a number to a Timestamp instance.
 *
 * @param timestamp a number representing the number of seconds
 */
export function asTimestamp(timestamp: number): Timestamp {
  if (!Number.isSafeInteger(timestamp)) {
    throw new Error("Timestamp must be an integer");
  }
  return timestamp as Timestamp;
}
