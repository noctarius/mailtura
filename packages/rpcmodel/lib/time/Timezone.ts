import moment from "moment-timezone";
import { Instant } from "./Instant.js";
import type { Timestamp } from "./Timestamp";

/**
 * A ParseFormatSpecification is a string representing a format
 * specification.
 */
export type ParseFormatSpecification = moment.MomentFormatSpecification;

/**
 * A ParseInput is a string, number, Timestamp or Date instance.
 */
export type ParseInput = string | number | Timestamp | Date;

/**
 * A Timezone represents a timezone.
 */
export class Timezone {
  private readonly timezone: string;

  /**
   * Creates a new Timezone instance.
   *
   * @param timezone a timezone string
   * @private
   */
  private constructor(timezone: string) {
    this.timezone = timezone;
  }

  /**
   * Creates a new Timezone instance.
   *
   * @param timezone a timezone string
   * @returns a new Timezone instance
   */
  static timezone(timezone: string): Timezone {
    return new Timezone(timezone);
  }

  /**
   * Returns the current point in time as an Instant instance
   * inside the current Timezone instance.
   */
  now(): Instant {
    return this.toTimezone(moment());
  }

  /**
   * Returns a new Instant instance representing the given timestamp.
   *
   * @param timestamp a timestamp
   */
  timestamp(timestamp: Timestamp): Instant {
    if (typeof timestamp !== "number") {
      return this.parse(timestamp);
    }
    return this.toTimezone(moment.unix(timestamp));
  }

  /**
   * Returns a new Instant instance representing the given date.
   *
   * @param value a point in time as from the valid ParseInput types
   * @param format an optional format specification to parse string values
   */
  parse(value: ParseInput, format?: ParseFormatSpecification): Instant {
    if (format && typeof value === "string") {
      return this.toTimezone(moment.tz(value, format, this.timezone));
    }
    return this.toTimezone(moment.tz(value, this.timezone));
  }

  /**
   * Returns a string representing the current Timezone instance.
   */
  toString(): string {
    return this.timezone;
  }

  /**
   * Returns the string tag of this Timezone instance.
   */
  get [Symbol.toStringTag](): string {
    return "Timezone";
  }

  private toTimezone(time: moment.Moment): Instant {
    return new Instant(time.tz(this.timezone), this);
  }
}

/**
 * A UTC Timezone instance.
 */
export const UTC = Timezone.timezone("UTC");

/**
 * A local Timezone instance.
 */
export const LOCAL = Timezone.timezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
