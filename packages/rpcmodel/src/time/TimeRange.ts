import { Instant } from "./Instant";

/**
 * A TimeRange represents a range of time.
 */
export class TimeRange {
  readonly #start: Instant | undefined;
  readonly #end: Instant | undefined;

  private constructor(start: Instant | undefined, end: Instant | undefined) {
    this.#start = start;
    this.#end = end;
  }

  /**
   * Creates a new TimeRange instance.
   *
   * @param start a start Instant instance
   * @param end a end Instant instance
   */
  static create(start: Instant | undefined, end: Instant | undefined): TimeRange {
    return new TimeRange(start, end);
  }

  /**
   * Returns the start Instant instance of this TimeRange instance.
   */
  get start(): Instant | undefined {
    return this.#start;
  }

  /**
   * Returns the end Instant instance of this TimeRange instance.
   */
  get end(): Instant | undefined {
    return this.#end;
  }

  /**
   * Returns the string tag of this TimeRange instance.
   */
  get [Symbol.toStringTag](): string {
    return "TimeRange";
  }
}
