
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model tenants
 * 
 */
export type tenants = $Result.DefaultSelection<Prisma.$tenantsPayload>
/**
 * Model contacts
 * 
 */
export type contacts = $Result.DefaultSelection<Prisma.$contactsPayload>
/**
 * Model campaigns
 * 
 */
export type campaigns = $Result.DefaultSelection<Prisma.$campaignsPayload>
/**
 * Model activities
 * 
 */
export type activities = $Result.DefaultSelection<Prisma.$activitiesPayload>
/**
 * Model bounces
 * 
 */
export type bounces = $Result.DefaultSelection<Prisma.$bouncesPayload>
/**
 * Model subscribers
 * 
 */
export type subscribers = $Result.DefaultSelection<Prisma.$subscribersPayload>
/**
 * Model subscriber_list
 * 
 */
export type subscriber_list = $Result.DefaultSelection<Prisma.$subscriber_listPayload>
/**
 * Model subscriber_list_contacts
 * 
 */
export type subscriber_list_contacts = $Result.DefaultSelection<Prisma.$subscriber_list_contactsPayload>
/**
 * Model unsubscribes
 * 
 */
export type unsubscribes = $Result.DefaultSelection<Prisma.$unsubscribesPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model api_keys
 * 
 */
export type api_keys = $Result.DefaultSelection<Prisma.$api_keysPayload>
/**
 * Model template_properties
 * 
 */
export type template_properties = $Result.DefaultSelection<Prisma.$template_propertiesPayload>
/**
 * Model templates
 * 
 */
export type templates = $Result.DefaultSelection<Prisma.$templatesPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const campaign_status: {
  Active: 'Active',
  Scheduled: 'Scheduled',
  Completed: 'Completed',
  Draft: 'Draft',
  Paused: 'Paused',
  Cancelled: 'Cancelled'
};

export type campaign_status = (typeof campaign_status)[keyof typeof campaign_status]


export const campaign_type: {
  OneTime: 'OneTime',
  Automated: 'Automated'
};

export type campaign_type = (typeof campaign_type)[keyof typeof campaign_type]


export const activity_status: {
  Delivered: 'Delivered',
  Opened: 'Opened',
  Clicked: 'Clicked',
  Pending: 'Pending',
  Scheduled: 'Scheduled',
  Bounced: 'Bounced',
  Failed: 'Failed'
};

export type activity_status = (typeof activity_status)[keyof typeof activity_status]


export const event_type: {
  Queued: 'Queued',
  Delivered: 'Delivered',
  Clicked: 'Clicked',
  Opened: 'Opened',
  Failed: 'Failed',
  Bounced: 'Bounced'
};

export type event_type = (typeof event_type)[keyof typeof event_type]


export const bounce_type: {
  Hard: 'Hard',
  Soft: 'Soft'
};

export type bounce_type = (typeof bounce_type)[keyof typeof bounce_type]


export const subscriber_status: {
  Subscribed: 'Subscribed',
  Unsubscribed: 'Unsubscribed',
  Bounced: 'Bounced',
  Complaint: 'Complaint'
};

export type subscriber_status = (typeof subscriber_status)[keyof typeof subscriber_status]


export const unsubscribe_source: {
  UnsubscribeLink: 'UnsubscribeLink',
  ManualAddition: 'ManualAddition',
  Bounce: 'Bounce',
  Api: 'Api',
  Other: 'Other'
};

export type unsubscribe_source = (typeof unsubscribe_source)[keyof typeof unsubscribe_source]

}

export type campaign_status = $Enums.campaign_status

export const campaign_status: typeof $Enums.campaign_status

export type campaign_type = $Enums.campaign_type

export const campaign_type: typeof $Enums.campaign_type

export type activity_status = $Enums.activity_status

export const activity_status: typeof $Enums.activity_status

export type event_type = $Enums.event_type

export const event_type: typeof $Enums.event_type

export type bounce_type = $Enums.bounce_type

export const bounce_type: typeof $Enums.bounce_type

export type subscriber_status = $Enums.subscriber_status

export const subscriber_status: typeof $Enums.subscriber_status

export type unsubscribe_source = $Enums.unsubscribe_source

export const unsubscribe_source: typeof $Enums.unsubscribe_source

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenants.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenants.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.tenants`: Exposes CRUD operations for the **tenants** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenants.findMany()
    * ```
    */
  get tenants(): Prisma.tenantsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contacts`: Exposes CRUD operations for the **contacts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contacts.findMany()
    * ```
    */
  get contacts(): Prisma.contactsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaigns`: Exposes CRUD operations for the **campaigns** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campaigns
    * const campaigns = await prisma.campaigns.findMany()
    * ```
    */
  get campaigns(): Prisma.campaignsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activities`: Exposes CRUD operations for the **activities** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activities.findMany()
    * ```
    */
  get activities(): Prisma.activitiesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bounces`: Exposes CRUD operations for the **bounces** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bounces
    * const bounces = await prisma.bounces.findMany()
    * ```
    */
  get bounces(): Prisma.bouncesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscribers`: Exposes CRUD operations for the **subscribers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscribers
    * const subscribers = await prisma.subscribers.findMany()
    * ```
    */
  get subscribers(): Prisma.subscribersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriber_list`: Exposes CRUD operations for the **subscriber_list** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriber_lists
    * const subscriber_lists = await prisma.subscriber_list.findMany()
    * ```
    */
  get subscriber_list(): Prisma.subscriber_listDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriber_list_contacts`: Exposes CRUD operations for the **subscriber_list_contacts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriber_list_contacts
    * const subscriber_list_contacts = await prisma.subscriber_list_contacts.findMany()
    * ```
    */
  get subscriber_list_contacts(): Prisma.subscriber_list_contactsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.unsubscribes`: Exposes CRUD operations for the **unsubscribes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Unsubscribes
    * const unsubscribes = await prisma.unsubscribes.findMany()
    * ```
    */
  get unsubscribes(): Prisma.unsubscribesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.api_keys`: Exposes CRUD operations for the **api_keys** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Api_keys
    * const api_keys = await prisma.api_keys.findMany()
    * ```
    */
  get api_keys(): Prisma.api_keysDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.template_properties`: Exposes CRUD operations for the **template_properties** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Template_properties
    * const template_properties = await prisma.template_properties.findMany()
    * ```
    */
  get template_properties(): Prisma.template_propertiesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.templates`: Exposes CRUD operations for the **templates** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Templates
    * const templates = await prisma.templates.findMany()
    * ```
    */
  get templates(): Prisma.templatesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.3
   * Query Engine version: bb420e667c1820a8c05a38023385f6cc7ef8e83a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    tenants: 'tenants',
    contacts: 'contacts',
    campaigns: 'campaigns',
    activities: 'activities',
    bounces: 'bounces',
    subscribers: 'subscribers',
    subscriber_list: 'subscriber_list',
    subscriber_list_contacts: 'subscriber_list_contacts',
    unsubscribes: 'unsubscribes',
    users: 'users',
    api_keys: 'api_keys',
    template_properties: 'template_properties',
    templates: 'templates'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "tenants" | "contacts" | "campaigns" | "activities" | "bounces" | "subscribers" | "subscriber_list" | "subscriber_list_contacts" | "unsubscribes" | "users" | "api_keys" | "template_properties" | "templates"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      tenants: {
        payload: Prisma.$tenantsPayload<ExtArgs>
        fields: Prisma.tenantsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tenantsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tenantsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>
          }
          findFirst: {
            args: Prisma.tenantsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tenantsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>
          }
          findMany: {
            args: Prisma.tenantsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>[]
          }
          create: {
            args: Prisma.tenantsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>
          }
          createMany: {
            args: Prisma.tenantsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tenantsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>[]
          }
          delete: {
            args: Prisma.tenantsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>
          }
          update: {
            args: Prisma.tenantsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>
          }
          deleteMany: {
            args: Prisma.tenantsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tenantsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tenantsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>[]
          }
          upsert: {
            args: Prisma.tenantsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>
          }
          aggregate: {
            args: Prisma.TenantsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenants>
          }
          groupBy: {
            args: Prisma.tenantsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantsGroupByOutputType>[]
          }
          count: {
            args: Prisma.tenantsCountArgs<ExtArgs>
            result: $Utils.Optional<TenantsCountAggregateOutputType> | number
          }
        }
      }
      contacts: {
        payload: Prisma.$contactsPayload<ExtArgs>
        fields: Prisma.contactsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.contactsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contactsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.contactsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contactsPayload>
          }
          findFirst: {
            args: Prisma.contactsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contactsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.contactsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contactsPayload>
          }
          findMany: {
            args: Prisma.contactsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contactsPayload>[]
          }
          create: {
            args: Prisma.contactsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contactsPayload>
          }
          createMany: {
            args: Prisma.contactsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.contactsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contactsPayload>[]
          }
          delete: {
            args: Prisma.contactsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contactsPayload>
          }
          update: {
            args: Prisma.contactsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contactsPayload>
          }
          deleteMany: {
            args: Prisma.contactsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.contactsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.contactsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contactsPayload>[]
          }
          upsert: {
            args: Prisma.contactsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contactsPayload>
          }
          aggregate: {
            args: Prisma.ContactsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContacts>
          }
          groupBy: {
            args: Prisma.contactsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactsGroupByOutputType>[]
          }
          count: {
            args: Prisma.contactsCountArgs<ExtArgs>
            result: $Utils.Optional<ContactsCountAggregateOutputType> | number
          }
        }
      }
      campaigns: {
        payload: Prisma.$campaignsPayload<ExtArgs>
        fields: Prisma.campaignsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.campaignsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$campaignsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.campaignsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$campaignsPayload>
          }
          findFirst: {
            args: Prisma.campaignsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$campaignsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.campaignsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$campaignsPayload>
          }
          findMany: {
            args: Prisma.campaignsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$campaignsPayload>[]
          }
          create: {
            args: Prisma.campaignsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$campaignsPayload>
          }
          createMany: {
            args: Prisma.campaignsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.campaignsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$campaignsPayload>[]
          }
          delete: {
            args: Prisma.campaignsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$campaignsPayload>
          }
          update: {
            args: Prisma.campaignsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$campaignsPayload>
          }
          deleteMany: {
            args: Prisma.campaignsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.campaignsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.campaignsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$campaignsPayload>[]
          }
          upsert: {
            args: Prisma.campaignsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$campaignsPayload>
          }
          aggregate: {
            args: Prisma.CampaignsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaigns>
          }
          groupBy: {
            args: Prisma.campaignsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignsGroupByOutputType>[]
          }
          count: {
            args: Prisma.campaignsCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignsCountAggregateOutputType> | number
          }
        }
      }
      activities: {
        payload: Prisma.$activitiesPayload<ExtArgs>
        fields: Prisma.activitiesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.activitiesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activitiesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.activitiesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activitiesPayload>
          }
          findFirst: {
            args: Prisma.activitiesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activitiesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.activitiesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activitiesPayload>
          }
          findMany: {
            args: Prisma.activitiesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activitiesPayload>[]
          }
          create: {
            args: Prisma.activitiesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activitiesPayload>
          }
          createMany: {
            args: Prisma.activitiesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.activitiesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activitiesPayload>[]
          }
          delete: {
            args: Prisma.activitiesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activitiesPayload>
          }
          update: {
            args: Prisma.activitiesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activitiesPayload>
          }
          deleteMany: {
            args: Prisma.activitiesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.activitiesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.activitiesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activitiesPayload>[]
          }
          upsert: {
            args: Prisma.activitiesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activitiesPayload>
          }
          aggregate: {
            args: Prisma.ActivitiesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivities>
          }
          groupBy: {
            args: Prisma.activitiesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivitiesGroupByOutputType>[]
          }
          count: {
            args: Prisma.activitiesCountArgs<ExtArgs>
            result: $Utils.Optional<ActivitiesCountAggregateOutputType> | number
          }
        }
      }
      bounces: {
        payload: Prisma.$bouncesPayload<ExtArgs>
        fields: Prisma.bouncesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bouncesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bouncesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bouncesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bouncesPayload>
          }
          findFirst: {
            args: Prisma.bouncesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bouncesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bouncesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bouncesPayload>
          }
          findMany: {
            args: Prisma.bouncesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bouncesPayload>[]
          }
          create: {
            args: Prisma.bouncesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bouncesPayload>
          }
          createMany: {
            args: Prisma.bouncesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bouncesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bouncesPayload>[]
          }
          delete: {
            args: Prisma.bouncesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bouncesPayload>
          }
          update: {
            args: Prisma.bouncesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bouncesPayload>
          }
          deleteMany: {
            args: Prisma.bouncesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bouncesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.bouncesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bouncesPayload>[]
          }
          upsert: {
            args: Prisma.bouncesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bouncesPayload>
          }
          aggregate: {
            args: Prisma.BouncesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBounces>
          }
          groupBy: {
            args: Prisma.bouncesGroupByArgs<ExtArgs>
            result: $Utils.Optional<BouncesGroupByOutputType>[]
          }
          count: {
            args: Prisma.bouncesCountArgs<ExtArgs>
            result: $Utils.Optional<BouncesCountAggregateOutputType> | number
          }
        }
      }
      subscribers: {
        payload: Prisma.$subscribersPayload<ExtArgs>
        fields: Prisma.subscribersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.subscribersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscribersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.subscribersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscribersPayload>
          }
          findFirst: {
            args: Prisma.subscribersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscribersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.subscribersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscribersPayload>
          }
          findMany: {
            args: Prisma.subscribersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscribersPayload>[]
          }
          create: {
            args: Prisma.subscribersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscribersPayload>
          }
          createMany: {
            args: Prisma.subscribersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.subscribersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscribersPayload>[]
          }
          delete: {
            args: Prisma.subscribersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscribersPayload>
          }
          update: {
            args: Prisma.subscribersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscribersPayload>
          }
          deleteMany: {
            args: Prisma.subscribersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.subscribersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.subscribersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscribersPayload>[]
          }
          upsert: {
            args: Prisma.subscribersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscribersPayload>
          }
          aggregate: {
            args: Prisma.SubscribersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscribers>
          }
          groupBy: {
            args: Prisma.subscribersGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscribersGroupByOutputType>[]
          }
          count: {
            args: Prisma.subscribersCountArgs<ExtArgs>
            result: $Utils.Optional<SubscribersCountAggregateOutputType> | number
          }
        }
      }
      subscriber_list: {
        payload: Prisma.$subscriber_listPayload<ExtArgs>
        fields: Prisma.subscriber_listFieldRefs
        operations: {
          findUnique: {
            args: Prisma.subscriber_listFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_listPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.subscriber_listFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_listPayload>
          }
          findFirst: {
            args: Prisma.subscriber_listFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_listPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.subscriber_listFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_listPayload>
          }
          findMany: {
            args: Prisma.subscriber_listFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_listPayload>[]
          }
          create: {
            args: Prisma.subscriber_listCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_listPayload>
          }
          createMany: {
            args: Prisma.subscriber_listCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.subscriber_listCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_listPayload>[]
          }
          delete: {
            args: Prisma.subscriber_listDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_listPayload>
          }
          update: {
            args: Prisma.subscriber_listUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_listPayload>
          }
          deleteMany: {
            args: Prisma.subscriber_listDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.subscriber_listUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.subscriber_listUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_listPayload>[]
          }
          upsert: {
            args: Prisma.subscriber_listUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_listPayload>
          }
          aggregate: {
            args: Prisma.Subscriber_listAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriber_list>
          }
          groupBy: {
            args: Prisma.subscriber_listGroupByArgs<ExtArgs>
            result: $Utils.Optional<Subscriber_listGroupByOutputType>[]
          }
          count: {
            args: Prisma.subscriber_listCountArgs<ExtArgs>
            result: $Utils.Optional<Subscriber_listCountAggregateOutputType> | number
          }
        }
      }
      subscriber_list_contacts: {
        payload: Prisma.$subscriber_list_contactsPayload<ExtArgs>
        fields: Prisma.subscriber_list_contactsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.subscriber_list_contactsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_list_contactsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.subscriber_list_contactsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_list_contactsPayload>
          }
          findFirst: {
            args: Prisma.subscriber_list_contactsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_list_contactsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.subscriber_list_contactsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_list_contactsPayload>
          }
          findMany: {
            args: Prisma.subscriber_list_contactsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_list_contactsPayload>[]
          }
          create: {
            args: Prisma.subscriber_list_contactsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_list_contactsPayload>
          }
          createMany: {
            args: Prisma.subscriber_list_contactsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.subscriber_list_contactsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_list_contactsPayload>[]
          }
          delete: {
            args: Prisma.subscriber_list_contactsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_list_contactsPayload>
          }
          update: {
            args: Prisma.subscriber_list_contactsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_list_contactsPayload>
          }
          deleteMany: {
            args: Prisma.subscriber_list_contactsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.subscriber_list_contactsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.subscriber_list_contactsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_list_contactsPayload>[]
          }
          upsert: {
            args: Prisma.subscriber_list_contactsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriber_list_contactsPayload>
          }
          aggregate: {
            args: Prisma.Subscriber_list_contactsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriber_list_contacts>
          }
          groupBy: {
            args: Prisma.subscriber_list_contactsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Subscriber_list_contactsGroupByOutputType>[]
          }
          count: {
            args: Prisma.subscriber_list_contactsCountArgs<ExtArgs>
            result: $Utils.Optional<Subscriber_list_contactsCountAggregateOutputType> | number
          }
        }
      }
      unsubscribes: {
        payload: Prisma.$unsubscribesPayload<ExtArgs>
        fields: Prisma.unsubscribesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.unsubscribesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unsubscribesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.unsubscribesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unsubscribesPayload>
          }
          findFirst: {
            args: Prisma.unsubscribesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unsubscribesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.unsubscribesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unsubscribesPayload>
          }
          findMany: {
            args: Prisma.unsubscribesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unsubscribesPayload>[]
          }
          create: {
            args: Prisma.unsubscribesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unsubscribesPayload>
          }
          createMany: {
            args: Prisma.unsubscribesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.unsubscribesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unsubscribesPayload>[]
          }
          delete: {
            args: Prisma.unsubscribesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unsubscribesPayload>
          }
          update: {
            args: Prisma.unsubscribesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unsubscribesPayload>
          }
          deleteMany: {
            args: Prisma.unsubscribesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.unsubscribesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.unsubscribesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unsubscribesPayload>[]
          }
          upsert: {
            args: Prisma.unsubscribesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unsubscribesPayload>
          }
          aggregate: {
            args: Prisma.UnsubscribesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUnsubscribes>
          }
          groupBy: {
            args: Prisma.unsubscribesGroupByArgs<ExtArgs>
            result: $Utils.Optional<UnsubscribesGroupByOutputType>[]
          }
          count: {
            args: Prisma.unsubscribesCountArgs<ExtArgs>
            result: $Utils.Optional<UnsubscribesCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      api_keys: {
        payload: Prisma.$api_keysPayload<ExtArgs>
        fields: Prisma.api_keysFieldRefs
        operations: {
          findUnique: {
            args: Prisma.api_keysFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$api_keysPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.api_keysFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$api_keysPayload>
          }
          findFirst: {
            args: Prisma.api_keysFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$api_keysPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.api_keysFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$api_keysPayload>
          }
          findMany: {
            args: Prisma.api_keysFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$api_keysPayload>[]
          }
          create: {
            args: Prisma.api_keysCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$api_keysPayload>
          }
          createMany: {
            args: Prisma.api_keysCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.api_keysCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$api_keysPayload>[]
          }
          delete: {
            args: Prisma.api_keysDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$api_keysPayload>
          }
          update: {
            args: Prisma.api_keysUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$api_keysPayload>
          }
          deleteMany: {
            args: Prisma.api_keysDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.api_keysUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.api_keysUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$api_keysPayload>[]
          }
          upsert: {
            args: Prisma.api_keysUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$api_keysPayload>
          }
          aggregate: {
            args: Prisma.Api_keysAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApi_keys>
          }
          groupBy: {
            args: Prisma.api_keysGroupByArgs<ExtArgs>
            result: $Utils.Optional<Api_keysGroupByOutputType>[]
          }
          count: {
            args: Prisma.api_keysCountArgs<ExtArgs>
            result: $Utils.Optional<Api_keysCountAggregateOutputType> | number
          }
        }
      }
      template_properties: {
        payload: Prisma.$template_propertiesPayload<ExtArgs>
        fields: Prisma.template_propertiesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.template_propertiesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$template_propertiesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.template_propertiesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$template_propertiesPayload>
          }
          findFirst: {
            args: Prisma.template_propertiesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$template_propertiesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.template_propertiesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$template_propertiesPayload>
          }
          findMany: {
            args: Prisma.template_propertiesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$template_propertiesPayload>[]
          }
          create: {
            args: Prisma.template_propertiesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$template_propertiesPayload>
          }
          createMany: {
            args: Prisma.template_propertiesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.template_propertiesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$template_propertiesPayload>[]
          }
          delete: {
            args: Prisma.template_propertiesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$template_propertiesPayload>
          }
          update: {
            args: Prisma.template_propertiesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$template_propertiesPayload>
          }
          deleteMany: {
            args: Prisma.template_propertiesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.template_propertiesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.template_propertiesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$template_propertiesPayload>[]
          }
          upsert: {
            args: Prisma.template_propertiesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$template_propertiesPayload>
          }
          aggregate: {
            args: Prisma.Template_propertiesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplate_properties>
          }
          groupBy: {
            args: Prisma.template_propertiesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Template_propertiesGroupByOutputType>[]
          }
          count: {
            args: Prisma.template_propertiesCountArgs<ExtArgs>
            result: $Utils.Optional<Template_propertiesCountAggregateOutputType> | number
          }
        }
      }
      templates: {
        payload: Prisma.$templatesPayload<ExtArgs>
        fields: Prisma.templatesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.templatesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.templatesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatesPayload>
          }
          findFirst: {
            args: Prisma.templatesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.templatesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatesPayload>
          }
          findMany: {
            args: Prisma.templatesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatesPayload>[]
          }
          create: {
            args: Prisma.templatesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatesPayload>
          }
          createMany: {
            args: Prisma.templatesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.templatesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatesPayload>[]
          }
          delete: {
            args: Prisma.templatesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatesPayload>
          }
          update: {
            args: Prisma.templatesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatesPayload>
          }
          deleteMany: {
            args: Prisma.templatesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.templatesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.templatesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatesPayload>[]
          }
          upsert: {
            args: Prisma.templatesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatesPayload>
          }
          aggregate: {
            args: Prisma.TemplatesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplates>
          }
          groupBy: {
            args: Prisma.templatesGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplatesGroupByOutputType>[]
          }
          count: {
            args: Prisma.templatesCountArgs<ExtArgs>
            result: $Utils.Optional<TemplatesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    tenants?: tenantsOmit
    contacts?: contactsOmit
    campaigns?: campaignsOmit
    activities?: activitiesOmit
    bounces?: bouncesOmit
    subscribers?: subscribersOmit
    subscriber_list?: subscriber_listOmit
    subscriber_list_contacts?: subscriber_list_contactsOmit
    unsubscribes?: unsubscribesOmit
    users?: usersOmit
    api_keys?: api_keysOmit
    template_properties?: template_propertiesOmit
    templates?: templatesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ContactsCountOutputType
   */

  export type ContactsCountOutputType = {
    activity: number
    bounce: number
    subscriber: number
    unsubscribe: number
  }

  export type ContactsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activity?: boolean | ContactsCountOutputTypeCountActivityArgs
    bounce?: boolean | ContactsCountOutputTypeCountBounceArgs
    subscriber?: boolean | ContactsCountOutputTypeCountSubscriberArgs
    unsubscribe?: boolean | ContactsCountOutputTypeCountUnsubscribeArgs
  }

  // Custom InputTypes
  /**
   * ContactsCountOutputType without action
   */
  export type ContactsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactsCountOutputType
     */
    select?: ContactsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContactsCountOutputType without action
   */
  export type ContactsCountOutputTypeCountActivityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: activitiesWhereInput
  }

  /**
   * ContactsCountOutputType without action
   */
  export type ContactsCountOutputTypeCountBounceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bouncesWhereInput
  }

  /**
   * ContactsCountOutputType without action
   */
  export type ContactsCountOutputTypeCountSubscriberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subscribersWhereInput
  }

  /**
   * ContactsCountOutputType without action
   */
  export type ContactsCountOutputTypeCountUnsubscribeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: unsubscribesWhereInput
  }


  /**
   * Count Type CampaignsCountOutputType
   */

  export type CampaignsCountOutputType = {
    activity: number
  }

  export type CampaignsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activity?: boolean | CampaignsCountOutputTypeCountActivityArgs
  }

  // Custom InputTypes
  /**
   * CampaignsCountOutputType without action
   */
  export type CampaignsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignsCountOutputType
     */
    select?: CampaignsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CampaignsCountOutputType without action
   */
  export type CampaignsCountOutputTypeCountActivityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: activitiesWhereInput
  }


  /**
   * Count Type Subscriber_listCountOutputType
   */

  export type Subscriber_listCountOutputType = {
    SubscriberListContacts: number
  }

  export type Subscriber_listCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SubscriberListContacts?: boolean | Subscriber_listCountOutputTypeCountSubscriberListContactsArgs
  }

  // Custom InputTypes
  /**
   * Subscriber_listCountOutputType without action
   */
  export type Subscriber_listCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber_listCountOutputType
     */
    select?: Subscriber_listCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Subscriber_listCountOutputType without action
   */
  export type Subscriber_listCountOutputTypeCountSubscriberListContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subscriber_list_contactsWhereInput
  }


  /**
   * Count Type Subscriber_list_contactsCountOutputType
   */

  export type Subscriber_list_contactsCountOutputType = {
    contacts: number
  }

  export type Subscriber_list_contactsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contacts?: boolean | Subscriber_list_contactsCountOutputTypeCountContactsArgs
  }

  // Custom InputTypes
  /**
   * Subscriber_list_contactsCountOutputType without action
   */
  export type Subscriber_list_contactsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscriber_list_contactsCountOutputType
     */
    select?: Subscriber_list_contactsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Subscriber_list_contactsCountOutputType without action
   */
  export type Subscriber_list_contactsCountOutputTypeCountContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: contactsWhereInput
  }


  /**
   * Count Type TemplatesCountOutputType
   */

  export type TemplatesCountOutputType = {
    properties: number
  }

  export type TemplatesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | TemplatesCountOutputTypeCountPropertiesArgs
  }

  // Custom InputTypes
  /**
   * TemplatesCountOutputType without action
   */
  export type TemplatesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatesCountOutputType
     */
    select?: TemplatesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TemplatesCountOutputType without action
   */
  export type TemplatesCountOutputTypeCountPropertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: template_propertiesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model tenants
   */

  export type AggregateTenants = {
    _count: TenantsCountAggregateOutputType | null
    _min: TenantsMinAggregateOutputType | null
    _max: TenantsMaxAggregateOutputType | null
  }

  export type TenantsMinAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type TenantsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type TenantsCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    _all: number
  }


  export type TenantsMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type TenantsMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type TenantsCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    _all?: true
  }

  export type TenantsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tenants to aggregate.
     */
    where?: tenantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tenants to fetch.
     */
    orderBy?: tenantsOrderByWithRelationInput | tenantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tenantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tenants
    **/
    _count?: true | TenantsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantsMaxAggregateInputType
  }

  export type GetTenantsAggregateType<T extends TenantsAggregateArgs> = {
        [P in keyof T & keyof AggregateTenants]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenants[P]>
      : GetScalarType<T[P], AggregateTenants[P]>
  }




  export type tenantsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tenantsWhereInput
    orderBy?: tenantsOrderByWithAggregationInput | tenantsOrderByWithAggregationInput[]
    by: TenantsScalarFieldEnum[] | TenantsScalarFieldEnum
    having?: tenantsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantsCountAggregateInputType | true
    _min?: TenantsMinAggregateInputType
    _max?: TenantsMaxAggregateInputType
  }

  export type TenantsGroupByOutputType = {
    id: string
    name: string
    created_at: Date
    created_by: string
    updated_at: Date | null
    updated_by: string | null
    _count: TenantsCountAggregateOutputType | null
    _min: TenantsMinAggregateOutputType | null
    _max: TenantsMaxAggregateOutputType | null
  }

  type GetTenantsGroupByPayload<T extends tenantsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantsGroupByOutputType[P]>
            : GetScalarType<T[P], TenantsGroupByOutputType[P]>
        }
      >
    >


  export type tenantsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["tenants"]>

  export type tenantsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["tenants"]>

  export type tenantsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["tenants"]>

  export type tenantsSelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }

  export type tenantsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "created_at" | "created_by" | "updated_at" | "updated_by", ExtArgs["result"]["tenants"]>

  export type $tenantsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tenants"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      created_at: Date
      created_by: string
      updated_at: Date | null
      updated_by: string | null
    }, ExtArgs["result"]["tenants"]>
    composites: {}
  }

  type tenantsGetPayload<S extends boolean | null | undefined | tenantsDefaultArgs> = $Result.GetResult<Prisma.$tenantsPayload, S>

  type tenantsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tenantsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantsCountAggregateInputType | true
    }

  export interface tenantsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tenants'], meta: { name: 'tenants' } }
    /**
     * Find zero or one Tenants that matches the filter.
     * @param {tenantsFindUniqueArgs} args - Arguments to find a Tenants
     * @example
     * // Get one Tenants
     * const tenants = await prisma.tenants.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tenantsFindUniqueArgs>(args: SelectSubset<T, tenantsFindUniqueArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tenants that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tenantsFindUniqueOrThrowArgs} args - Arguments to find a Tenants
     * @example
     * // Get one Tenants
     * const tenants = await prisma.tenants.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tenantsFindUniqueOrThrowArgs>(args: SelectSubset<T, tenantsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tenantsFindFirstArgs} args - Arguments to find a Tenants
     * @example
     * // Get one Tenants
     * const tenants = await prisma.tenants.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tenantsFindFirstArgs>(args?: SelectSubset<T, tenantsFindFirstArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenants that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tenantsFindFirstOrThrowArgs} args - Arguments to find a Tenants
     * @example
     * // Get one Tenants
     * const tenants = await prisma.tenants.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tenantsFindFirstOrThrowArgs>(args?: SelectSubset<T, tenantsFindFirstOrThrowArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tenantsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenants.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenants.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantsWithIdOnly = await prisma.tenants.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tenantsFindManyArgs>(args?: SelectSubset<T, tenantsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tenants.
     * @param {tenantsCreateArgs} args - Arguments to create a Tenants.
     * @example
     * // Create one Tenants
     * const Tenants = await prisma.tenants.create({
     *   data: {
     *     // ... data to create a Tenants
     *   }
     * })
     * 
     */
    create<T extends tenantsCreateArgs>(args: SelectSubset<T, tenantsCreateArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tenants.
     * @param {tenantsCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenants = await prisma.tenants.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tenantsCreateManyArgs>(args?: SelectSubset<T, tenantsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {tenantsCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenants = await prisma.tenants.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantsWithIdOnly = await prisma.tenants.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tenantsCreateManyAndReturnArgs>(args?: SelectSubset<T, tenantsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tenants.
     * @param {tenantsDeleteArgs} args - Arguments to delete one Tenants.
     * @example
     * // Delete one Tenants
     * const Tenants = await prisma.tenants.delete({
     *   where: {
     *     // ... filter to delete one Tenants
     *   }
     * })
     * 
     */
    delete<T extends tenantsDeleteArgs>(args: SelectSubset<T, tenantsDeleteArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tenants.
     * @param {tenantsUpdateArgs} args - Arguments to update one Tenants.
     * @example
     * // Update one Tenants
     * const tenants = await prisma.tenants.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tenantsUpdateArgs>(args: SelectSubset<T, tenantsUpdateArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tenants.
     * @param {tenantsDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenants.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tenantsDeleteManyArgs>(args?: SelectSubset<T, tenantsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tenantsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenants = await prisma.tenants.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tenantsUpdateManyArgs>(args: SelectSubset<T, tenantsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants and returns the data updated in the database.
     * @param {tenantsUpdateManyAndReturnArgs} args - Arguments to update many Tenants.
     * @example
     * // Update many Tenants
     * const tenants = await prisma.tenants.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tenants and only return the `id`
     * const tenantsWithIdOnly = await prisma.tenants.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tenantsUpdateManyAndReturnArgs>(args: SelectSubset<T, tenantsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tenants.
     * @param {tenantsUpsertArgs} args - Arguments to update or create a Tenants.
     * @example
     * // Update or create a Tenants
     * const tenants = await prisma.tenants.upsert({
     *   create: {
     *     // ... data to create a Tenants
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenants we want to update
     *   }
     * })
     */
    upsert<T extends tenantsUpsertArgs>(args: SelectSubset<T, tenantsUpsertArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tenantsCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenants.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends tenantsCountArgs>(
      args?: Subset<T, tenantsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantsAggregateArgs>(args: Subset<T, TenantsAggregateArgs>): Prisma.PrismaPromise<GetTenantsAggregateType<T>>

    /**
     * Group by Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tenantsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tenantsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tenantsGroupByArgs['orderBy'] }
        : { orderBy?: tenantsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tenantsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tenants model
   */
  readonly fields: tenantsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tenants.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tenantsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tenants model
   */
  interface tenantsFieldRefs {
    readonly id: FieldRef<"tenants", 'String'>
    readonly name: FieldRef<"tenants", 'String'>
    readonly created_at: FieldRef<"tenants", 'DateTime'>
    readonly created_by: FieldRef<"tenants", 'String'>
    readonly updated_at: FieldRef<"tenants", 'DateTime'>
    readonly updated_by: FieldRef<"tenants", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tenants findUnique
   */
  export type tenantsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Filter, which tenants to fetch.
     */
    where: tenantsWhereUniqueInput
  }

  /**
   * tenants findUniqueOrThrow
   */
  export type tenantsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Filter, which tenants to fetch.
     */
    where: tenantsWhereUniqueInput
  }

  /**
   * tenants findFirst
   */
  export type tenantsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Filter, which tenants to fetch.
     */
    where?: tenantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tenants to fetch.
     */
    orderBy?: tenantsOrderByWithRelationInput | tenantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tenants.
     */
    cursor?: tenantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tenants.
     */
    distinct?: TenantsScalarFieldEnum | TenantsScalarFieldEnum[]
  }

  /**
   * tenants findFirstOrThrow
   */
  export type tenantsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Filter, which tenants to fetch.
     */
    where?: tenantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tenants to fetch.
     */
    orderBy?: tenantsOrderByWithRelationInput | tenantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tenants.
     */
    cursor?: tenantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tenants.
     */
    distinct?: TenantsScalarFieldEnum | TenantsScalarFieldEnum[]
  }

  /**
   * tenants findMany
   */
  export type tenantsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Filter, which tenants to fetch.
     */
    where?: tenantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tenants to fetch.
     */
    orderBy?: tenantsOrderByWithRelationInput | tenantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tenants.
     */
    cursor?: tenantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tenants.
     */
    skip?: number
    distinct?: TenantsScalarFieldEnum | TenantsScalarFieldEnum[]
  }

  /**
   * tenants create
   */
  export type tenantsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * The data needed to create a tenants.
     */
    data: XOR<tenantsCreateInput, tenantsUncheckedCreateInput>
  }

  /**
   * tenants createMany
   */
  export type tenantsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tenants.
     */
    data: tenantsCreateManyInput | tenantsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tenants createManyAndReturn
   */
  export type tenantsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * The data used to create many tenants.
     */
    data: tenantsCreateManyInput | tenantsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tenants update
   */
  export type tenantsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * The data needed to update a tenants.
     */
    data: XOR<tenantsUpdateInput, tenantsUncheckedUpdateInput>
    /**
     * Choose, which tenants to update.
     */
    where: tenantsWhereUniqueInput
  }

  /**
   * tenants updateMany
   */
  export type tenantsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tenants.
     */
    data: XOR<tenantsUpdateManyMutationInput, tenantsUncheckedUpdateManyInput>
    /**
     * Filter which tenants to update
     */
    where?: tenantsWhereInput
    /**
     * Limit how many tenants to update.
     */
    limit?: number
  }

  /**
   * tenants updateManyAndReturn
   */
  export type tenantsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * The data used to update tenants.
     */
    data: XOR<tenantsUpdateManyMutationInput, tenantsUncheckedUpdateManyInput>
    /**
     * Filter which tenants to update
     */
    where?: tenantsWhereInput
    /**
     * Limit how many tenants to update.
     */
    limit?: number
  }

  /**
   * tenants upsert
   */
  export type tenantsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * The filter to search for the tenants to update in case it exists.
     */
    where: tenantsWhereUniqueInput
    /**
     * In case the tenants found by the `where` argument doesn't exist, create a new tenants with this data.
     */
    create: XOR<tenantsCreateInput, tenantsUncheckedCreateInput>
    /**
     * In case the tenants was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tenantsUpdateInput, tenantsUncheckedUpdateInput>
  }

  /**
   * tenants delete
   */
  export type tenantsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Filter which tenants to delete.
     */
    where: tenantsWhereUniqueInput
  }

  /**
   * tenants deleteMany
   */
  export type tenantsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tenants to delete
     */
    where?: tenantsWhereInput
    /**
     * Limit how many tenants to delete.
     */
    limit?: number
  }

  /**
   * tenants without action
   */
  export type tenantsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
  }


  /**
   * Model contacts
   */

  export type AggregateContacts = {
    _count: ContactsCountAggregateOutputType | null
    _min: ContactsMinAggregateOutputType | null
    _max: ContactsMaxAggregateOutputType | null
  }

  export type ContactsMinAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    email: string | null
    first_name: string | null
    last_name: string | null
    last_activity_at: Date | null
    subscriber_list_contacts_id: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type ContactsMaxAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    email: string | null
    first_name: string | null
    last_name: string | null
    last_activity_at: Date | null
    subscriber_list_contacts_id: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type ContactsCountAggregateOutputType = {
    id: number
    tenant_id: number
    email: number
    first_name: number
    last_name: number
    last_activity_at: number
    subscriber_list_contacts_id: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    list_ids: number
    _all: number
  }


  export type ContactsMinAggregateInputType = {
    id?: true
    tenant_id?: true
    email?: true
    first_name?: true
    last_name?: true
    last_activity_at?: true
    subscriber_list_contacts_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type ContactsMaxAggregateInputType = {
    id?: true
    tenant_id?: true
    email?: true
    first_name?: true
    last_name?: true
    last_activity_at?: true
    subscriber_list_contacts_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type ContactsCountAggregateInputType = {
    id?: true
    tenant_id?: true
    email?: true
    first_name?: true
    last_name?: true
    last_activity_at?: true
    subscriber_list_contacts_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    list_ids?: true
    _all?: true
  }

  export type ContactsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which contacts to aggregate.
     */
    where?: contactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of contacts to fetch.
     */
    orderBy?: contactsOrderByWithRelationInput | contactsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: contactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned contacts
    **/
    _count?: true | ContactsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactsMaxAggregateInputType
  }

  export type GetContactsAggregateType<T extends ContactsAggregateArgs> = {
        [P in keyof T & keyof AggregateContacts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContacts[P]>
      : GetScalarType<T[P], AggregateContacts[P]>
  }




  export type contactsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: contactsWhereInput
    orderBy?: contactsOrderByWithAggregationInput | contactsOrderByWithAggregationInput[]
    by: ContactsScalarFieldEnum[] | ContactsScalarFieldEnum
    having?: contactsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactsCountAggregateInputType | true
    _min?: ContactsMinAggregateInputType
    _max?: ContactsMaxAggregateInputType
  }

  export type ContactsGroupByOutputType = {
    id: string
    tenant_id: string
    email: string
    first_name: string | null
    last_name: string | null
    last_activity_at: Date | null
    subscriber_list_contacts_id: string | null
    created_at: Date
    created_by: string
    updated_at: Date | null
    updated_by: string | null
    list_ids: string[]
    _count: ContactsCountAggregateOutputType | null
    _min: ContactsMinAggregateOutputType | null
    _max: ContactsMaxAggregateOutputType | null
  }

  type GetContactsGroupByPayload<T extends contactsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactsGroupByOutputType[P]>
            : GetScalarType<T[P], ContactsGroupByOutputType[P]>
        }
      >
    >


  export type contactsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    last_activity_at?: boolean
    subscriber_list_contacts_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    list_ids?: boolean
    SubscriberListContacts?: boolean | contacts$SubscriberListContactsArgs<ExtArgs>
    activity?: boolean | contacts$activityArgs<ExtArgs>
    bounce?: boolean | contacts$bounceArgs<ExtArgs>
    subscriber?: boolean | contacts$subscriberArgs<ExtArgs>
    unsubscribe?: boolean | contacts$unsubscribeArgs<ExtArgs>
    _count?: boolean | ContactsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contacts"]>

  export type contactsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    last_activity_at?: boolean
    subscriber_list_contacts_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    list_ids?: boolean
    SubscriberListContacts?: boolean | contacts$SubscriberListContactsArgs<ExtArgs>
  }, ExtArgs["result"]["contacts"]>

  export type contactsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    last_activity_at?: boolean
    subscriber_list_contacts_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    list_ids?: boolean
    SubscriberListContacts?: boolean | contacts$SubscriberListContactsArgs<ExtArgs>
  }, ExtArgs["result"]["contacts"]>

  export type contactsSelectScalar = {
    id?: boolean
    tenant_id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    last_activity_at?: boolean
    subscriber_list_contacts_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    list_ids?: boolean
  }

  export type contactsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenant_id" | "email" | "first_name" | "last_name" | "last_activity_at" | "subscriber_list_contacts_id" | "created_at" | "created_by" | "updated_at" | "updated_by" | "list_ids", ExtArgs["result"]["contacts"]>
  export type contactsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SubscriberListContacts?: boolean | contacts$SubscriberListContactsArgs<ExtArgs>
    activity?: boolean | contacts$activityArgs<ExtArgs>
    bounce?: boolean | contacts$bounceArgs<ExtArgs>
    subscriber?: boolean | contacts$subscriberArgs<ExtArgs>
    unsubscribe?: boolean | contacts$unsubscribeArgs<ExtArgs>
    _count?: boolean | ContactsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type contactsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SubscriberListContacts?: boolean | contacts$SubscriberListContactsArgs<ExtArgs>
  }
  export type contactsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SubscriberListContacts?: boolean | contacts$SubscriberListContactsArgs<ExtArgs>
  }

  export type $contactsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "contacts"
    objects: {
      SubscriberListContacts: Prisma.$subscriber_list_contactsPayload<ExtArgs> | null
      activity: Prisma.$activitiesPayload<ExtArgs>[]
      bounce: Prisma.$bouncesPayload<ExtArgs>[]
      subscriber: Prisma.$subscribersPayload<ExtArgs>[]
      unsubscribe: Prisma.$unsubscribesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenant_id: string
      email: string
      first_name: string | null
      last_name: string | null
      last_activity_at: Date | null
      subscriber_list_contacts_id: string | null
      created_at: Date
      created_by: string
      updated_at: Date | null
      updated_by: string | null
      list_ids: string[]
    }, ExtArgs["result"]["contacts"]>
    composites: {}
  }

  type contactsGetPayload<S extends boolean | null | undefined | contactsDefaultArgs> = $Result.GetResult<Prisma.$contactsPayload, S>

  type contactsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<contactsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactsCountAggregateInputType | true
    }

  export interface contactsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['contacts'], meta: { name: 'contacts' } }
    /**
     * Find zero or one Contacts that matches the filter.
     * @param {contactsFindUniqueArgs} args - Arguments to find a Contacts
     * @example
     * // Get one Contacts
     * const contacts = await prisma.contacts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends contactsFindUniqueArgs>(args: SelectSubset<T, contactsFindUniqueArgs<ExtArgs>>): Prisma__contactsClient<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contacts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {contactsFindUniqueOrThrowArgs} args - Arguments to find a Contacts
     * @example
     * // Get one Contacts
     * const contacts = await prisma.contacts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends contactsFindUniqueOrThrowArgs>(args: SelectSubset<T, contactsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__contactsClient<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contactsFindFirstArgs} args - Arguments to find a Contacts
     * @example
     * // Get one Contacts
     * const contacts = await prisma.contacts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends contactsFindFirstArgs>(args?: SelectSubset<T, contactsFindFirstArgs<ExtArgs>>): Prisma__contactsClient<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contacts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contactsFindFirstOrThrowArgs} args - Arguments to find a Contacts
     * @example
     * // Get one Contacts
     * const contacts = await prisma.contacts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends contactsFindFirstOrThrowArgs>(args?: SelectSubset<T, contactsFindFirstOrThrowArgs<ExtArgs>>): Prisma__contactsClient<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contactsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contacts.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contacts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactsWithIdOnly = await prisma.contacts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends contactsFindManyArgs>(args?: SelectSubset<T, contactsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contacts.
     * @param {contactsCreateArgs} args - Arguments to create a Contacts.
     * @example
     * // Create one Contacts
     * const Contacts = await prisma.contacts.create({
     *   data: {
     *     // ... data to create a Contacts
     *   }
     * })
     * 
     */
    create<T extends contactsCreateArgs>(args: SelectSubset<T, contactsCreateArgs<ExtArgs>>): Prisma__contactsClient<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contacts.
     * @param {contactsCreateManyArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contacts = await prisma.contacts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends contactsCreateManyArgs>(args?: SelectSubset<T, contactsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contacts and returns the data saved in the database.
     * @param {contactsCreateManyAndReturnArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contacts = await prisma.contacts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contacts and only return the `id`
     * const contactsWithIdOnly = await prisma.contacts.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends contactsCreateManyAndReturnArgs>(args?: SelectSubset<T, contactsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contacts.
     * @param {contactsDeleteArgs} args - Arguments to delete one Contacts.
     * @example
     * // Delete one Contacts
     * const Contacts = await prisma.contacts.delete({
     *   where: {
     *     // ... filter to delete one Contacts
     *   }
     * })
     * 
     */
    delete<T extends contactsDeleteArgs>(args: SelectSubset<T, contactsDeleteArgs<ExtArgs>>): Prisma__contactsClient<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contacts.
     * @param {contactsUpdateArgs} args - Arguments to update one Contacts.
     * @example
     * // Update one Contacts
     * const contacts = await prisma.contacts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends contactsUpdateArgs>(args: SelectSubset<T, contactsUpdateArgs<ExtArgs>>): Prisma__contactsClient<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contacts.
     * @param {contactsDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contacts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends contactsDeleteManyArgs>(args?: SelectSubset<T, contactsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contactsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contacts = await prisma.contacts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends contactsUpdateManyArgs>(args: SelectSubset<T, contactsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts and returns the data updated in the database.
     * @param {contactsUpdateManyAndReturnArgs} args - Arguments to update many Contacts.
     * @example
     * // Update many Contacts
     * const contacts = await prisma.contacts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contacts and only return the `id`
     * const contactsWithIdOnly = await prisma.contacts.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends contactsUpdateManyAndReturnArgs>(args: SelectSubset<T, contactsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contacts.
     * @param {contactsUpsertArgs} args - Arguments to update or create a Contacts.
     * @example
     * // Update or create a Contacts
     * const contacts = await prisma.contacts.upsert({
     *   create: {
     *     // ... data to create a Contacts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contacts we want to update
     *   }
     * })
     */
    upsert<T extends contactsUpsertArgs>(args: SelectSubset<T, contactsUpsertArgs<ExtArgs>>): Prisma__contactsClient<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contactsCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contacts.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends contactsCountArgs>(
      args?: Subset<T, contactsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactsAggregateArgs>(args: Subset<T, ContactsAggregateArgs>): Prisma.PrismaPromise<GetContactsAggregateType<T>>

    /**
     * Group by Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contactsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends contactsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: contactsGroupByArgs['orderBy'] }
        : { orderBy?: contactsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, contactsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the contacts model
   */
  readonly fields: contactsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for contacts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__contactsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    SubscriberListContacts<T extends contacts$SubscriberListContactsArgs<ExtArgs> = {}>(args?: Subset<T, contacts$SubscriberListContactsArgs<ExtArgs>>): Prisma__subscriber_list_contactsClient<$Result.GetResult<Prisma.$subscriber_list_contactsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    activity<T extends contacts$activityArgs<ExtArgs> = {}>(args?: Subset<T, contacts$activityArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activitiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bounce<T extends contacts$bounceArgs<ExtArgs> = {}>(args?: Subset<T, contacts$bounceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bouncesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscriber<T extends contacts$subscriberArgs<ExtArgs> = {}>(args?: Subset<T, contacts$subscriberArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscribersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    unsubscribe<T extends contacts$unsubscribeArgs<ExtArgs> = {}>(args?: Subset<T, contacts$unsubscribeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$unsubscribesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the contacts model
   */
  interface contactsFieldRefs {
    readonly id: FieldRef<"contacts", 'String'>
    readonly tenant_id: FieldRef<"contacts", 'String'>
    readonly email: FieldRef<"contacts", 'String'>
    readonly first_name: FieldRef<"contacts", 'String'>
    readonly last_name: FieldRef<"contacts", 'String'>
    readonly last_activity_at: FieldRef<"contacts", 'DateTime'>
    readonly subscriber_list_contacts_id: FieldRef<"contacts", 'String'>
    readonly created_at: FieldRef<"contacts", 'DateTime'>
    readonly created_by: FieldRef<"contacts", 'String'>
    readonly updated_at: FieldRef<"contacts", 'DateTime'>
    readonly updated_by: FieldRef<"contacts", 'String'>
    readonly list_ids: FieldRef<"contacts", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * contacts findUnique
   */
  export type contactsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contacts
     */
    select?: contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contacts
     */
    omit?: contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: contactsInclude<ExtArgs> | null
    /**
     * Filter, which contacts to fetch.
     */
    where: contactsWhereUniqueInput
  }

  /**
   * contacts findUniqueOrThrow
   */
  export type contactsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contacts
     */
    select?: contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contacts
     */
    omit?: contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: contactsInclude<ExtArgs> | null
    /**
     * Filter, which contacts to fetch.
     */
    where: contactsWhereUniqueInput
  }

  /**
   * contacts findFirst
   */
  export type contactsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contacts
     */
    select?: contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contacts
     */
    omit?: contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: contactsInclude<ExtArgs> | null
    /**
     * Filter, which contacts to fetch.
     */
    where?: contactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of contacts to fetch.
     */
    orderBy?: contactsOrderByWithRelationInput | contactsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for contacts.
     */
    cursor?: contactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of contacts.
     */
    distinct?: ContactsScalarFieldEnum | ContactsScalarFieldEnum[]
  }

  /**
   * contacts findFirstOrThrow
   */
  export type contactsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contacts
     */
    select?: contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contacts
     */
    omit?: contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: contactsInclude<ExtArgs> | null
    /**
     * Filter, which contacts to fetch.
     */
    where?: contactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of contacts to fetch.
     */
    orderBy?: contactsOrderByWithRelationInput | contactsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for contacts.
     */
    cursor?: contactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of contacts.
     */
    distinct?: ContactsScalarFieldEnum | ContactsScalarFieldEnum[]
  }

  /**
   * contacts findMany
   */
  export type contactsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contacts
     */
    select?: contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contacts
     */
    omit?: contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: contactsInclude<ExtArgs> | null
    /**
     * Filter, which contacts to fetch.
     */
    where?: contactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of contacts to fetch.
     */
    orderBy?: contactsOrderByWithRelationInput | contactsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing contacts.
     */
    cursor?: contactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` contacts.
     */
    skip?: number
    distinct?: ContactsScalarFieldEnum | ContactsScalarFieldEnum[]
  }

  /**
   * contacts create
   */
  export type contactsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contacts
     */
    select?: contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contacts
     */
    omit?: contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: contactsInclude<ExtArgs> | null
    /**
     * The data needed to create a contacts.
     */
    data: XOR<contactsCreateInput, contactsUncheckedCreateInput>
  }

  /**
   * contacts createMany
   */
  export type contactsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many contacts.
     */
    data: contactsCreateManyInput | contactsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * contacts createManyAndReturn
   */
  export type contactsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contacts
     */
    select?: contactsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the contacts
     */
    omit?: contactsOmit<ExtArgs> | null
    /**
     * The data used to create many contacts.
     */
    data: contactsCreateManyInput | contactsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: contactsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * contacts update
   */
  export type contactsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contacts
     */
    select?: contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contacts
     */
    omit?: contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: contactsInclude<ExtArgs> | null
    /**
     * The data needed to update a contacts.
     */
    data: XOR<contactsUpdateInput, contactsUncheckedUpdateInput>
    /**
     * Choose, which contacts to update.
     */
    where: contactsWhereUniqueInput
  }

  /**
   * contacts updateMany
   */
  export type contactsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update contacts.
     */
    data: XOR<contactsUpdateManyMutationInput, contactsUncheckedUpdateManyInput>
    /**
     * Filter which contacts to update
     */
    where?: contactsWhereInput
    /**
     * Limit how many contacts to update.
     */
    limit?: number
  }

  /**
   * contacts updateManyAndReturn
   */
  export type contactsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contacts
     */
    select?: contactsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the contacts
     */
    omit?: contactsOmit<ExtArgs> | null
    /**
     * The data used to update contacts.
     */
    data: XOR<contactsUpdateManyMutationInput, contactsUncheckedUpdateManyInput>
    /**
     * Filter which contacts to update
     */
    where?: contactsWhereInput
    /**
     * Limit how many contacts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: contactsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * contacts upsert
   */
  export type contactsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contacts
     */
    select?: contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contacts
     */
    omit?: contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: contactsInclude<ExtArgs> | null
    /**
     * The filter to search for the contacts to update in case it exists.
     */
    where: contactsWhereUniqueInput
    /**
     * In case the contacts found by the `where` argument doesn't exist, create a new contacts with this data.
     */
    create: XOR<contactsCreateInput, contactsUncheckedCreateInput>
    /**
     * In case the contacts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<contactsUpdateInput, contactsUncheckedUpdateInput>
  }

  /**
   * contacts delete
   */
  export type contactsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contacts
     */
    select?: contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contacts
     */
    omit?: contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: contactsInclude<ExtArgs> | null
    /**
     * Filter which contacts to delete.
     */
    where: contactsWhereUniqueInput
  }

  /**
   * contacts deleteMany
   */
  export type contactsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which contacts to delete
     */
    where?: contactsWhereInput
    /**
     * Limit how many contacts to delete.
     */
    limit?: number
  }

  /**
   * contacts.SubscriberListContacts
   */
  export type contacts$SubscriberListContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsInclude<ExtArgs> | null
    where?: subscriber_list_contactsWhereInput
  }

  /**
   * contacts.activity
   */
  export type contacts$activityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesInclude<ExtArgs> | null
    where?: activitiesWhereInput
    orderBy?: activitiesOrderByWithRelationInput | activitiesOrderByWithRelationInput[]
    cursor?: activitiesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivitiesScalarFieldEnum | ActivitiesScalarFieldEnum[]
  }

  /**
   * contacts.bounce
   */
  export type contacts$bounceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bounces
     */
    select?: bouncesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bounces
     */
    omit?: bouncesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bouncesInclude<ExtArgs> | null
    where?: bouncesWhereInput
    orderBy?: bouncesOrderByWithRelationInput | bouncesOrderByWithRelationInput[]
    cursor?: bouncesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BouncesScalarFieldEnum | BouncesScalarFieldEnum[]
  }

  /**
   * contacts.subscriber
   */
  export type contacts$subscriberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscribers
     */
    select?: subscribersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscribers
     */
    omit?: subscribersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscribersInclude<ExtArgs> | null
    where?: subscribersWhereInput
    orderBy?: subscribersOrderByWithRelationInput | subscribersOrderByWithRelationInput[]
    cursor?: subscribersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscribersScalarFieldEnum | SubscribersScalarFieldEnum[]
  }

  /**
   * contacts.unsubscribe
   */
  export type contacts$unsubscribeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unsubscribes
     */
    select?: unsubscribesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unsubscribes
     */
    omit?: unsubscribesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unsubscribesInclude<ExtArgs> | null
    where?: unsubscribesWhereInput
    orderBy?: unsubscribesOrderByWithRelationInput | unsubscribesOrderByWithRelationInput[]
    cursor?: unsubscribesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UnsubscribesScalarFieldEnum | UnsubscribesScalarFieldEnum[]
  }

  /**
   * contacts without action
   */
  export type contactsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contacts
     */
    select?: contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contacts
     */
    omit?: contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: contactsInclude<ExtArgs> | null
  }


  /**
   * Model campaigns
   */

  export type AggregateCampaigns = {
    _count: CampaignsCountAggregateOutputType | null
    _avg: CampaignsAvgAggregateOutputType | null
    _sum: CampaignsSumAggregateOutputType | null
    _min: CampaignsMinAggregateOutputType | null
    _max: CampaignsMaxAggregateOutputType | null
  }

  export type CampaignsAvgAggregateOutputType = {
    recipients: number | null
    sent: number | null
    delivered: number | null
  }

  export type CampaignsSumAggregateOutputType = {
    recipients: number | null
    sent: number | null
    delivered: number | null
  }

  export type CampaignsMinAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    name: string | null
    status: $Enums.campaign_status | null
    type: $Enums.campaign_type | null
    recipients: number | null
    sent: number | null
    delivered: number | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type CampaignsMaxAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    name: string | null
    status: $Enums.campaign_status | null
    type: $Enums.campaign_type | null
    recipients: number | null
    sent: number | null
    delivered: number | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type CampaignsCountAggregateOutputType = {
    id: number
    tenant_id: number
    name: number
    status: number
    type: number
    recipients: number
    sent: number
    delivered: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    _all: number
  }


  export type CampaignsAvgAggregateInputType = {
    recipients?: true
    sent?: true
    delivered?: true
  }

  export type CampaignsSumAggregateInputType = {
    recipients?: true
    sent?: true
    delivered?: true
  }

  export type CampaignsMinAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    status?: true
    type?: true
    recipients?: true
    sent?: true
    delivered?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type CampaignsMaxAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    status?: true
    type?: true
    recipients?: true
    sent?: true
    delivered?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type CampaignsCountAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    status?: true
    type?: true
    recipients?: true
    sent?: true
    delivered?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    _all?: true
  }

  export type CampaignsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which campaigns to aggregate.
     */
    where?: campaignsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of campaigns to fetch.
     */
    orderBy?: campaignsOrderByWithRelationInput | campaignsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: campaignsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned campaigns
    **/
    _count?: true | CampaignsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampaignsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampaignsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignsMaxAggregateInputType
  }

  export type GetCampaignsAggregateType<T extends CampaignsAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaigns]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaigns[P]>
      : GetScalarType<T[P], AggregateCampaigns[P]>
  }




  export type campaignsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: campaignsWhereInput
    orderBy?: campaignsOrderByWithAggregationInput | campaignsOrderByWithAggregationInput[]
    by: CampaignsScalarFieldEnum[] | CampaignsScalarFieldEnum
    having?: campaignsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignsCountAggregateInputType | true
    _avg?: CampaignsAvgAggregateInputType
    _sum?: CampaignsSumAggregateInputType
    _min?: CampaignsMinAggregateInputType
    _max?: CampaignsMaxAggregateInputType
  }

  export type CampaignsGroupByOutputType = {
    id: string
    tenant_id: string
    name: string
    status: $Enums.campaign_status
    type: $Enums.campaign_type
    recipients: number
    sent: number
    delivered: number
    created_at: Date
    created_by: string
    updated_at: Date | null
    updated_by: string | null
    _count: CampaignsCountAggregateOutputType | null
    _avg: CampaignsAvgAggregateOutputType | null
    _sum: CampaignsSumAggregateOutputType | null
    _min: CampaignsMinAggregateOutputType | null
    _max: CampaignsMaxAggregateOutputType | null
  }

  type GetCampaignsGroupByPayload<T extends campaignsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignsGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignsGroupByOutputType[P]>
        }
      >
    >


  export type campaignsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    status?: boolean
    type?: boolean
    recipients?: boolean
    sent?: boolean
    delivered?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    activity?: boolean | campaigns$activityArgs<ExtArgs>
    _count?: boolean | CampaignsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaigns"]>

  export type campaignsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    status?: boolean
    type?: boolean
    recipients?: boolean
    sent?: boolean
    delivered?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["campaigns"]>

  export type campaignsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    status?: boolean
    type?: boolean
    recipients?: boolean
    sent?: boolean
    delivered?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["campaigns"]>

  export type campaignsSelectScalar = {
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    status?: boolean
    type?: boolean
    recipients?: boolean
    sent?: boolean
    delivered?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }

  export type campaignsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenant_id" | "name" | "status" | "type" | "recipients" | "sent" | "delivered" | "created_at" | "created_by" | "updated_at" | "updated_by", ExtArgs["result"]["campaigns"]>
  export type campaignsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activity?: boolean | campaigns$activityArgs<ExtArgs>
    _count?: boolean | CampaignsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type campaignsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type campaignsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $campaignsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "campaigns"
    objects: {
      activity: Prisma.$activitiesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenant_id: string
      name: string
      status: $Enums.campaign_status
      type: $Enums.campaign_type
      recipients: number
      sent: number
      delivered: number
      created_at: Date
      created_by: string
      updated_at: Date | null
      updated_by: string | null
    }, ExtArgs["result"]["campaigns"]>
    composites: {}
  }

  type campaignsGetPayload<S extends boolean | null | undefined | campaignsDefaultArgs> = $Result.GetResult<Prisma.$campaignsPayload, S>

  type campaignsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<campaignsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignsCountAggregateInputType | true
    }

  export interface campaignsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['campaigns'], meta: { name: 'campaigns' } }
    /**
     * Find zero or one Campaigns that matches the filter.
     * @param {campaignsFindUniqueArgs} args - Arguments to find a Campaigns
     * @example
     * // Get one Campaigns
     * const campaigns = await prisma.campaigns.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends campaignsFindUniqueArgs>(args: SelectSubset<T, campaignsFindUniqueArgs<ExtArgs>>): Prisma__campaignsClient<$Result.GetResult<Prisma.$campaignsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Campaigns that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {campaignsFindUniqueOrThrowArgs} args - Arguments to find a Campaigns
     * @example
     * // Get one Campaigns
     * const campaigns = await prisma.campaigns.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends campaignsFindUniqueOrThrowArgs>(args: SelectSubset<T, campaignsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__campaignsClient<$Result.GetResult<Prisma.$campaignsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {campaignsFindFirstArgs} args - Arguments to find a Campaigns
     * @example
     * // Get one Campaigns
     * const campaigns = await prisma.campaigns.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends campaignsFindFirstArgs>(args?: SelectSubset<T, campaignsFindFirstArgs<ExtArgs>>): Prisma__campaignsClient<$Result.GetResult<Prisma.$campaignsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaigns that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {campaignsFindFirstOrThrowArgs} args - Arguments to find a Campaigns
     * @example
     * // Get one Campaigns
     * const campaigns = await prisma.campaigns.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends campaignsFindFirstOrThrowArgs>(args?: SelectSubset<T, campaignsFindFirstOrThrowArgs<ExtArgs>>): Prisma__campaignsClient<$Result.GetResult<Prisma.$campaignsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Campaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {campaignsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campaigns
     * const campaigns = await prisma.campaigns.findMany()
     * 
     * // Get first 10 Campaigns
     * const campaigns = await prisma.campaigns.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignsWithIdOnly = await prisma.campaigns.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends campaignsFindManyArgs>(args?: SelectSubset<T, campaignsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$campaignsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Campaigns.
     * @param {campaignsCreateArgs} args - Arguments to create a Campaigns.
     * @example
     * // Create one Campaigns
     * const Campaigns = await prisma.campaigns.create({
     *   data: {
     *     // ... data to create a Campaigns
     *   }
     * })
     * 
     */
    create<T extends campaignsCreateArgs>(args: SelectSubset<T, campaignsCreateArgs<ExtArgs>>): Prisma__campaignsClient<$Result.GetResult<Prisma.$campaignsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Campaigns.
     * @param {campaignsCreateManyArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaigns = await prisma.campaigns.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends campaignsCreateManyArgs>(args?: SelectSubset<T, campaignsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Campaigns and returns the data saved in the database.
     * @param {campaignsCreateManyAndReturnArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaigns = await prisma.campaigns.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Campaigns and only return the `id`
     * const campaignsWithIdOnly = await prisma.campaigns.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends campaignsCreateManyAndReturnArgs>(args?: SelectSubset<T, campaignsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$campaignsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Campaigns.
     * @param {campaignsDeleteArgs} args - Arguments to delete one Campaigns.
     * @example
     * // Delete one Campaigns
     * const Campaigns = await prisma.campaigns.delete({
     *   where: {
     *     // ... filter to delete one Campaigns
     *   }
     * })
     * 
     */
    delete<T extends campaignsDeleteArgs>(args: SelectSubset<T, campaignsDeleteArgs<ExtArgs>>): Prisma__campaignsClient<$Result.GetResult<Prisma.$campaignsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Campaigns.
     * @param {campaignsUpdateArgs} args - Arguments to update one Campaigns.
     * @example
     * // Update one Campaigns
     * const campaigns = await prisma.campaigns.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends campaignsUpdateArgs>(args: SelectSubset<T, campaignsUpdateArgs<ExtArgs>>): Prisma__campaignsClient<$Result.GetResult<Prisma.$campaignsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Campaigns.
     * @param {campaignsDeleteManyArgs} args - Arguments to filter Campaigns to delete.
     * @example
     * // Delete a few Campaigns
     * const { count } = await prisma.campaigns.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends campaignsDeleteManyArgs>(args?: SelectSubset<T, campaignsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {campaignsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campaigns
     * const campaigns = await prisma.campaigns.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends campaignsUpdateManyArgs>(args: SelectSubset<T, campaignsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns and returns the data updated in the database.
     * @param {campaignsUpdateManyAndReturnArgs} args - Arguments to update many Campaigns.
     * @example
     * // Update many Campaigns
     * const campaigns = await prisma.campaigns.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Campaigns and only return the `id`
     * const campaignsWithIdOnly = await prisma.campaigns.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends campaignsUpdateManyAndReturnArgs>(args: SelectSubset<T, campaignsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$campaignsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Campaigns.
     * @param {campaignsUpsertArgs} args - Arguments to update or create a Campaigns.
     * @example
     * // Update or create a Campaigns
     * const campaigns = await prisma.campaigns.upsert({
     *   create: {
     *     // ... data to create a Campaigns
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campaigns we want to update
     *   }
     * })
     */
    upsert<T extends campaignsUpsertArgs>(args: SelectSubset<T, campaignsUpsertArgs<ExtArgs>>): Prisma__campaignsClient<$Result.GetResult<Prisma.$campaignsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {campaignsCountArgs} args - Arguments to filter Campaigns to count.
     * @example
     * // Count the number of Campaigns
     * const count = await prisma.campaigns.count({
     *   where: {
     *     // ... the filter for the Campaigns we want to count
     *   }
     * })
    **/
    count<T extends campaignsCountArgs>(
      args?: Subset<T, campaignsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampaignsAggregateArgs>(args: Subset<T, CampaignsAggregateArgs>): Prisma.PrismaPromise<GetCampaignsAggregateType<T>>

    /**
     * Group by Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {campaignsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends campaignsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: campaignsGroupByArgs['orderBy'] }
        : { orderBy?: campaignsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, campaignsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the campaigns model
   */
  readonly fields: campaignsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for campaigns.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__campaignsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activity<T extends campaigns$activityArgs<ExtArgs> = {}>(args?: Subset<T, campaigns$activityArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activitiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the campaigns model
   */
  interface campaignsFieldRefs {
    readonly id: FieldRef<"campaigns", 'String'>
    readonly tenant_id: FieldRef<"campaigns", 'String'>
    readonly name: FieldRef<"campaigns", 'String'>
    readonly status: FieldRef<"campaigns", 'campaign_status'>
    readonly type: FieldRef<"campaigns", 'campaign_type'>
    readonly recipients: FieldRef<"campaigns", 'Int'>
    readonly sent: FieldRef<"campaigns", 'Int'>
    readonly delivered: FieldRef<"campaigns", 'Int'>
    readonly created_at: FieldRef<"campaigns", 'DateTime'>
    readonly created_by: FieldRef<"campaigns", 'String'>
    readonly updated_at: FieldRef<"campaigns", 'DateTime'>
    readonly updated_by: FieldRef<"campaigns", 'String'>
  }
    

  // Custom InputTypes
  /**
   * campaigns findUnique
   */
  export type campaignsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the campaigns
     */
    select?: campaignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the campaigns
     */
    omit?: campaignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: campaignsInclude<ExtArgs> | null
    /**
     * Filter, which campaigns to fetch.
     */
    where: campaignsWhereUniqueInput
  }

  /**
   * campaigns findUniqueOrThrow
   */
  export type campaignsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the campaigns
     */
    select?: campaignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the campaigns
     */
    omit?: campaignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: campaignsInclude<ExtArgs> | null
    /**
     * Filter, which campaigns to fetch.
     */
    where: campaignsWhereUniqueInput
  }

  /**
   * campaigns findFirst
   */
  export type campaignsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the campaigns
     */
    select?: campaignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the campaigns
     */
    omit?: campaignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: campaignsInclude<ExtArgs> | null
    /**
     * Filter, which campaigns to fetch.
     */
    where?: campaignsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of campaigns to fetch.
     */
    orderBy?: campaignsOrderByWithRelationInput | campaignsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for campaigns.
     */
    cursor?: campaignsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of campaigns.
     */
    distinct?: CampaignsScalarFieldEnum | CampaignsScalarFieldEnum[]
  }

  /**
   * campaigns findFirstOrThrow
   */
  export type campaignsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the campaigns
     */
    select?: campaignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the campaigns
     */
    omit?: campaignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: campaignsInclude<ExtArgs> | null
    /**
     * Filter, which campaigns to fetch.
     */
    where?: campaignsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of campaigns to fetch.
     */
    orderBy?: campaignsOrderByWithRelationInput | campaignsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for campaigns.
     */
    cursor?: campaignsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of campaigns.
     */
    distinct?: CampaignsScalarFieldEnum | CampaignsScalarFieldEnum[]
  }

  /**
   * campaigns findMany
   */
  export type campaignsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the campaigns
     */
    select?: campaignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the campaigns
     */
    omit?: campaignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: campaignsInclude<ExtArgs> | null
    /**
     * Filter, which campaigns to fetch.
     */
    where?: campaignsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of campaigns to fetch.
     */
    orderBy?: campaignsOrderByWithRelationInput | campaignsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing campaigns.
     */
    cursor?: campaignsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` campaigns.
     */
    skip?: number
    distinct?: CampaignsScalarFieldEnum | CampaignsScalarFieldEnum[]
  }

  /**
   * campaigns create
   */
  export type campaignsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the campaigns
     */
    select?: campaignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the campaigns
     */
    omit?: campaignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: campaignsInclude<ExtArgs> | null
    /**
     * The data needed to create a campaigns.
     */
    data: XOR<campaignsCreateInput, campaignsUncheckedCreateInput>
  }

  /**
   * campaigns createMany
   */
  export type campaignsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many campaigns.
     */
    data: campaignsCreateManyInput | campaignsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * campaigns createManyAndReturn
   */
  export type campaignsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the campaigns
     */
    select?: campaignsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the campaigns
     */
    omit?: campaignsOmit<ExtArgs> | null
    /**
     * The data used to create many campaigns.
     */
    data: campaignsCreateManyInput | campaignsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * campaigns update
   */
  export type campaignsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the campaigns
     */
    select?: campaignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the campaigns
     */
    omit?: campaignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: campaignsInclude<ExtArgs> | null
    /**
     * The data needed to update a campaigns.
     */
    data: XOR<campaignsUpdateInput, campaignsUncheckedUpdateInput>
    /**
     * Choose, which campaigns to update.
     */
    where: campaignsWhereUniqueInput
  }

  /**
   * campaigns updateMany
   */
  export type campaignsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update campaigns.
     */
    data: XOR<campaignsUpdateManyMutationInput, campaignsUncheckedUpdateManyInput>
    /**
     * Filter which campaigns to update
     */
    where?: campaignsWhereInput
    /**
     * Limit how many campaigns to update.
     */
    limit?: number
  }

  /**
   * campaigns updateManyAndReturn
   */
  export type campaignsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the campaigns
     */
    select?: campaignsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the campaigns
     */
    omit?: campaignsOmit<ExtArgs> | null
    /**
     * The data used to update campaigns.
     */
    data: XOR<campaignsUpdateManyMutationInput, campaignsUncheckedUpdateManyInput>
    /**
     * Filter which campaigns to update
     */
    where?: campaignsWhereInput
    /**
     * Limit how many campaigns to update.
     */
    limit?: number
  }

  /**
   * campaigns upsert
   */
  export type campaignsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the campaigns
     */
    select?: campaignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the campaigns
     */
    omit?: campaignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: campaignsInclude<ExtArgs> | null
    /**
     * The filter to search for the campaigns to update in case it exists.
     */
    where: campaignsWhereUniqueInput
    /**
     * In case the campaigns found by the `where` argument doesn't exist, create a new campaigns with this data.
     */
    create: XOR<campaignsCreateInput, campaignsUncheckedCreateInput>
    /**
     * In case the campaigns was found with the provided `where` argument, update it with this data.
     */
    update: XOR<campaignsUpdateInput, campaignsUncheckedUpdateInput>
  }

  /**
   * campaigns delete
   */
  export type campaignsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the campaigns
     */
    select?: campaignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the campaigns
     */
    omit?: campaignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: campaignsInclude<ExtArgs> | null
    /**
     * Filter which campaigns to delete.
     */
    where: campaignsWhereUniqueInput
  }

  /**
   * campaigns deleteMany
   */
  export type campaignsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which campaigns to delete
     */
    where?: campaignsWhereInput
    /**
     * Limit how many campaigns to delete.
     */
    limit?: number
  }

  /**
   * campaigns.activity
   */
  export type campaigns$activityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesInclude<ExtArgs> | null
    where?: activitiesWhereInput
    orderBy?: activitiesOrderByWithRelationInput | activitiesOrderByWithRelationInput[]
    cursor?: activitiesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivitiesScalarFieldEnum | ActivitiesScalarFieldEnum[]
  }

  /**
   * campaigns without action
   */
  export type campaignsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the campaigns
     */
    select?: campaignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the campaigns
     */
    omit?: campaignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: campaignsInclude<ExtArgs> | null
  }


  /**
   * Model activities
   */

  export type AggregateActivities = {
    _count: ActivitiesCountAggregateOutputType | null
    _avg: ActivitiesAvgAggregateOutputType | null
    _sum: ActivitiesSumAggregateOutputType | null
    _min: ActivitiesMinAggregateOutputType | null
    _max: ActivitiesMaxAggregateOutputType | null
  }

  export type ActivitiesAvgAggregateOutputType = {
    opens: number | null
    clicks: number | null
  }

  export type ActivitiesSumAggregateOutputType = {
    opens: number | null
    clicks: number | null
  }

  export type ActivitiesMinAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    send_name: string | null
    subject: string | null
    status: $Enums.activity_status | null
    sent_at: Date | null
    last_event_received_at: Date | null
    last_event_type: $Enums.event_type | null
    opens: number | null
    clicks: number | null
    campaign_id: string | null
    contact_id: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type ActivitiesMaxAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    send_name: string | null
    subject: string | null
    status: $Enums.activity_status | null
    sent_at: Date | null
    last_event_received_at: Date | null
    last_event_type: $Enums.event_type | null
    opens: number | null
    clicks: number | null
    campaign_id: string | null
    contact_id: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type ActivitiesCountAggregateOutputType = {
    id: number
    tenant_id: number
    send_name: number
    subject: number
    status: number
    sent_at: number
    last_event_received_at: number
    last_event_type: number
    opens: number
    clicks: number
    campaign_id: number
    contact_id: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    _all: number
  }


  export type ActivitiesAvgAggregateInputType = {
    opens?: true
    clicks?: true
  }

  export type ActivitiesSumAggregateInputType = {
    opens?: true
    clicks?: true
  }

  export type ActivitiesMinAggregateInputType = {
    id?: true
    tenant_id?: true
    send_name?: true
    subject?: true
    status?: true
    sent_at?: true
    last_event_received_at?: true
    last_event_type?: true
    opens?: true
    clicks?: true
    campaign_id?: true
    contact_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type ActivitiesMaxAggregateInputType = {
    id?: true
    tenant_id?: true
    send_name?: true
    subject?: true
    status?: true
    sent_at?: true
    last_event_received_at?: true
    last_event_type?: true
    opens?: true
    clicks?: true
    campaign_id?: true
    contact_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type ActivitiesCountAggregateInputType = {
    id?: true
    tenant_id?: true
    send_name?: true
    subject?: true
    status?: true
    sent_at?: true
    last_event_received_at?: true
    last_event_type?: true
    opens?: true
    clicks?: true
    campaign_id?: true
    contact_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    _all?: true
  }

  export type ActivitiesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which activities to aggregate.
     */
    where?: activitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activities to fetch.
     */
    orderBy?: activitiesOrderByWithRelationInput | activitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: activitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned activities
    **/
    _count?: true | ActivitiesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivitiesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivitiesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivitiesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivitiesMaxAggregateInputType
  }

  export type GetActivitiesAggregateType<T extends ActivitiesAggregateArgs> = {
        [P in keyof T & keyof AggregateActivities]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivities[P]>
      : GetScalarType<T[P], AggregateActivities[P]>
  }




  export type activitiesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: activitiesWhereInput
    orderBy?: activitiesOrderByWithAggregationInput | activitiesOrderByWithAggregationInput[]
    by: ActivitiesScalarFieldEnum[] | ActivitiesScalarFieldEnum
    having?: activitiesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivitiesCountAggregateInputType | true
    _avg?: ActivitiesAvgAggregateInputType
    _sum?: ActivitiesSumAggregateInputType
    _min?: ActivitiesMinAggregateInputType
    _max?: ActivitiesMaxAggregateInputType
  }

  export type ActivitiesGroupByOutputType = {
    id: string
    tenant_id: string
    send_name: string
    subject: string
    status: $Enums.activity_status
    sent_at: Date
    last_event_received_at: Date
    last_event_type: $Enums.event_type
    opens: number
    clicks: number
    campaign_id: string | null
    contact_id: string
    created_at: Date
    created_by: string
    updated_at: Date | null
    updated_by: string | null
    _count: ActivitiesCountAggregateOutputType | null
    _avg: ActivitiesAvgAggregateOutputType | null
    _sum: ActivitiesSumAggregateOutputType | null
    _min: ActivitiesMinAggregateOutputType | null
    _max: ActivitiesMaxAggregateOutputType | null
  }

  type GetActivitiesGroupByPayload<T extends activitiesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivitiesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivitiesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivitiesGroupByOutputType[P]>
            : GetScalarType<T[P], ActivitiesGroupByOutputType[P]>
        }
      >
    >


  export type activitiesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    send_name?: boolean
    subject?: boolean
    status?: boolean
    sent_at?: boolean
    last_event_received_at?: boolean
    last_event_type?: boolean
    opens?: boolean
    clicks?: boolean
    campaign_id?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    receiver?: boolean | contactsDefaultArgs<ExtArgs>
    campaign?: boolean | activities$campaignArgs<ExtArgs>
  }, ExtArgs["result"]["activities"]>

  export type activitiesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    send_name?: boolean
    subject?: boolean
    status?: boolean
    sent_at?: boolean
    last_event_received_at?: boolean
    last_event_type?: boolean
    opens?: boolean
    clicks?: boolean
    campaign_id?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    receiver?: boolean | contactsDefaultArgs<ExtArgs>
    campaign?: boolean | activities$campaignArgs<ExtArgs>
  }, ExtArgs["result"]["activities"]>

  export type activitiesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    send_name?: boolean
    subject?: boolean
    status?: boolean
    sent_at?: boolean
    last_event_received_at?: boolean
    last_event_type?: boolean
    opens?: boolean
    clicks?: boolean
    campaign_id?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    receiver?: boolean | contactsDefaultArgs<ExtArgs>
    campaign?: boolean | activities$campaignArgs<ExtArgs>
  }, ExtArgs["result"]["activities"]>

  export type activitiesSelectScalar = {
    id?: boolean
    tenant_id?: boolean
    send_name?: boolean
    subject?: boolean
    status?: boolean
    sent_at?: boolean
    last_event_received_at?: boolean
    last_event_type?: boolean
    opens?: boolean
    clicks?: boolean
    campaign_id?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }

  export type activitiesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenant_id" | "send_name" | "subject" | "status" | "sent_at" | "last_event_received_at" | "last_event_type" | "opens" | "clicks" | "campaign_id" | "contact_id" | "created_at" | "created_by" | "updated_at" | "updated_by", ExtArgs["result"]["activities"]>
  export type activitiesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receiver?: boolean | contactsDefaultArgs<ExtArgs>
    campaign?: boolean | activities$campaignArgs<ExtArgs>
  }
  export type activitiesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receiver?: boolean | contactsDefaultArgs<ExtArgs>
    campaign?: boolean | activities$campaignArgs<ExtArgs>
  }
  export type activitiesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receiver?: boolean | contactsDefaultArgs<ExtArgs>
    campaign?: boolean | activities$campaignArgs<ExtArgs>
  }

  export type $activitiesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "activities"
    objects: {
      receiver: Prisma.$contactsPayload<ExtArgs>
      campaign: Prisma.$campaignsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenant_id: string
      send_name: string
      subject: string
      status: $Enums.activity_status
      sent_at: Date
      last_event_received_at: Date
      last_event_type: $Enums.event_type
      opens: number
      clicks: number
      campaign_id: string | null
      contact_id: string
      created_at: Date
      created_by: string
      updated_at: Date | null
      updated_by: string | null
    }, ExtArgs["result"]["activities"]>
    composites: {}
  }

  type activitiesGetPayload<S extends boolean | null | undefined | activitiesDefaultArgs> = $Result.GetResult<Prisma.$activitiesPayload, S>

  type activitiesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<activitiesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivitiesCountAggregateInputType | true
    }

  export interface activitiesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['activities'], meta: { name: 'activities' } }
    /**
     * Find zero or one Activities that matches the filter.
     * @param {activitiesFindUniqueArgs} args - Arguments to find a Activities
     * @example
     * // Get one Activities
     * const activities = await prisma.activities.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends activitiesFindUniqueArgs>(args: SelectSubset<T, activitiesFindUniqueArgs<ExtArgs>>): Prisma__activitiesClient<$Result.GetResult<Prisma.$activitiesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activities that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {activitiesFindUniqueOrThrowArgs} args - Arguments to find a Activities
     * @example
     * // Get one Activities
     * const activities = await prisma.activities.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends activitiesFindUniqueOrThrowArgs>(args: SelectSubset<T, activitiesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__activitiesClient<$Result.GetResult<Prisma.$activitiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activitiesFindFirstArgs} args - Arguments to find a Activities
     * @example
     * // Get one Activities
     * const activities = await prisma.activities.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends activitiesFindFirstArgs>(args?: SelectSubset<T, activitiesFindFirstArgs<ExtArgs>>): Prisma__activitiesClient<$Result.GetResult<Prisma.$activitiesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activities that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activitiesFindFirstOrThrowArgs} args - Arguments to find a Activities
     * @example
     * // Get one Activities
     * const activities = await prisma.activities.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends activitiesFindFirstOrThrowArgs>(args?: SelectSubset<T, activitiesFindFirstOrThrowArgs<ExtArgs>>): Prisma__activitiesClient<$Result.GetResult<Prisma.$activitiesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activitiesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activities.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activities.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activitiesWithIdOnly = await prisma.activities.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends activitiesFindManyArgs>(args?: SelectSubset<T, activitiesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activitiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activities.
     * @param {activitiesCreateArgs} args - Arguments to create a Activities.
     * @example
     * // Create one Activities
     * const Activities = await prisma.activities.create({
     *   data: {
     *     // ... data to create a Activities
     *   }
     * })
     * 
     */
    create<T extends activitiesCreateArgs>(args: SelectSubset<T, activitiesCreateArgs<ExtArgs>>): Prisma__activitiesClient<$Result.GetResult<Prisma.$activitiesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {activitiesCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activities = await prisma.activities.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends activitiesCreateManyArgs>(args?: SelectSubset<T, activitiesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {activitiesCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activities = await prisma.activities.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activitiesWithIdOnly = await prisma.activities.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends activitiesCreateManyAndReturnArgs>(args?: SelectSubset<T, activitiesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activitiesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activities.
     * @param {activitiesDeleteArgs} args - Arguments to delete one Activities.
     * @example
     * // Delete one Activities
     * const Activities = await prisma.activities.delete({
     *   where: {
     *     // ... filter to delete one Activities
     *   }
     * })
     * 
     */
    delete<T extends activitiesDeleteArgs>(args: SelectSubset<T, activitiesDeleteArgs<ExtArgs>>): Prisma__activitiesClient<$Result.GetResult<Prisma.$activitiesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activities.
     * @param {activitiesUpdateArgs} args - Arguments to update one Activities.
     * @example
     * // Update one Activities
     * const activities = await prisma.activities.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends activitiesUpdateArgs>(args: SelectSubset<T, activitiesUpdateArgs<ExtArgs>>): Prisma__activitiesClient<$Result.GetResult<Prisma.$activitiesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {activitiesDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activities.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends activitiesDeleteManyArgs>(args?: SelectSubset<T, activitiesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activitiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activities = await prisma.activities.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends activitiesUpdateManyArgs>(args: SelectSubset<T, activitiesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {activitiesUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activities = await prisma.activities.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `id`
     * const activitiesWithIdOnly = await prisma.activities.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends activitiesUpdateManyAndReturnArgs>(args: SelectSubset<T, activitiesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activitiesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activities.
     * @param {activitiesUpsertArgs} args - Arguments to update or create a Activities.
     * @example
     * // Update or create a Activities
     * const activities = await prisma.activities.upsert({
     *   create: {
     *     // ... data to create a Activities
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activities we want to update
     *   }
     * })
     */
    upsert<T extends activitiesUpsertArgs>(args: SelectSubset<T, activitiesUpsertArgs<ExtArgs>>): Prisma__activitiesClient<$Result.GetResult<Prisma.$activitiesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activitiesCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activities.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends activitiesCountArgs>(
      args?: Subset<T, activitiesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivitiesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivitiesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivitiesAggregateArgs>(args: Subset<T, ActivitiesAggregateArgs>): Prisma.PrismaPromise<GetActivitiesAggregateType<T>>

    /**
     * Group by Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activitiesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends activitiesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: activitiesGroupByArgs['orderBy'] }
        : { orderBy?: activitiesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, activitiesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivitiesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the activities model
   */
  readonly fields: activitiesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for activities.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__activitiesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    receiver<T extends contactsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, contactsDefaultArgs<ExtArgs>>): Prisma__contactsClient<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    campaign<T extends activities$campaignArgs<ExtArgs> = {}>(args?: Subset<T, activities$campaignArgs<ExtArgs>>): Prisma__campaignsClient<$Result.GetResult<Prisma.$campaignsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the activities model
   */
  interface activitiesFieldRefs {
    readonly id: FieldRef<"activities", 'String'>
    readonly tenant_id: FieldRef<"activities", 'String'>
    readonly send_name: FieldRef<"activities", 'String'>
    readonly subject: FieldRef<"activities", 'String'>
    readonly status: FieldRef<"activities", 'activity_status'>
    readonly sent_at: FieldRef<"activities", 'DateTime'>
    readonly last_event_received_at: FieldRef<"activities", 'DateTime'>
    readonly last_event_type: FieldRef<"activities", 'event_type'>
    readonly opens: FieldRef<"activities", 'Int'>
    readonly clicks: FieldRef<"activities", 'Int'>
    readonly campaign_id: FieldRef<"activities", 'String'>
    readonly contact_id: FieldRef<"activities", 'String'>
    readonly created_at: FieldRef<"activities", 'DateTime'>
    readonly created_by: FieldRef<"activities", 'String'>
    readonly updated_at: FieldRef<"activities", 'DateTime'>
    readonly updated_by: FieldRef<"activities", 'String'>
  }
    

  // Custom InputTypes
  /**
   * activities findUnique
   */
  export type activitiesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesInclude<ExtArgs> | null
    /**
     * Filter, which activities to fetch.
     */
    where: activitiesWhereUniqueInput
  }

  /**
   * activities findUniqueOrThrow
   */
  export type activitiesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesInclude<ExtArgs> | null
    /**
     * Filter, which activities to fetch.
     */
    where: activitiesWhereUniqueInput
  }

  /**
   * activities findFirst
   */
  export type activitiesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesInclude<ExtArgs> | null
    /**
     * Filter, which activities to fetch.
     */
    where?: activitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activities to fetch.
     */
    orderBy?: activitiesOrderByWithRelationInput | activitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for activities.
     */
    cursor?: activitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of activities.
     */
    distinct?: ActivitiesScalarFieldEnum | ActivitiesScalarFieldEnum[]
  }

  /**
   * activities findFirstOrThrow
   */
  export type activitiesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesInclude<ExtArgs> | null
    /**
     * Filter, which activities to fetch.
     */
    where?: activitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activities to fetch.
     */
    orderBy?: activitiesOrderByWithRelationInput | activitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for activities.
     */
    cursor?: activitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of activities.
     */
    distinct?: ActivitiesScalarFieldEnum | ActivitiesScalarFieldEnum[]
  }

  /**
   * activities findMany
   */
  export type activitiesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesInclude<ExtArgs> | null
    /**
     * Filter, which activities to fetch.
     */
    where?: activitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activities to fetch.
     */
    orderBy?: activitiesOrderByWithRelationInput | activitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing activities.
     */
    cursor?: activitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activities.
     */
    skip?: number
    distinct?: ActivitiesScalarFieldEnum | ActivitiesScalarFieldEnum[]
  }

  /**
   * activities create
   */
  export type activitiesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesInclude<ExtArgs> | null
    /**
     * The data needed to create a activities.
     */
    data: XOR<activitiesCreateInput, activitiesUncheckedCreateInput>
  }

  /**
   * activities createMany
   */
  export type activitiesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many activities.
     */
    data: activitiesCreateManyInput | activitiesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * activities createManyAndReturn
   */
  export type activitiesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * The data used to create many activities.
     */
    data: activitiesCreateManyInput | activitiesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * activities update
   */
  export type activitiesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesInclude<ExtArgs> | null
    /**
     * The data needed to update a activities.
     */
    data: XOR<activitiesUpdateInput, activitiesUncheckedUpdateInput>
    /**
     * Choose, which activities to update.
     */
    where: activitiesWhereUniqueInput
  }

  /**
   * activities updateMany
   */
  export type activitiesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update activities.
     */
    data: XOR<activitiesUpdateManyMutationInput, activitiesUncheckedUpdateManyInput>
    /**
     * Filter which activities to update
     */
    where?: activitiesWhereInput
    /**
     * Limit how many activities to update.
     */
    limit?: number
  }

  /**
   * activities updateManyAndReturn
   */
  export type activitiesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * The data used to update activities.
     */
    data: XOR<activitiesUpdateManyMutationInput, activitiesUncheckedUpdateManyInput>
    /**
     * Filter which activities to update
     */
    where?: activitiesWhereInput
    /**
     * Limit how many activities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * activities upsert
   */
  export type activitiesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesInclude<ExtArgs> | null
    /**
     * The filter to search for the activities to update in case it exists.
     */
    where: activitiesWhereUniqueInput
    /**
     * In case the activities found by the `where` argument doesn't exist, create a new activities with this data.
     */
    create: XOR<activitiesCreateInput, activitiesUncheckedCreateInput>
    /**
     * In case the activities was found with the provided `where` argument, update it with this data.
     */
    update: XOR<activitiesUpdateInput, activitiesUncheckedUpdateInput>
  }

  /**
   * activities delete
   */
  export type activitiesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesInclude<ExtArgs> | null
    /**
     * Filter which activities to delete.
     */
    where: activitiesWhereUniqueInput
  }

  /**
   * activities deleteMany
   */
  export type activitiesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which activities to delete
     */
    where?: activitiesWhereInput
    /**
     * Limit how many activities to delete.
     */
    limit?: number
  }

  /**
   * activities.campaign
   */
  export type activities$campaignArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the campaigns
     */
    select?: campaignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the campaigns
     */
    omit?: campaignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: campaignsInclude<ExtArgs> | null
    where?: campaignsWhereInput
  }

  /**
   * activities without action
   */
  export type activitiesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activities
     */
    select?: activitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activities
     */
    omit?: activitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activitiesInclude<ExtArgs> | null
  }


  /**
   * Model bounces
   */

  export type AggregateBounces = {
    _count: BouncesCountAggregateOutputType | null
    _min: BouncesMinAggregateOutputType | null
    _max: BouncesMaxAggregateOutputType | null
  }

  export type BouncesMinAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    bounced_at: Date | null
    reason: string | null
    bounce_type: $Enums.bounce_type | null
    contact_id: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type BouncesMaxAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    bounced_at: Date | null
    reason: string | null
    bounce_type: $Enums.bounce_type | null
    contact_id: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type BouncesCountAggregateOutputType = {
    id: number
    tenant_id: number
    bounced_at: number
    reason: number
    bounce_type: number
    contact_id: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    _all: number
  }


  export type BouncesMinAggregateInputType = {
    id?: true
    tenant_id?: true
    bounced_at?: true
    reason?: true
    bounce_type?: true
    contact_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type BouncesMaxAggregateInputType = {
    id?: true
    tenant_id?: true
    bounced_at?: true
    reason?: true
    bounce_type?: true
    contact_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type BouncesCountAggregateInputType = {
    id?: true
    tenant_id?: true
    bounced_at?: true
    reason?: true
    bounce_type?: true
    contact_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    _all?: true
  }

  export type BouncesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bounces to aggregate.
     */
    where?: bouncesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bounces to fetch.
     */
    orderBy?: bouncesOrderByWithRelationInput | bouncesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bouncesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bounces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bounces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bounces
    **/
    _count?: true | BouncesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BouncesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BouncesMaxAggregateInputType
  }

  export type GetBouncesAggregateType<T extends BouncesAggregateArgs> = {
        [P in keyof T & keyof AggregateBounces]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBounces[P]>
      : GetScalarType<T[P], AggregateBounces[P]>
  }




  export type bouncesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bouncesWhereInput
    orderBy?: bouncesOrderByWithAggregationInput | bouncesOrderByWithAggregationInput[]
    by: BouncesScalarFieldEnum[] | BouncesScalarFieldEnum
    having?: bouncesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BouncesCountAggregateInputType | true
    _min?: BouncesMinAggregateInputType
    _max?: BouncesMaxAggregateInputType
  }

  export type BouncesGroupByOutputType = {
    id: string
    tenant_id: string
    bounced_at: Date
    reason: string
    bounce_type: $Enums.bounce_type
    contact_id: string
    created_at: Date
    created_by: string
    updated_at: Date | null
    updated_by: string | null
    _count: BouncesCountAggregateOutputType | null
    _min: BouncesMinAggregateOutputType | null
    _max: BouncesMaxAggregateOutputType | null
  }

  type GetBouncesGroupByPayload<T extends bouncesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BouncesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BouncesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BouncesGroupByOutputType[P]>
            : GetScalarType<T[P], BouncesGroupByOutputType[P]>
        }
      >
    >


  export type bouncesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    bounced_at?: boolean
    reason?: boolean
    bounce_type?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bounces"]>

  export type bouncesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    bounced_at?: boolean
    reason?: boolean
    bounce_type?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bounces"]>

  export type bouncesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    bounced_at?: boolean
    reason?: boolean
    bounce_type?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bounces"]>

  export type bouncesSelectScalar = {
    id?: boolean
    tenant_id?: boolean
    bounced_at?: boolean
    reason?: boolean
    bounce_type?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }

  export type bouncesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenant_id" | "bounced_at" | "reason" | "bounce_type" | "contact_id" | "created_at" | "created_by" | "updated_at" | "updated_by", ExtArgs["result"]["bounces"]>
  export type bouncesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }
  export type bouncesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }
  export type bouncesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }

  export type $bouncesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bounces"
    objects: {
      contact: Prisma.$contactsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenant_id: string
      bounced_at: Date
      reason: string
      bounce_type: $Enums.bounce_type
      contact_id: string
      created_at: Date
      created_by: string
      updated_at: Date | null
      updated_by: string | null
    }, ExtArgs["result"]["bounces"]>
    composites: {}
  }

  type bouncesGetPayload<S extends boolean | null | undefined | bouncesDefaultArgs> = $Result.GetResult<Prisma.$bouncesPayload, S>

  type bouncesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<bouncesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BouncesCountAggregateInputType | true
    }

  export interface bouncesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bounces'], meta: { name: 'bounces' } }
    /**
     * Find zero or one Bounces that matches the filter.
     * @param {bouncesFindUniqueArgs} args - Arguments to find a Bounces
     * @example
     * // Get one Bounces
     * const bounces = await prisma.bounces.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bouncesFindUniqueArgs>(args: SelectSubset<T, bouncesFindUniqueArgs<ExtArgs>>): Prisma__bouncesClient<$Result.GetResult<Prisma.$bouncesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bounces that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {bouncesFindUniqueOrThrowArgs} args - Arguments to find a Bounces
     * @example
     * // Get one Bounces
     * const bounces = await prisma.bounces.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bouncesFindUniqueOrThrowArgs>(args: SelectSubset<T, bouncesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bouncesClient<$Result.GetResult<Prisma.$bouncesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bounces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bouncesFindFirstArgs} args - Arguments to find a Bounces
     * @example
     * // Get one Bounces
     * const bounces = await prisma.bounces.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bouncesFindFirstArgs>(args?: SelectSubset<T, bouncesFindFirstArgs<ExtArgs>>): Prisma__bouncesClient<$Result.GetResult<Prisma.$bouncesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bounces that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bouncesFindFirstOrThrowArgs} args - Arguments to find a Bounces
     * @example
     * // Get one Bounces
     * const bounces = await prisma.bounces.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bouncesFindFirstOrThrowArgs>(args?: SelectSubset<T, bouncesFindFirstOrThrowArgs<ExtArgs>>): Prisma__bouncesClient<$Result.GetResult<Prisma.$bouncesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bounces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bouncesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bounces
     * const bounces = await prisma.bounces.findMany()
     * 
     * // Get first 10 Bounces
     * const bounces = await prisma.bounces.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bouncesWithIdOnly = await prisma.bounces.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends bouncesFindManyArgs>(args?: SelectSubset<T, bouncesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bouncesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bounces.
     * @param {bouncesCreateArgs} args - Arguments to create a Bounces.
     * @example
     * // Create one Bounces
     * const Bounces = await prisma.bounces.create({
     *   data: {
     *     // ... data to create a Bounces
     *   }
     * })
     * 
     */
    create<T extends bouncesCreateArgs>(args: SelectSubset<T, bouncesCreateArgs<ExtArgs>>): Prisma__bouncesClient<$Result.GetResult<Prisma.$bouncesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bounces.
     * @param {bouncesCreateManyArgs} args - Arguments to create many Bounces.
     * @example
     * // Create many Bounces
     * const bounces = await prisma.bounces.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bouncesCreateManyArgs>(args?: SelectSubset<T, bouncesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bounces and returns the data saved in the database.
     * @param {bouncesCreateManyAndReturnArgs} args - Arguments to create many Bounces.
     * @example
     * // Create many Bounces
     * const bounces = await prisma.bounces.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bounces and only return the `id`
     * const bouncesWithIdOnly = await prisma.bounces.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bouncesCreateManyAndReturnArgs>(args?: SelectSubset<T, bouncesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bouncesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bounces.
     * @param {bouncesDeleteArgs} args - Arguments to delete one Bounces.
     * @example
     * // Delete one Bounces
     * const Bounces = await prisma.bounces.delete({
     *   where: {
     *     // ... filter to delete one Bounces
     *   }
     * })
     * 
     */
    delete<T extends bouncesDeleteArgs>(args: SelectSubset<T, bouncesDeleteArgs<ExtArgs>>): Prisma__bouncesClient<$Result.GetResult<Prisma.$bouncesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bounces.
     * @param {bouncesUpdateArgs} args - Arguments to update one Bounces.
     * @example
     * // Update one Bounces
     * const bounces = await prisma.bounces.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bouncesUpdateArgs>(args: SelectSubset<T, bouncesUpdateArgs<ExtArgs>>): Prisma__bouncesClient<$Result.GetResult<Prisma.$bouncesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bounces.
     * @param {bouncesDeleteManyArgs} args - Arguments to filter Bounces to delete.
     * @example
     * // Delete a few Bounces
     * const { count } = await prisma.bounces.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bouncesDeleteManyArgs>(args?: SelectSubset<T, bouncesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bounces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bouncesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bounces
     * const bounces = await prisma.bounces.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bouncesUpdateManyArgs>(args: SelectSubset<T, bouncesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bounces and returns the data updated in the database.
     * @param {bouncesUpdateManyAndReturnArgs} args - Arguments to update many Bounces.
     * @example
     * // Update many Bounces
     * const bounces = await prisma.bounces.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bounces and only return the `id`
     * const bouncesWithIdOnly = await prisma.bounces.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends bouncesUpdateManyAndReturnArgs>(args: SelectSubset<T, bouncesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bouncesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bounces.
     * @param {bouncesUpsertArgs} args - Arguments to update or create a Bounces.
     * @example
     * // Update or create a Bounces
     * const bounces = await prisma.bounces.upsert({
     *   create: {
     *     // ... data to create a Bounces
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bounces we want to update
     *   }
     * })
     */
    upsert<T extends bouncesUpsertArgs>(args: SelectSubset<T, bouncesUpsertArgs<ExtArgs>>): Prisma__bouncesClient<$Result.GetResult<Prisma.$bouncesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bounces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bouncesCountArgs} args - Arguments to filter Bounces to count.
     * @example
     * // Count the number of Bounces
     * const count = await prisma.bounces.count({
     *   where: {
     *     // ... the filter for the Bounces we want to count
     *   }
     * })
    **/
    count<T extends bouncesCountArgs>(
      args?: Subset<T, bouncesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BouncesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bounces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BouncesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BouncesAggregateArgs>(args: Subset<T, BouncesAggregateArgs>): Prisma.PrismaPromise<GetBouncesAggregateType<T>>

    /**
     * Group by Bounces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bouncesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends bouncesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bouncesGroupByArgs['orderBy'] }
        : { orderBy?: bouncesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bouncesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBouncesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bounces model
   */
  readonly fields: bouncesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bounces.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bouncesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contact<T extends contactsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, contactsDefaultArgs<ExtArgs>>): Prisma__contactsClient<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bounces model
   */
  interface bouncesFieldRefs {
    readonly id: FieldRef<"bounces", 'String'>
    readonly tenant_id: FieldRef<"bounces", 'String'>
    readonly bounced_at: FieldRef<"bounces", 'DateTime'>
    readonly reason: FieldRef<"bounces", 'String'>
    readonly bounce_type: FieldRef<"bounces", 'bounce_type'>
    readonly contact_id: FieldRef<"bounces", 'String'>
    readonly created_at: FieldRef<"bounces", 'DateTime'>
    readonly created_by: FieldRef<"bounces", 'String'>
    readonly updated_at: FieldRef<"bounces", 'DateTime'>
    readonly updated_by: FieldRef<"bounces", 'String'>
  }
    

  // Custom InputTypes
  /**
   * bounces findUnique
   */
  export type bouncesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bounces
     */
    select?: bouncesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bounces
     */
    omit?: bouncesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bouncesInclude<ExtArgs> | null
    /**
     * Filter, which bounces to fetch.
     */
    where: bouncesWhereUniqueInput
  }

  /**
   * bounces findUniqueOrThrow
   */
  export type bouncesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bounces
     */
    select?: bouncesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bounces
     */
    omit?: bouncesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bouncesInclude<ExtArgs> | null
    /**
     * Filter, which bounces to fetch.
     */
    where: bouncesWhereUniqueInput
  }

  /**
   * bounces findFirst
   */
  export type bouncesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bounces
     */
    select?: bouncesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bounces
     */
    omit?: bouncesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bouncesInclude<ExtArgs> | null
    /**
     * Filter, which bounces to fetch.
     */
    where?: bouncesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bounces to fetch.
     */
    orderBy?: bouncesOrderByWithRelationInput | bouncesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bounces.
     */
    cursor?: bouncesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bounces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bounces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bounces.
     */
    distinct?: BouncesScalarFieldEnum | BouncesScalarFieldEnum[]
  }

  /**
   * bounces findFirstOrThrow
   */
  export type bouncesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bounces
     */
    select?: bouncesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bounces
     */
    omit?: bouncesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bouncesInclude<ExtArgs> | null
    /**
     * Filter, which bounces to fetch.
     */
    where?: bouncesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bounces to fetch.
     */
    orderBy?: bouncesOrderByWithRelationInput | bouncesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bounces.
     */
    cursor?: bouncesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bounces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bounces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bounces.
     */
    distinct?: BouncesScalarFieldEnum | BouncesScalarFieldEnum[]
  }

  /**
   * bounces findMany
   */
  export type bouncesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bounces
     */
    select?: bouncesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bounces
     */
    omit?: bouncesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bouncesInclude<ExtArgs> | null
    /**
     * Filter, which bounces to fetch.
     */
    where?: bouncesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bounces to fetch.
     */
    orderBy?: bouncesOrderByWithRelationInput | bouncesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bounces.
     */
    cursor?: bouncesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bounces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bounces.
     */
    skip?: number
    distinct?: BouncesScalarFieldEnum | BouncesScalarFieldEnum[]
  }

  /**
   * bounces create
   */
  export type bouncesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bounces
     */
    select?: bouncesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bounces
     */
    omit?: bouncesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bouncesInclude<ExtArgs> | null
    /**
     * The data needed to create a bounces.
     */
    data: XOR<bouncesCreateInput, bouncesUncheckedCreateInput>
  }

  /**
   * bounces createMany
   */
  export type bouncesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bounces.
     */
    data: bouncesCreateManyInput | bouncesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bounces createManyAndReturn
   */
  export type bouncesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bounces
     */
    select?: bouncesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bounces
     */
    omit?: bouncesOmit<ExtArgs> | null
    /**
     * The data used to create many bounces.
     */
    data: bouncesCreateManyInput | bouncesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bouncesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * bounces update
   */
  export type bouncesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bounces
     */
    select?: bouncesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bounces
     */
    omit?: bouncesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bouncesInclude<ExtArgs> | null
    /**
     * The data needed to update a bounces.
     */
    data: XOR<bouncesUpdateInput, bouncesUncheckedUpdateInput>
    /**
     * Choose, which bounces to update.
     */
    where: bouncesWhereUniqueInput
  }

  /**
   * bounces updateMany
   */
  export type bouncesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bounces.
     */
    data: XOR<bouncesUpdateManyMutationInput, bouncesUncheckedUpdateManyInput>
    /**
     * Filter which bounces to update
     */
    where?: bouncesWhereInput
    /**
     * Limit how many bounces to update.
     */
    limit?: number
  }

  /**
   * bounces updateManyAndReturn
   */
  export type bouncesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bounces
     */
    select?: bouncesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bounces
     */
    omit?: bouncesOmit<ExtArgs> | null
    /**
     * The data used to update bounces.
     */
    data: XOR<bouncesUpdateManyMutationInput, bouncesUncheckedUpdateManyInput>
    /**
     * Filter which bounces to update
     */
    where?: bouncesWhereInput
    /**
     * Limit how many bounces to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bouncesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * bounces upsert
   */
  export type bouncesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bounces
     */
    select?: bouncesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bounces
     */
    omit?: bouncesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bouncesInclude<ExtArgs> | null
    /**
     * The filter to search for the bounces to update in case it exists.
     */
    where: bouncesWhereUniqueInput
    /**
     * In case the bounces found by the `where` argument doesn't exist, create a new bounces with this data.
     */
    create: XOR<bouncesCreateInput, bouncesUncheckedCreateInput>
    /**
     * In case the bounces was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bouncesUpdateInput, bouncesUncheckedUpdateInput>
  }

  /**
   * bounces delete
   */
  export type bouncesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bounces
     */
    select?: bouncesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bounces
     */
    omit?: bouncesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bouncesInclude<ExtArgs> | null
    /**
     * Filter which bounces to delete.
     */
    where: bouncesWhereUniqueInput
  }

  /**
   * bounces deleteMany
   */
  export type bouncesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bounces to delete
     */
    where?: bouncesWhereInput
    /**
     * Limit how many bounces to delete.
     */
    limit?: number
  }

  /**
   * bounces without action
   */
  export type bouncesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bounces
     */
    select?: bouncesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bounces
     */
    omit?: bouncesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bouncesInclude<ExtArgs> | null
  }


  /**
   * Model subscribers
   */

  export type AggregateSubscribers = {
    _count: SubscribersCountAggregateOutputType | null
    _min: SubscribersMinAggregateOutputType | null
    _max: SubscribersMaxAggregateOutputType | null
  }

  export type SubscribersMinAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    status: $Enums.subscriber_status | null
    subscribed_at: Date | null
    contact_id: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type SubscribersMaxAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    status: $Enums.subscriber_status | null
    subscribed_at: Date | null
    contact_id: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type SubscribersCountAggregateOutputType = {
    id: number
    tenant_id: number
    status: number
    subscribed_at: number
    contact_id: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    _all: number
  }


  export type SubscribersMinAggregateInputType = {
    id?: true
    tenant_id?: true
    status?: true
    subscribed_at?: true
    contact_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type SubscribersMaxAggregateInputType = {
    id?: true
    tenant_id?: true
    status?: true
    subscribed_at?: true
    contact_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type SubscribersCountAggregateInputType = {
    id?: true
    tenant_id?: true
    status?: true
    subscribed_at?: true
    contact_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    _all?: true
  }

  export type SubscribersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscribers to aggregate.
     */
    where?: subscribersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscribers to fetch.
     */
    orderBy?: subscribersOrderByWithRelationInput | subscribersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: subscribersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned subscribers
    **/
    _count?: true | SubscribersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscribersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscribersMaxAggregateInputType
  }

  export type GetSubscribersAggregateType<T extends SubscribersAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscribers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscribers[P]>
      : GetScalarType<T[P], AggregateSubscribers[P]>
  }




  export type subscribersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subscribersWhereInput
    orderBy?: subscribersOrderByWithAggregationInput | subscribersOrderByWithAggregationInput[]
    by: SubscribersScalarFieldEnum[] | SubscribersScalarFieldEnum
    having?: subscribersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscribersCountAggregateInputType | true
    _min?: SubscribersMinAggregateInputType
    _max?: SubscribersMaxAggregateInputType
  }

  export type SubscribersGroupByOutputType = {
    id: string
    tenant_id: string
    status: $Enums.subscriber_status
    subscribed_at: Date
    contact_id: string
    created_at: Date
    created_by: string
    updated_at: Date | null
    updated_by: string | null
    _count: SubscribersCountAggregateOutputType | null
    _min: SubscribersMinAggregateOutputType | null
    _max: SubscribersMaxAggregateOutputType | null
  }

  type GetSubscribersGroupByPayload<T extends subscribersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscribersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscribersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscribersGroupByOutputType[P]>
            : GetScalarType<T[P], SubscribersGroupByOutputType[P]>
        }
      >
    >


  export type subscribersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    status?: boolean
    subscribed_at?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscribers"]>

  export type subscribersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    status?: boolean
    subscribed_at?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscribers"]>

  export type subscribersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    status?: boolean
    subscribed_at?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscribers"]>

  export type subscribersSelectScalar = {
    id?: boolean
    tenant_id?: boolean
    status?: boolean
    subscribed_at?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }

  export type subscribersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenant_id" | "status" | "subscribed_at" | "contact_id" | "created_at" | "created_by" | "updated_at" | "updated_by", ExtArgs["result"]["subscribers"]>
  export type subscribersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }
  export type subscribersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }
  export type subscribersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }

  export type $subscribersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "subscribers"
    objects: {
      contact: Prisma.$contactsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenant_id: string
      status: $Enums.subscriber_status
      subscribed_at: Date
      contact_id: string
      created_at: Date
      created_by: string
      updated_at: Date | null
      updated_by: string | null
    }, ExtArgs["result"]["subscribers"]>
    composites: {}
  }

  type subscribersGetPayload<S extends boolean | null | undefined | subscribersDefaultArgs> = $Result.GetResult<Prisma.$subscribersPayload, S>

  type subscribersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<subscribersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscribersCountAggregateInputType | true
    }

  export interface subscribersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['subscribers'], meta: { name: 'subscribers' } }
    /**
     * Find zero or one Subscribers that matches the filter.
     * @param {subscribersFindUniqueArgs} args - Arguments to find a Subscribers
     * @example
     * // Get one Subscribers
     * const subscribers = await prisma.subscribers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends subscribersFindUniqueArgs>(args: SelectSubset<T, subscribersFindUniqueArgs<ExtArgs>>): Prisma__subscribersClient<$Result.GetResult<Prisma.$subscribersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscribers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {subscribersFindUniqueOrThrowArgs} args - Arguments to find a Subscribers
     * @example
     * // Get one Subscribers
     * const subscribers = await prisma.subscribers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends subscribersFindUniqueOrThrowArgs>(args: SelectSubset<T, subscribersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__subscribersClient<$Result.GetResult<Prisma.$subscribersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscribers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscribersFindFirstArgs} args - Arguments to find a Subscribers
     * @example
     * // Get one Subscribers
     * const subscribers = await prisma.subscribers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends subscribersFindFirstArgs>(args?: SelectSubset<T, subscribersFindFirstArgs<ExtArgs>>): Prisma__subscribersClient<$Result.GetResult<Prisma.$subscribersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscribers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscribersFindFirstOrThrowArgs} args - Arguments to find a Subscribers
     * @example
     * // Get one Subscribers
     * const subscribers = await prisma.subscribers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends subscribersFindFirstOrThrowArgs>(args?: SelectSubset<T, subscribersFindFirstOrThrowArgs<ExtArgs>>): Prisma__subscribersClient<$Result.GetResult<Prisma.$subscribersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscribers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscribersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscribers
     * const subscribers = await prisma.subscribers.findMany()
     * 
     * // Get first 10 Subscribers
     * const subscribers = await prisma.subscribers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscribersWithIdOnly = await prisma.subscribers.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends subscribersFindManyArgs>(args?: SelectSubset<T, subscribersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscribersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscribers.
     * @param {subscribersCreateArgs} args - Arguments to create a Subscribers.
     * @example
     * // Create one Subscribers
     * const Subscribers = await prisma.subscribers.create({
     *   data: {
     *     // ... data to create a Subscribers
     *   }
     * })
     * 
     */
    create<T extends subscribersCreateArgs>(args: SelectSubset<T, subscribersCreateArgs<ExtArgs>>): Prisma__subscribersClient<$Result.GetResult<Prisma.$subscribersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscribers.
     * @param {subscribersCreateManyArgs} args - Arguments to create many Subscribers.
     * @example
     * // Create many Subscribers
     * const subscribers = await prisma.subscribers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends subscribersCreateManyArgs>(args?: SelectSubset<T, subscribersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscribers and returns the data saved in the database.
     * @param {subscribersCreateManyAndReturnArgs} args - Arguments to create many Subscribers.
     * @example
     * // Create many Subscribers
     * const subscribers = await prisma.subscribers.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscribers and only return the `id`
     * const subscribersWithIdOnly = await prisma.subscribers.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends subscribersCreateManyAndReturnArgs>(args?: SelectSubset<T, subscribersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscribersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscribers.
     * @param {subscribersDeleteArgs} args - Arguments to delete one Subscribers.
     * @example
     * // Delete one Subscribers
     * const Subscribers = await prisma.subscribers.delete({
     *   where: {
     *     // ... filter to delete one Subscribers
     *   }
     * })
     * 
     */
    delete<T extends subscribersDeleteArgs>(args: SelectSubset<T, subscribersDeleteArgs<ExtArgs>>): Prisma__subscribersClient<$Result.GetResult<Prisma.$subscribersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscribers.
     * @param {subscribersUpdateArgs} args - Arguments to update one Subscribers.
     * @example
     * // Update one Subscribers
     * const subscribers = await prisma.subscribers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends subscribersUpdateArgs>(args: SelectSubset<T, subscribersUpdateArgs<ExtArgs>>): Prisma__subscribersClient<$Result.GetResult<Prisma.$subscribersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscribers.
     * @param {subscribersDeleteManyArgs} args - Arguments to filter Subscribers to delete.
     * @example
     * // Delete a few Subscribers
     * const { count } = await prisma.subscribers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends subscribersDeleteManyArgs>(args?: SelectSubset<T, subscribersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscribersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscribers
     * const subscribers = await prisma.subscribers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends subscribersUpdateManyArgs>(args: SelectSubset<T, subscribersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscribers and returns the data updated in the database.
     * @param {subscribersUpdateManyAndReturnArgs} args - Arguments to update many Subscribers.
     * @example
     * // Update many Subscribers
     * const subscribers = await prisma.subscribers.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscribers and only return the `id`
     * const subscribersWithIdOnly = await prisma.subscribers.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends subscribersUpdateManyAndReturnArgs>(args: SelectSubset<T, subscribersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscribersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscribers.
     * @param {subscribersUpsertArgs} args - Arguments to update or create a Subscribers.
     * @example
     * // Update or create a Subscribers
     * const subscribers = await prisma.subscribers.upsert({
     *   create: {
     *     // ... data to create a Subscribers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscribers we want to update
     *   }
     * })
     */
    upsert<T extends subscribersUpsertArgs>(args: SelectSubset<T, subscribersUpsertArgs<ExtArgs>>): Prisma__subscribersClient<$Result.GetResult<Prisma.$subscribersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscribersCountArgs} args - Arguments to filter Subscribers to count.
     * @example
     * // Count the number of Subscribers
     * const count = await prisma.subscribers.count({
     *   where: {
     *     // ... the filter for the Subscribers we want to count
     *   }
     * })
    **/
    count<T extends subscribersCountArgs>(
      args?: Subset<T, subscribersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscribersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscribersAggregateArgs>(args: Subset<T, SubscribersAggregateArgs>): Prisma.PrismaPromise<GetSubscribersAggregateType<T>>

    /**
     * Group by Subscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscribersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends subscribersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: subscribersGroupByArgs['orderBy'] }
        : { orderBy?: subscribersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, subscribersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscribersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the subscribers model
   */
  readonly fields: subscribersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for subscribers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__subscribersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contact<T extends contactsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, contactsDefaultArgs<ExtArgs>>): Prisma__contactsClient<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the subscribers model
   */
  interface subscribersFieldRefs {
    readonly id: FieldRef<"subscribers", 'String'>
    readonly tenant_id: FieldRef<"subscribers", 'String'>
    readonly status: FieldRef<"subscribers", 'subscriber_status'>
    readonly subscribed_at: FieldRef<"subscribers", 'DateTime'>
    readonly contact_id: FieldRef<"subscribers", 'String'>
    readonly created_at: FieldRef<"subscribers", 'DateTime'>
    readonly created_by: FieldRef<"subscribers", 'String'>
    readonly updated_at: FieldRef<"subscribers", 'DateTime'>
    readonly updated_by: FieldRef<"subscribers", 'String'>
  }
    

  // Custom InputTypes
  /**
   * subscribers findUnique
   */
  export type subscribersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscribers
     */
    select?: subscribersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscribers
     */
    omit?: subscribersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscribersInclude<ExtArgs> | null
    /**
     * Filter, which subscribers to fetch.
     */
    where: subscribersWhereUniqueInput
  }

  /**
   * subscribers findUniqueOrThrow
   */
  export type subscribersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscribers
     */
    select?: subscribersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscribers
     */
    omit?: subscribersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscribersInclude<ExtArgs> | null
    /**
     * Filter, which subscribers to fetch.
     */
    where: subscribersWhereUniqueInput
  }

  /**
   * subscribers findFirst
   */
  export type subscribersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscribers
     */
    select?: subscribersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscribers
     */
    omit?: subscribersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscribersInclude<ExtArgs> | null
    /**
     * Filter, which subscribers to fetch.
     */
    where?: subscribersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscribers to fetch.
     */
    orderBy?: subscribersOrderByWithRelationInput | subscribersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscribers.
     */
    cursor?: subscribersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscribers.
     */
    distinct?: SubscribersScalarFieldEnum | SubscribersScalarFieldEnum[]
  }

  /**
   * subscribers findFirstOrThrow
   */
  export type subscribersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscribers
     */
    select?: subscribersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscribers
     */
    omit?: subscribersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscribersInclude<ExtArgs> | null
    /**
     * Filter, which subscribers to fetch.
     */
    where?: subscribersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscribers to fetch.
     */
    orderBy?: subscribersOrderByWithRelationInput | subscribersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscribers.
     */
    cursor?: subscribersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscribers.
     */
    distinct?: SubscribersScalarFieldEnum | SubscribersScalarFieldEnum[]
  }

  /**
   * subscribers findMany
   */
  export type subscribersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscribers
     */
    select?: subscribersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscribers
     */
    omit?: subscribersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscribersInclude<ExtArgs> | null
    /**
     * Filter, which subscribers to fetch.
     */
    where?: subscribersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscribers to fetch.
     */
    orderBy?: subscribersOrderByWithRelationInput | subscribersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing subscribers.
     */
    cursor?: subscribersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscribers.
     */
    skip?: number
    distinct?: SubscribersScalarFieldEnum | SubscribersScalarFieldEnum[]
  }

  /**
   * subscribers create
   */
  export type subscribersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscribers
     */
    select?: subscribersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscribers
     */
    omit?: subscribersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscribersInclude<ExtArgs> | null
    /**
     * The data needed to create a subscribers.
     */
    data: XOR<subscribersCreateInput, subscribersUncheckedCreateInput>
  }

  /**
   * subscribers createMany
   */
  export type subscribersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many subscribers.
     */
    data: subscribersCreateManyInput | subscribersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * subscribers createManyAndReturn
   */
  export type subscribersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscribers
     */
    select?: subscribersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscribers
     */
    omit?: subscribersOmit<ExtArgs> | null
    /**
     * The data used to create many subscribers.
     */
    data: subscribersCreateManyInput | subscribersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscribersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * subscribers update
   */
  export type subscribersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscribers
     */
    select?: subscribersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscribers
     */
    omit?: subscribersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscribersInclude<ExtArgs> | null
    /**
     * The data needed to update a subscribers.
     */
    data: XOR<subscribersUpdateInput, subscribersUncheckedUpdateInput>
    /**
     * Choose, which subscribers to update.
     */
    where: subscribersWhereUniqueInput
  }

  /**
   * subscribers updateMany
   */
  export type subscribersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update subscribers.
     */
    data: XOR<subscribersUpdateManyMutationInput, subscribersUncheckedUpdateManyInput>
    /**
     * Filter which subscribers to update
     */
    where?: subscribersWhereInput
    /**
     * Limit how many subscribers to update.
     */
    limit?: number
  }

  /**
   * subscribers updateManyAndReturn
   */
  export type subscribersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscribers
     */
    select?: subscribersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscribers
     */
    omit?: subscribersOmit<ExtArgs> | null
    /**
     * The data used to update subscribers.
     */
    data: XOR<subscribersUpdateManyMutationInput, subscribersUncheckedUpdateManyInput>
    /**
     * Filter which subscribers to update
     */
    where?: subscribersWhereInput
    /**
     * Limit how many subscribers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscribersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * subscribers upsert
   */
  export type subscribersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscribers
     */
    select?: subscribersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscribers
     */
    omit?: subscribersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscribersInclude<ExtArgs> | null
    /**
     * The filter to search for the subscribers to update in case it exists.
     */
    where: subscribersWhereUniqueInput
    /**
     * In case the subscribers found by the `where` argument doesn't exist, create a new subscribers with this data.
     */
    create: XOR<subscribersCreateInput, subscribersUncheckedCreateInput>
    /**
     * In case the subscribers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<subscribersUpdateInput, subscribersUncheckedUpdateInput>
  }

  /**
   * subscribers delete
   */
  export type subscribersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscribers
     */
    select?: subscribersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscribers
     */
    omit?: subscribersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscribersInclude<ExtArgs> | null
    /**
     * Filter which subscribers to delete.
     */
    where: subscribersWhereUniqueInput
  }

  /**
   * subscribers deleteMany
   */
  export type subscribersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscribers to delete
     */
    where?: subscribersWhereInput
    /**
     * Limit how many subscribers to delete.
     */
    limit?: number
  }

  /**
   * subscribers without action
   */
  export type subscribersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscribers
     */
    select?: subscribersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscribers
     */
    omit?: subscribersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscribersInclude<ExtArgs> | null
  }


  /**
   * Model subscriber_list
   */

  export type AggregateSubscriber_list = {
    _count: Subscriber_listCountAggregateOutputType | null
    _min: Subscriber_listMinAggregateOutputType | null
    _max: Subscriber_listMaxAggregateOutputType | null
  }

  export type Subscriber_listMinAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    name: string | null
    description: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type Subscriber_listMaxAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    name: string | null
    description: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type Subscriber_listCountAggregateOutputType = {
    id: number
    tenant_id: number
    name: number
    description: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    _all: number
  }


  export type Subscriber_listMinAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    description?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type Subscriber_listMaxAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    description?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type Subscriber_listCountAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    description?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    _all?: true
  }

  export type Subscriber_listAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscriber_list to aggregate.
     */
    where?: subscriber_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriber_lists to fetch.
     */
    orderBy?: subscriber_listOrderByWithRelationInput | subscriber_listOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: subscriber_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriber_lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriber_lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned subscriber_lists
    **/
    _count?: true | Subscriber_listCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Subscriber_listMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Subscriber_listMaxAggregateInputType
  }

  export type GetSubscriber_listAggregateType<T extends Subscriber_listAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriber_list]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriber_list[P]>
      : GetScalarType<T[P], AggregateSubscriber_list[P]>
  }




  export type subscriber_listGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subscriber_listWhereInput
    orderBy?: subscriber_listOrderByWithAggregationInput | subscriber_listOrderByWithAggregationInput[]
    by: Subscriber_listScalarFieldEnum[] | Subscriber_listScalarFieldEnum
    having?: subscriber_listScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Subscriber_listCountAggregateInputType | true
    _min?: Subscriber_listMinAggregateInputType
    _max?: Subscriber_listMaxAggregateInputType
  }

  export type Subscriber_listGroupByOutputType = {
    id: string
    tenant_id: string
    name: string
    description: string | null
    created_at: Date
    created_by: string
    updated_at: Date | null
    updated_by: string | null
    _count: Subscriber_listCountAggregateOutputType | null
    _min: Subscriber_listMinAggregateOutputType | null
    _max: Subscriber_listMaxAggregateOutputType | null
  }

  type GetSubscriber_listGroupByPayload<T extends subscriber_listGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Subscriber_listGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Subscriber_listGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Subscriber_listGroupByOutputType[P]>
            : GetScalarType<T[P], Subscriber_listGroupByOutputType[P]>
        }
      >
    >


  export type subscriber_listSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    SubscriberListContacts?: boolean | subscriber_list$SubscriberListContactsArgs<ExtArgs>
    _count?: boolean | Subscriber_listCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriber_list"]>

  export type subscriber_listSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["subscriber_list"]>

  export type subscriber_listSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["subscriber_list"]>

  export type subscriber_listSelectScalar = {
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }

  export type subscriber_listOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenant_id" | "name" | "description" | "created_at" | "created_by" | "updated_at" | "updated_by", ExtArgs["result"]["subscriber_list"]>
  export type subscriber_listInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SubscriberListContacts?: boolean | subscriber_list$SubscriberListContactsArgs<ExtArgs>
    _count?: boolean | Subscriber_listCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type subscriber_listIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type subscriber_listIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $subscriber_listPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "subscriber_list"
    objects: {
      SubscriberListContacts: Prisma.$subscriber_list_contactsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenant_id: string
      name: string
      description: string | null
      created_at: Date
      created_by: string
      updated_at: Date | null
      updated_by: string | null
    }, ExtArgs["result"]["subscriber_list"]>
    composites: {}
  }

  type subscriber_listGetPayload<S extends boolean | null | undefined | subscriber_listDefaultArgs> = $Result.GetResult<Prisma.$subscriber_listPayload, S>

  type subscriber_listCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<subscriber_listFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Subscriber_listCountAggregateInputType | true
    }

  export interface subscriber_listDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['subscriber_list'], meta: { name: 'subscriber_list' } }
    /**
     * Find zero or one Subscriber_list that matches the filter.
     * @param {subscriber_listFindUniqueArgs} args - Arguments to find a Subscriber_list
     * @example
     * // Get one Subscriber_list
     * const subscriber_list = await prisma.subscriber_list.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends subscriber_listFindUniqueArgs>(args: SelectSubset<T, subscriber_listFindUniqueArgs<ExtArgs>>): Prisma__subscriber_listClient<$Result.GetResult<Prisma.$subscriber_listPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscriber_list that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {subscriber_listFindUniqueOrThrowArgs} args - Arguments to find a Subscriber_list
     * @example
     * // Get one Subscriber_list
     * const subscriber_list = await prisma.subscriber_list.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends subscriber_listFindUniqueOrThrowArgs>(args: SelectSubset<T, subscriber_listFindUniqueOrThrowArgs<ExtArgs>>): Prisma__subscriber_listClient<$Result.GetResult<Prisma.$subscriber_listPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriber_list that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriber_listFindFirstArgs} args - Arguments to find a Subscriber_list
     * @example
     * // Get one Subscriber_list
     * const subscriber_list = await prisma.subscriber_list.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends subscriber_listFindFirstArgs>(args?: SelectSubset<T, subscriber_listFindFirstArgs<ExtArgs>>): Prisma__subscriber_listClient<$Result.GetResult<Prisma.$subscriber_listPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriber_list that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriber_listFindFirstOrThrowArgs} args - Arguments to find a Subscriber_list
     * @example
     * // Get one Subscriber_list
     * const subscriber_list = await prisma.subscriber_list.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends subscriber_listFindFirstOrThrowArgs>(args?: SelectSubset<T, subscriber_listFindFirstOrThrowArgs<ExtArgs>>): Prisma__subscriber_listClient<$Result.GetResult<Prisma.$subscriber_listPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriber_lists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriber_listFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriber_lists
     * const subscriber_lists = await prisma.subscriber_list.findMany()
     * 
     * // Get first 10 Subscriber_lists
     * const subscriber_lists = await prisma.subscriber_list.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriber_listWithIdOnly = await prisma.subscriber_list.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends subscriber_listFindManyArgs>(args?: SelectSubset<T, subscriber_listFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriber_listPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscriber_list.
     * @param {subscriber_listCreateArgs} args - Arguments to create a Subscriber_list.
     * @example
     * // Create one Subscriber_list
     * const Subscriber_list = await prisma.subscriber_list.create({
     *   data: {
     *     // ... data to create a Subscriber_list
     *   }
     * })
     * 
     */
    create<T extends subscriber_listCreateArgs>(args: SelectSubset<T, subscriber_listCreateArgs<ExtArgs>>): Prisma__subscriber_listClient<$Result.GetResult<Prisma.$subscriber_listPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriber_lists.
     * @param {subscriber_listCreateManyArgs} args - Arguments to create many Subscriber_lists.
     * @example
     * // Create many Subscriber_lists
     * const subscriber_list = await prisma.subscriber_list.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends subscriber_listCreateManyArgs>(args?: SelectSubset<T, subscriber_listCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriber_lists and returns the data saved in the database.
     * @param {subscriber_listCreateManyAndReturnArgs} args - Arguments to create many Subscriber_lists.
     * @example
     * // Create many Subscriber_lists
     * const subscriber_list = await prisma.subscriber_list.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriber_lists and only return the `id`
     * const subscriber_listWithIdOnly = await prisma.subscriber_list.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends subscriber_listCreateManyAndReturnArgs>(args?: SelectSubset<T, subscriber_listCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriber_listPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscriber_list.
     * @param {subscriber_listDeleteArgs} args - Arguments to delete one Subscriber_list.
     * @example
     * // Delete one Subscriber_list
     * const Subscriber_list = await prisma.subscriber_list.delete({
     *   where: {
     *     // ... filter to delete one Subscriber_list
     *   }
     * })
     * 
     */
    delete<T extends subscriber_listDeleteArgs>(args: SelectSubset<T, subscriber_listDeleteArgs<ExtArgs>>): Prisma__subscriber_listClient<$Result.GetResult<Prisma.$subscriber_listPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscriber_list.
     * @param {subscriber_listUpdateArgs} args - Arguments to update one Subscriber_list.
     * @example
     * // Update one Subscriber_list
     * const subscriber_list = await prisma.subscriber_list.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends subscriber_listUpdateArgs>(args: SelectSubset<T, subscriber_listUpdateArgs<ExtArgs>>): Prisma__subscriber_listClient<$Result.GetResult<Prisma.$subscriber_listPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriber_lists.
     * @param {subscriber_listDeleteManyArgs} args - Arguments to filter Subscriber_lists to delete.
     * @example
     * // Delete a few Subscriber_lists
     * const { count } = await prisma.subscriber_list.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends subscriber_listDeleteManyArgs>(args?: SelectSubset<T, subscriber_listDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriber_lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriber_listUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriber_lists
     * const subscriber_list = await prisma.subscriber_list.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends subscriber_listUpdateManyArgs>(args: SelectSubset<T, subscriber_listUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriber_lists and returns the data updated in the database.
     * @param {subscriber_listUpdateManyAndReturnArgs} args - Arguments to update many Subscriber_lists.
     * @example
     * // Update many Subscriber_lists
     * const subscriber_list = await prisma.subscriber_list.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriber_lists and only return the `id`
     * const subscriber_listWithIdOnly = await prisma.subscriber_list.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends subscriber_listUpdateManyAndReturnArgs>(args: SelectSubset<T, subscriber_listUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriber_listPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscriber_list.
     * @param {subscriber_listUpsertArgs} args - Arguments to update or create a Subscriber_list.
     * @example
     * // Update or create a Subscriber_list
     * const subscriber_list = await prisma.subscriber_list.upsert({
     *   create: {
     *     // ... data to create a Subscriber_list
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscriber_list we want to update
     *   }
     * })
     */
    upsert<T extends subscriber_listUpsertArgs>(args: SelectSubset<T, subscriber_listUpsertArgs<ExtArgs>>): Prisma__subscriber_listClient<$Result.GetResult<Prisma.$subscriber_listPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriber_lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriber_listCountArgs} args - Arguments to filter Subscriber_lists to count.
     * @example
     * // Count the number of Subscriber_lists
     * const count = await prisma.subscriber_list.count({
     *   where: {
     *     // ... the filter for the Subscriber_lists we want to count
     *   }
     * })
    **/
    count<T extends subscriber_listCountArgs>(
      args?: Subset<T, subscriber_listCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Subscriber_listCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscriber_list.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Subscriber_listAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Subscriber_listAggregateArgs>(args: Subset<T, Subscriber_listAggregateArgs>): Prisma.PrismaPromise<GetSubscriber_listAggregateType<T>>

    /**
     * Group by Subscriber_list.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriber_listGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends subscriber_listGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: subscriber_listGroupByArgs['orderBy'] }
        : { orderBy?: subscriber_listGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, subscriber_listGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriber_listGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the subscriber_list model
   */
  readonly fields: subscriber_listFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for subscriber_list.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__subscriber_listClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    SubscriberListContacts<T extends subscriber_list$SubscriberListContactsArgs<ExtArgs> = {}>(args?: Subset<T, subscriber_list$SubscriberListContactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriber_list_contactsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the subscriber_list model
   */
  interface subscriber_listFieldRefs {
    readonly id: FieldRef<"subscriber_list", 'String'>
    readonly tenant_id: FieldRef<"subscriber_list", 'String'>
    readonly name: FieldRef<"subscriber_list", 'String'>
    readonly description: FieldRef<"subscriber_list", 'String'>
    readonly created_at: FieldRef<"subscriber_list", 'DateTime'>
    readonly created_by: FieldRef<"subscriber_list", 'String'>
    readonly updated_at: FieldRef<"subscriber_list", 'DateTime'>
    readonly updated_by: FieldRef<"subscriber_list", 'String'>
  }
    

  // Custom InputTypes
  /**
   * subscriber_list findUnique
   */
  export type subscriber_listFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list
     */
    select?: subscriber_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list
     */
    omit?: subscriber_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_listInclude<ExtArgs> | null
    /**
     * Filter, which subscriber_list to fetch.
     */
    where: subscriber_listWhereUniqueInput
  }

  /**
   * subscriber_list findUniqueOrThrow
   */
  export type subscriber_listFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list
     */
    select?: subscriber_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list
     */
    omit?: subscriber_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_listInclude<ExtArgs> | null
    /**
     * Filter, which subscriber_list to fetch.
     */
    where: subscriber_listWhereUniqueInput
  }

  /**
   * subscriber_list findFirst
   */
  export type subscriber_listFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list
     */
    select?: subscriber_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list
     */
    omit?: subscriber_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_listInclude<ExtArgs> | null
    /**
     * Filter, which subscriber_list to fetch.
     */
    where?: subscriber_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriber_lists to fetch.
     */
    orderBy?: subscriber_listOrderByWithRelationInput | subscriber_listOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscriber_lists.
     */
    cursor?: subscriber_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriber_lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriber_lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscriber_lists.
     */
    distinct?: Subscriber_listScalarFieldEnum | Subscriber_listScalarFieldEnum[]
  }

  /**
   * subscriber_list findFirstOrThrow
   */
  export type subscriber_listFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list
     */
    select?: subscriber_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list
     */
    omit?: subscriber_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_listInclude<ExtArgs> | null
    /**
     * Filter, which subscriber_list to fetch.
     */
    where?: subscriber_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriber_lists to fetch.
     */
    orderBy?: subscriber_listOrderByWithRelationInput | subscriber_listOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscriber_lists.
     */
    cursor?: subscriber_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriber_lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriber_lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscriber_lists.
     */
    distinct?: Subscriber_listScalarFieldEnum | Subscriber_listScalarFieldEnum[]
  }

  /**
   * subscriber_list findMany
   */
  export type subscriber_listFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list
     */
    select?: subscriber_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list
     */
    omit?: subscriber_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_listInclude<ExtArgs> | null
    /**
     * Filter, which subscriber_lists to fetch.
     */
    where?: subscriber_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriber_lists to fetch.
     */
    orderBy?: subscriber_listOrderByWithRelationInput | subscriber_listOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing subscriber_lists.
     */
    cursor?: subscriber_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriber_lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriber_lists.
     */
    skip?: number
    distinct?: Subscriber_listScalarFieldEnum | Subscriber_listScalarFieldEnum[]
  }

  /**
   * subscriber_list create
   */
  export type subscriber_listCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list
     */
    select?: subscriber_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list
     */
    omit?: subscriber_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_listInclude<ExtArgs> | null
    /**
     * The data needed to create a subscriber_list.
     */
    data: XOR<subscriber_listCreateInput, subscriber_listUncheckedCreateInput>
  }

  /**
   * subscriber_list createMany
   */
  export type subscriber_listCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many subscriber_lists.
     */
    data: subscriber_listCreateManyInput | subscriber_listCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * subscriber_list createManyAndReturn
   */
  export type subscriber_listCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list
     */
    select?: subscriber_listSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list
     */
    omit?: subscriber_listOmit<ExtArgs> | null
    /**
     * The data used to create many subscriber_lists.
     */
    data: subscriber_listCreateManyInput | subscriber_listCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * subscriber_list update
   */
  export type subscriber_listUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list
     */
    select?: subscriber_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list
     */
    omit?: subscriber_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_listInclude<ExtArgs> | null
    /**
     * The data needed to update a subscriber_list.
     */
    data: XOR<subscriber_listUpdateInput, subscriber_listUncheckedUpdateInput>
    /**
     * Choose, which subscriber_list to update.
     */
    where: subscriber_listWhereUniqueInput
  }

  /**
   * subscriber_list updateMany
   */
  export type subscriber_listUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update subscriber_lists.
     */
    data: XOR<subscriber_listUpdateManyMutationInput, subscriber_listUncheckedUpdateManyInput>
    /**
     * Filter which subscriber_lists to update
     */
    where?: subscriber_listWhereInput
    /**
     * Limit how many subscriber_lists to update.
     */
    limit?: number
  }

  /**
   * subscriber_list updateManyAndReturn
   */
  export type subscriber_listUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list
     */
    select?: subscriber_listSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list
     */
    omit?: subscriber_listOmit<ExtArgs> | null
    /**
     * The data used to update subscriber_lists.
     */
    data: XOR<subscriber_listUpdateManyMutationInput, subscriber_listUncheckedUpdateManyInput>
    /**
     * Filter which subscriber_lists to update
     */
    where?: subscriber_listWhereInput
    /**
     * Limit how many subscriber_lists to update.
     */
    limit?: number
  }

  /**
   * subscriber_list upsert
   */
  export type subscriber_listUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list
     */
    select?: subscriber_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list
     */
    omit?: subscriber_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_listInclude<ExtArgs> | null
    /**
     * The filter to search for the subscriber_list to update in case it exists.
     */
    where: subscriber_listWhereUniqueInput
    /**
     * In case the subscriber_list found by the `where` argument doesn't exist, create a new subscriber_list with this data.
     */
    create: XOR<subscriber_listCreateInput, subscriber_listUncheckedCreateInput>
    /**
     * In case the subscriber_list was found with the provided `where` argument, update it with this data.
     */
    update: XOR<subscriber_listUpdateInput, subscriber_listUncheckedUpdateInput>
  }

  /**
   * subscriber_list delete
   */
  export type subscriber_listDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list
     */
    select?: subscriber_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list
     */
    omit?: subscriber_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_listInclude<ExtArgs> | null
    /**
     * Filter which subscriber_list to delete.
     */
    where: subscriber_listWhereUniqueInput
  }

  /**
   * subscriber_list deleteMany
   */
  export type subscriber_listDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscriber_lists to delete
     */
    where?: subscriber_listWhereInput
    /**
     * Limit how many subscriber_lists to delete.
     */
    limit?: number
  }

  /**
   * subscriber_list.SubscriberListContacts
   */
  export type subscriber_list$SubscriberListContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsInclude<ExtArgs> | null
    where?: subscriber_list_contactsWhereInput
    orderBy?: subscriber_list_contactsOrderByWithRelationInput | subscriber_list_contactsOrderByWithRelationInput[]
    cursor?: subscriber_list_contactsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Subscriber_list_contactsScalarFieldEnum | Subscriber_list_contactsScalarFieldEnum[]
  }

  /**
   * subscriber_list without action
   */
  export type subscriber_listDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list
     */
    select?: subscriber_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list
     */
    omit?: subscriber_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_listInclude<ExtArgs> | null
  }


  /**
   * Model subscriber_list_contacts
   */

  export type AggregateSubscriber_list_contacts = {
    _count: Subscriber_list_contactsCountAggregateOutputType | null
    _min: Subscriber_list_contactsMinAggregateOutputType | null
    _max: Subscriber_list_contactsMaxAggregateOutputType | null
  }

  export type Subscriber_list_contactsMinAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    subscriber_list_id: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type Subscriber_list_contactsMaxAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    subscriber_list_id: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type Subscriber_list_contactsCountAggregateOutputType = {
    id: number
    tenant_id: number
    subscriber_list_id: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    _all: number
  }


  export type Subscriber_list_contactsMinAggregateInputType = {
    id?: true
    tenant_id?: true
    subscriber_list_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type Subscriber_list_contactsMaxAggregateInputType = {
    id?: true
    tenant_id?: true
    subscriber_list_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type Subscriber_list_contactsCountAggregateInputType = {
    id?: true
    tenant_id?: true
    subscriber_list_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    _all?: true
  }

  export type Subscriber_list_contactsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscriber_list_contacts to aggregate.
     */
    where?: subscriber_list_contactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriber_list_contacts to fetch.
     */
    orderBy?: subscriber_list_contactsOrderByWithRelationInput | subscriber_list_contactsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: subscriber_list_contactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriber_list_contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriber_list_contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned subscriber_list_contacts
    **/
    _count?: true | Subscriber_list_contactsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Subscriber_list_contactsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Subscriber_list_contactsMaxAggregateInputType
  }

  export type GetSubscriber_list_contactsAggregateType<T extends Subscriber_list_contactsAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriber_list_contacts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriber_list_contacts[P]>
      : GetScalarType<T[P], AggregateSubscriber_list_contacts[P]>
  }




  export type subscriber_list_contactsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subscriber_list_contactsWhereInput
    orderBy?: subscriber_list_contactsOrderByWithAggregationInput | subscriber_list_contactsOrderByWithAggregationInput[]
    by: Subscriber_list_contactsScalarFieldEnum[] | Subscriber_list_contactsScalarFieldEnum
    having?: subscriber_list_contactsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Subscriber_list_contactsCountAggregateInputType | true
    _min?: Subscriber_list_contactsMinAggregateInputType
    _max?: Subscriber_list_contactsMaxAggregateInputType
  }

  export type Subscriber_list_contactsGroupByOutputType = {
    id: string
    tenant_id: string
    subscriber_list_id: string
    created_at: Date
    created_by: string
    updated_at: Date | null
    updated_by: string | null
    _count: Subscriber_list_contactsCountAggregateOutputType | null
    _min: Subscriber_list_contactsMinAggregateOutputType | null
    _max: Subscriber_list_contactsMaxAggregateOutputType | null
  }

  type GetSubscriber_list_contactsGroupByPayload<T extends subscriber_list_contactsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Subscriber_list_contactsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Subscriber_list_contactsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Subscriber_list_contactsGroupByOutputType[P]>
            : GetScalarType<T[P], Subscriber_list_contactsGroupByOutputType[P]>
        }
      >
    >


  export type subscriber_list_contactsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    subscriber_list_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    subscriberList?: boolean | subscriber_listDefaultArgs<ExtArgs>
    contacts?: boolean | subscriber_list_contacts$contactsArgs<ExtArgs>
    _count?: boolean | Subscriber_list_contactsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriber_list_contacts"]>

  export type subscriber_list_contactsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    subscriber_list_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    subscriberList?: boolean | subscriber_listDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriber_list_contacts"]>

  export type subscriber_list_contactsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    subscriber_list_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    subscriberList?: boolean | subscriber_listDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriber_list_contacts"]>

  export type subscriber_list_contactsSelectScalar = {
    id?: boolean
    tenant_id?: boolean
    subscriber_list_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }

  export type subscriber_list_contactsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenant_id" | "subscriber_list_id" | "created_at" | "created_by" | "updated_at" | "updated_by", ExtArgs["result"]["subscriber_list_contacts"]>
  export type subscriber_list_contactsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriberList?: boolean | subscriber_listDefaultArgs<ExtArgs>
    contacts?: boolean | subscriber_list_contacts$contactsArgs<ExtArgs>
    _count?: boolean | Subscriber_list_contactsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type subscriber_list_contactsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriberList?: boolean | subscriber_listDefaultArgs<ExtArgs>
  }
  export type subscriber_list_contactsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriberList?: boolean | subscriber_listDefaultArgs<ExtArgs>
  }

  export type $subscriber_list_contactsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "subscriber_list_contacts"
    objects: {
      subscriberList: Prisma.$subscriber_listPayload<ExtArgs>
      contacts: Prisma.$contactsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenant_id: string
      subscriber_list_id: string
      created_at: Date
      created_by: string
      updated_at: Date | null
      updated_by: string | null
    }, ExtArgs["result"]["subscriber_list_contacts"]>
    composites: {}
  }

  type subscriber_list_contactsGetPayload<S extends boolean | null | undefined | subscriber_list_contactsDefaultArgs> = $Result.GetResult<Prisma.$subscriber_list_contactsPayload, S>

  type subscriber_list_contactsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<subscriber_list_contactsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Subscriber_list_contactsCountAggregateInputType | true
    }

  export interface subscriber_list_contactsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['subscriber_list_contacts'], meta: { name: 'subscriber_list_contacts' } }
    /**
     * Find zero or one Subscriber_list_contacts that matches the filter.
     * @param {subscriber_list_contactsFindUniqueArgs} args - Arguments to find a Subscriber_list_contacts
     * @example
     * // Get one Subscriber_list_contacts
     * const subscriber_list_contacts = await prisma.subscriber_list_contacts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends subscriber_list_contactsFindUniqueArgs>(args: SelectSubset<T, subscriber_list_contactsFindUniqueArgs<ExtArgs>>): Prisma__subscriber_list_contactsClient<$Result.GetResult<Prisma.$subscriber_list_contactsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscriber_list_contacts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {subscriber_list_contactsFindUniqueOrThrowArgs} args - Arguments to find a Subscriber_list_contacts
     * @example
     * // Get one Subscriber_list_contacts
     * const subscriber_list_contacts = await prisma.subscriber_list_contacts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends subscriber_list_contactsFindUniqueOrThrowArgs>(args: SelectSubset<T, subscriber_list_contactsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__subscriber_list_contactsClient<$Result.GetResult<Prisma.$subscriber_list_contactsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriber_list_contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriber_list_contactsFindFirstArgs} args - Arguments to find a Subscriber_list_contacts
     * @example
     * // Get one Subscriber_list_contacts
     * const subscriber_list_contacts = await prisma.subscriber_list_contacts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends subscriber_list_contactsFindFirstArgs>(args?: SelectSubset<T, subscriber_list_contactsFindFirstArgs<ExtArgs>>): Prisma__subscriber_list_contactsClient<$Result.GetResult<Prisma.$subscriber_list_contactsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriber_list_contacts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriber_list_contactsFindFirstOrThrowArgs} args - Arguments to find a Subscriber_list_contacts
     * @example
     * // Get one Subscriber_list_contacts
     * const subscriber_list_contacts = await prisma.subscriber_list_contacts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends subscriber_list_contactsFindFirstOrThrowArgs>(args?: SelectSubset<T, subscriber_list_contactsFindFirstOrThrowArgs<ExtArgs>>): Prisma__subscriber_list_contactsClient<$Result.GetResult<Prisma.$subscriber_list_contactsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriber_list_contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriber_list_contactsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriber_list_contacts
     * const subscriber_list_contacts = await prisma.subscriber_list_contacts.findMany()
     * 
     * // Get first 10 Subscriber_list_contacts
     * const subscriber_list_contacts = await prisma.subscriber_list_contacts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriber_list_contactsWithIdOnly = await prisma.subscriber_list_contacts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends subscriber_list_contactsFindManyArgs>(args?: SelectSubset<T, subscriber_list_contactsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriber_list_contactsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscriber_list_contacts.
     * @param {subscriber_list_contactsCreateArgs} args - Arguments to create a Subscriber_list_contacts.
     * @example
     * // Create one Subscriber_list_contacts
     * const Subscriber_list_contacts = await prisma.subscriber_list_contacts.create({
     *   data: {
     *     // ... data to create a Subscriber_list_contacts
     *   }
     * })
     * 
     */
    create<T extends subscriber_list_contactsCreateArgs>(args: SelectSubset<T, subscriber_list_contactsCreateArgs<ExtArgs>>): Prisma__subscriber_list_contactsClient<$Result.GetResult<Prisma.$subscriber_list_contactsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriber_list_contacts.
     * @param {subscriber_list_contactsCreateManyArgs} args - Arguments to create many Subscriber_list_contacts.
     * @example
     * // Create many Subscriber_list_contacts
     * const subscriber_list_contacts = await prisma.subscriber_list_contacts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends subscriber_list_contactsCreateManyArgs>(args?: SelectSubset<T, subscriber_list_contactsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriber_list_contacts and returns the data saved in the database.
     * @param {subscriber_list_contactsCreateManyAndReturnArgs} args - Arguments to create many Subscriber_list_contacts.
     * @example
     * // Create many Subscriber_list_contacts
     * const subscriber_list_contacts = await prisma.subscriber_list_contacts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriber_list_contacts and only return the `id`
     * const subscriber_list_contactsWithIdOnly = await prisma.subscriber_list_contacts.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends subscriber_list_contactsCreateManyAndReturnArgs>(args?: SelectSubset<T, subscriber_list_contactsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriber_list_contactsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscriber_list_contacts.
     * @param {subscriber_list_contactsDeleteArgs} args - Arguments to delete one Subscriber_list_contacts.
     * @example
     * // Delete one Subscriber_list_contacts
     * const Subscriber_list_contacts = await prisma.subscriber_list_contacts.delete({
     *   where: {
     *     // ... filter to delete one Subscriber_list_contacts
     *   }
     * })
     * 
     */
    delete<T extends subscriber_list_contactsDeleteArgs>(args: SelectSubset<T, subscriber_list_contactsDeleteArgs<ExtArgs>>): Prisma__subscriber_list_contactsClient<$Result.GetResult<Prisma.$subscriber_list_contactsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscriber_list_contacts.
     * @param {subscriber_list_contactsUpdateArgs} args - Arguments to update one Subscriber_list_contacts.
     * @example
     * // Update one Subscriber_list_contacts
     * const subscriber_list_contacts = await prisma.subscriber_list_contacts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends subscriber_list_contactsUpdateArgs>(args: SelectSubset<T, subscriber_list_contactsUpdateArgs<ExtArgs>>): Prisma__subscriber_list_contactsClient<$Result.GetResult<Prisma.$subscriber_list_contactsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriber_list_contacts.
     * @param {subscriber_list_contactsDeleteManyArgs} args - Arguments to filter Subscriber_list_contacts to delete.
     * @example
     * // Delete a few Subscriber_list_contacts
     * const { count } = await prisma.subscriber_list_contacts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends subscriber_list_contactsDeleteManyArgs>(args?: SelectSubset<T, subscriber_list_contactsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriber_list_contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriber_list_contactsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriber_list_contacts
     * const subscriber_list_contacts = await prisma.subscriber_list_contacts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends subscriber_list_contactsUpdateManyArgs>(args: SelectSubset<T, subscriber_list_contactsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriber_list_contacts and returns the data updated in the database.
     * @param {subscriber_list_contactsUpdateManyAndReturnArgs} args - Arguments to update many Subscriber_list_contacts.
     * @example
     * // Update many Subscriber_list_contacts
     * const subscriber_list_contacts = await prisma.subscriber_list_contacts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriber_list_contacts and only return the `id`
     * const subscriber_list_contactsWithIdOnly = await prisma.subscriber_list_contacts.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends subscriber_list_contactsUpdateManyAndReturnArgs>(args: SelectSubset<T, subscriber_list_contactsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriber_list_contactsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscriber_list_contacts.
     * @param {subscriber_list_contactsUpsertArgs} args - Arguments to update or create a Subscriber_list_contacts.
     * @example
     * // Update or create a Subscriber_list_contacts
     * const subscriber_list_contacts = await prisma.subscriber_list_contacts.upsert({
     *   create: {
     *     // ... data to create a Subscriber_list_contacts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscriber_list_contacts we want to update
     *   }
     * })
     */
    upsert<T extends subscriber_list_contactsUpsertArgs>(args: SelectSubset<T, subscriber_list_contactsUpsertArgs<ExtArgs>>): Prisma__subscriber_list_contactsClient<$Result.GetResult<Prisma.$subscriber_list_contactsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriber_list_contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriber_list_contactsCountArgs} args - Arguments to filter Subscriber_list_contacts to count.
     * @example
     * // Count the number of Subscriber_list_contacts
     * const count = await prisma.subscriber_list_contacts.count({
     *   where: {
     *     // ... the filter for the Subscriber_list_contacts we want to count
     *   }
     * })
    **/
    count<T extends subscriber_list_contactsCountArgs>(
      args?: Subset<T, subscriber_list_contactsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Subscriber_list_contactsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscriber_list_contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Subscriber_list_contactsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Subscriber_list_contactsAggregateArgs>(args: Subset<T, Subscriber_list_contactsAggregateArgs>): Prisma.PrismaPromise<GetSubscriber_list_contactsAggregateType<T>>

    /**
     * Group by Subscriber_list_contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriber_list_contactsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends subscriber_list_contactsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: subscriber_list_contactsGroupByArgs['orderBy'] }
        : { orderBy?: subscriber_list_contactsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, subscriber_list_contactsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriber_list_contactsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the subscriber_list_contacts model
   */
  readonly fields: subscriber_list_contactsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for subscriber_list_contacts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__subscriber_list_contactsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscriberList<T extends subscriber_listDefaultArgs<ExtArgs> = {}>(args?: Subset<T, subscriber_listDefaultArgs<ExtArgs>>): Prisma__subscriber_listClient<$Result.GetResult<Prisma.$subscriber_listPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    contacts<T extends subscriber_list_contacts$contactsArgs<ExtArgs> = {}>(args?: Subset<T, subscriber_list_contacts$contactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the subscriber_list_contacts model
   */
  interface subscriber_list_contactsFieldRefs {
    readonly id: FieldRef<"subscriber_list_contacts", 'String'>
    readonly tenant_id: FieldRef<"subscriber_list_contacts", 'String'>
    readonly subscriber_list_id: FieldRef<"subscriber_list_contacts", 'String'>
    readonly created_at: FieldRef<"subscriber_list_contacts", 'DateTime'>
    readonly created_by: FieldRef<"subscriber_list_contacts", 'String'>
    readonly updated_at: FieldRef<"subscriber_list_contacts", 'DateTime'>
    readonly updated_by: FieldRef<"subscriber_list_contacts", 'String'>
  }
    

  // Custom InputTypes
  /**
   * subscriber_list_contacts findUnique
   */
  export type subscriber_list_contactsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsInclude<ExtArgs> | null
    /**
     * Filter, which subscriber_list_contacts to fetch.
     */
    where: subscriber_list_contactsWhereUniqueInput
  }

  /**
   * subscriber_list_contacts findUniqueOrThrow
   */
  export type subscriber_list_contactsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsInclude<ExtArgs> | null
    /**
     * Filter, which subscriber_list_contacts to fetch.
     */
    where: subscriber_list_contactsWhereUniqueInput
  }

  /**
   * subscriber_list_contacts findFirst
   */
  export type subscriber_list_contactsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsInclude<ExtArgs> | null
    /**
     * Filter, which subscriber_list_contacts to fetch.
     */
    where?: subscriber_list_contactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriber_list_contacts to fetch.
     */
    orderBy?: subscriber_list_contactsOrderByWithRelationInput | subscriber_list_contactsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscriber_list_contacts.
     */
    cursor?: subscriber_list_contactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriber_list_contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriber_list_contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscriber_list_contacts.
     */
    distinct?: Subscriber_list_contactsScalarFieldEnum | Subscriber_list_contactsScalarFieldEnum[]
  }

  /**
   * subscriber_list_contacts findFirstOrThrow
   */
  export type subscriber_list_contactsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsInclude<ExtArgs> | null
    /**
     * Filter, which subscriber_list_contacts to fetch.
     */
    where?: subscriber_list_contactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriber_list_contacts to fetch.
     */
    orderBy?: subscriber_list_contactsOrderByWithRelationInput | subscriber_list_contactsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscriber_list_contacts.
     */
    cursor?: subscriber_list_contactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriber_list_contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriber_list_contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscriber_list_contacts.
     */
    distinct?: Subscriber_list_contactsScalarFieldEnum | Subscriber_list_contactsScalarFieldEnum[]
  }

  /**
   * subscriber_list_contacts findMany
   */
  export type subscriber_list_contactsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsInclude<ExtArgs> | null
    /**
     * Filter, which subscriber_list_contacts to fetch.
     */
    where?: subscriber_list_contactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriber_list_contacts to fetch.
     */
    orderBy?: subscriber_list_contactsOrderByWithRelationInput | subscriber_list_contactsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing subscriber_list_contacts.
     */
    cursor?: subscriber_list_contactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriber_list_contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriber_list_contacts.
     */
    skip?: number
    distinct?: Subscriber_list_contactsScalarFieldEnum | Subscriber_list_contactsScalarFieldEnum[]
  }

  /**
   * subscriber_list_contacts create
   */
  export type subscriber_list_contactsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsInclude<ExtArgs> | null
    /**
     * The data needed to create a subscriber_list_contacts.
     */
    data: XOR<subscriber_list_contactsCreateInput, subscriber_list_contactsUncheckedCreateInput>
  }

  /**
   * subscriber_list_contacts createMany
   */
  export type subscriber_list_contactsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many subscriber_list_contacts.
     */
    data: subscriber_list_contactsCreateManyInput | subscriber_list_contactsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * subscriber_list_contacts createManyAndReturn
   */
  export type subscriber_list_contactsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * The data used to create many subscriber_list_contacts.
     */
    data: subscriber_list_contactsCreateManyInput | subscriber_list_contactsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * subscriber_list_contacts update
   */
  export type subscriber_list_contactsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsInclude<ExtArgs> | null
    /**
     * The data needed to update a subscriber_list_contacts.
     */
    data: XOR<subscriber_list_contactsUpdateInput, subscriber_list_contactsUncheckedUpdateInput>
    /**
     * Choose, which subscriber_list_contacts to update.
     */
    where: subscriber_list_contactsWhereUniqueInput
  }

  /**
   * subscriber_list_contacts updateMany
   */
  export type subscriber_list_contactsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update subscriber_list_contacts.
     */
    data: XOR<subscriber_list_contactsUpdateManyMutationInput, subscriber_list_contactsUncheckedUpdateManyInput>
    /**
     * Filter which subscriber_list_contacts to update
     */
    where?: subscriber_list_contactsWhereInput
    /**
     * Limit how many subscriber_list_contacts to update.
     */
    limit?: number
  }

  /**
   * subscriber_list_contacts updateManyAndReturn
   */
  export type subscriber_list_contactsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * The data used to update subscriber_list_contacts.
     */
    data: XOR<subscriber_list_contactsUpdateManyMutationInput, subscriber_list_contactsUncheckedUpdateManyInput>
    /**
     * Filter which subscriber_list_contacts to update
     */
    where?: subscriber_list_contactsWhereInput
    /**
     * Limit how many subscriber_list_contacts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * subscriber_list_contacts upsert
   */
  export type subscriber_list_contactsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsInclude<ExtArgs> | null
    /**
     * The filter to search for the subscriber_list_contacts to update in case it exists.
     */
    where: subscriber_list_contactsWhereUniqueInput
    /**
     * In case the subscriber_list_contacts found by the `where` argument doesn't exist, create a new subscriber_list_contacts with this data.
     */
    create: XOR<subscriber_list_contactsCreateInput, subscriber_list_contactsUncheckedCreateInput>
    /**
     * In case the subscriber_list_contacts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<subscriber_list_contactsUpdateInput, subscriber_list_contactsUncheckedUpdateInput>
  }

  /**
   * subscriber_list_contacts delete
   */
  export type subscriber_list_contactsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsInclude<ExtArgs> | null
    /**
     * Filter which subscriber_list_contacts to delete.
     */
    where: subscriber_list_contactsWhereUniqueInput
  }

  /**
   * subscriber_list_contacts deleteMany
   */
  export type subscriber_list_contactsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscriber_list_contacts to delete
     */
    where?: subscriber_list_contactsWhereInput
    /**
     * Limit how many subscriber_list_contacts to delete.
     */
    limit?: number
  }

  /**
   * subscriber_list_contacts.contacts
   */
  export type subscriber_list_contacts$contactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contacts
     */
    select?: contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contacts
     */
    omit?: contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: contactsInclude<ExtArgs> | null
    where?: contactsWhereInput
    orderBy?: contactsOrderByWithRelationInput | contactsOrderByWithRelationInput[]
    cursor?: contactsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContactsScalarFieldEnum | ContactsScalarFieldEnum[]
  }

  /**
   * subscriber_list_contacts without action
   */
  export type subscriber_list_contactsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriber_list_contacts
     */
    select?: subscriber_list_contactsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriber_list_contacts
     */
    omit?: subscriber_list_contactsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriber_list_contactsInclude<ExtArgs> | null
  }


  /**
   * Model unsubscribes
   */

  export type AggregateUnsubscribes = {
    _count: UnsubscribesCountAggregateOutputType | null
    _min: UnsubscribesMinAggregateOutputType | null
    _max: UnsubscribesMaxAggregateOutputType | null
  }

  export type UnsubscribesMinAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    source: $Enums.unsubscribe_source | null
    unsubscribed_at: Date | null
    global: boolean | null
    contact_id: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type UnsubscribesMaxAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    source: $Enums.unsubscribe_source | null
    unsubscribed_at: Date | null
    global: boolean | null
    contact_id: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type UnsubscribesCountAggregateOutputType = {
    id: number
    tenant_id: number
    source: number
    unsubscribed_at: number
    global: number
    list_ids: number
    contact_id: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    _all: number
  }


  export type UnsubscribesMinAggregateInputType = {
    id?: true
    tenant_id?: true
    source?: true
    unsubscribed_at?: true
    global?: true
    contact_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type UnsubscribesMaxAggregateInputType = {
    id?: true
    tenant_id?: true
    source?: true
    unsubscribed_at?: true
    global?: true
    contact_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type UnsubscribesCountAggregateInputType = {
    id?: true
    tenant_id?: true
    source?: true
    unsubscribed_at?: true
    global?: true
    list_ids?: true
    contact_id?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    _all?: true
  }

  export type UnsubscribesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which unsubscribes to aggregate.
     */
    where?: unsubscribesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of unsubscribes to fetch.
     */
    orderBy?: unsubscribesOrderByWithRelationInput | unsubscribesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: unsubscribesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` unsubscribes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` unsubscribes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned unsubscribes
    **/
    _count?: true | UnsubscribesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UnsubscribesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UnsubscribesMaxAggregateInputType
  }

  export type GetUnsubscribesAggregateType<T extends UnsubscribesAggregateArgs> = {
        [P in keyof T & keyof AggregateUnsubscribes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUnsubscribes[P]>
      : GetScalarType<T[P], AggregateUnsubscribes[P]>
  }




  export type unsubscribesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: unsubscribesWhereInput
    orderBy?: unsubscribesOrderByWithAggregationInput | unsubscribesOrderByWithAggregationInput[]
    by: UnsubscribesScalarFieldEnum[] | UnsubscribesScalarFieldEnum
    having?: unsubscribesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UnsubscribesCountAggregateInputType | true
    _min?: UnsubscribesMinAggregateInputType
    _max?: UnsubscribesMaxAggregateInputType
  }

  export type UnsubscribesGroupByOutputType = {
    id: string
    tenant_id: string
    source: $Enums.unsubscribe_source
    unsubscribed_at: Date
    global: boolean
    list_ids: string[]
    contact_id: string
    created_at: Date
    created_by: string
    updated_at: Date | null
    updated_by: string | null
    _count: UnsubscribesCountAggregateOutputType | null
    _min: UnsubscribesMinAggregateOutputType | null
    _max: UnsubscribesMaxAggregateOutputType | null
  }

  type GetUnsubscribesGroupByPayload<T extends unsubscribesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UnsubscribesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UnsubscribesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UnsubscribesGroupByOutputType[P]>
            : GetScalarType<T[P], UnsubscribesGroupByOutputType[P]>
        }
      >
    >


  export type unsubscribesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    source?: boolean
    unsubscribed_at?: boolean
    global?: boolean
    list_ids?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unsubscribes"]>

  export type unsubscribesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    source?: boolean
    unsubscribed_at?: boolean
    global?: boolean
    list_ids?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unsubscribes"]>

  export type unsubscribesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    source?: boolean
    unsubscribed_at?: boolean
    global?: boolean
    list_ids?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unsubscribes"]>

  export type unsubscribesSelectScalar = {
    id?: boolean
    tenant_id?: boolean
    source?: boolean
    unsubscribed_at?: boolean
    global?: boolean
    list_ids?: boolean
    contact_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }

  export type unsubscribesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenant_id" | "source" | "unsubscribed_at" | "global" | "list_ids" | "contact_id" | "created_at" | "created_by" | "updated_at" | "updated_by", ExtArgs["result"]["unsubscribes"]>
  export type unsubscribesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }
  export type unsubscribesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }
  export type unsubscribesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | contactsDefaultArgs<ExtArgs>
  }

  export type $unsubscribesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "unsubscribes"
    objects: {
      contact: Prisma.$contactsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenant_id: string
      source: $Enums.unsubscribe_source
      unsubscribed_at: Date
      global: boolean
      list_ids: string[]
      contact_id: string
      created_at: Date
      created_by: string
      updated_at: Date | null
      updated_by: string | null
    }, ExtArgs["result"]["unsubscribes"]>
    composites: {}
  }

  type unsubscribesGetPayload<S extends boolean | null | undefined | unsubscribesDefaultArgs> = $Result.GetResult<Prisma.$unsubscribesPayload, S>

  type unsubscribesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<unsubscribesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UnsubscribesCountAggregateInputType | true
    }

  export interface unsubscribesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['unsubscribes'], meta: { name: 'unsubscribes' } }
    /**
     * Find zero or one Unsubscribes that matches the filter.
     * @param {unsubscribesFindUniqueArgs} args - Arguments to find a Unsubscribes
     * @example
     * // Get one Unsubscribes
     * const unsubscribes = await prisma.unsubscribes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends unsubscribesFindUniqueArgs>(args: SelectSubset<T, unsubscribesFindUniqueArgs<ExtArgs>>): Prisma__unsubscribesClient<$Result.GetResult<Prisma.$unsubscribesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Unsubscribes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {unsubscribesFindUniqueOrThrowArgs} args - Arguments to find a Unsubscribes
     * @example
     * // Get one Unsubscribes
     * const unsubscribes = await prisma.unsubscribes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends unsubscribesFindUniqueOrThrowArgs>(args: SelectSubset<T, unsubscribesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__unsubscribesClient<$Result.GetResult<Prisma.$unsubscribesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unsubscribes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {unsubscribesFindFirstArgs} args - Arguments to find a Unsubscribes
     * @example
     * // Get one Unsubscribes
     * const unsubscribes = await prisma.unsubscribes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends unsubscribesFindFirstArgs>(args?: SelectSubset<T, unsubscribesFindFirstArgs<ExtArgs>>): Prisma__unsubscribesClient<$Result.GetResult<Prisma.$unsubscribesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unsubscribes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {unsubscribesFindFirstOrThrowArgs} args - Arguments to find a Unsubscribes
     * @example
     * // Get one Unsubscribes
     * const unsubscribes = await prisma.unsubscribes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends unsubscribesFindFirstOrThrowArgs>(args?: SelectSubset<T, unsubscribesFindFirstOrThrowArgs<ExtArgs>>): Prisma__unsubscribesClient<$Result.GetResult<Prisma.$unsubscribesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Unsubscribes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {unsubscribesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Unsubscribes
     * const unsubscribes = await prisma.unsubscribes.findMany()
     * 
     * // Get first 10 Unsubscribes
     * const unsubscribes = await prisma.unsubscribes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const unsubscribesWithIdOnly = await prisma.unsubscribes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends unsubscribesFindManyArgs>(args?: SelectSubset<T, unsubscribesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$unsubscribesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Unsubscribes.
     * @param {unsubscribesCreateArgs} args - Arguments to create a Unsubscribes.
     * @example
     * // Create one Unsubscribes
     * const Unsubscribes = await prisma.unsubscribes.create({
     *   data: {
     *     // ... data to create a Unsubscribes
     *   }
     * })
     * 
     */
    create<T extends unsubscribesCreateArgs>(args: SelectSubset<T, unsubscribesCreateArgs<ExtArgs>>): Prisma__unsubscribesClient<$Result.GetResult<Prisma.$unsubscribesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Unsubscribes.
     * @param {unsubscribesCreateManyArgs} args - Arguments to create many Unsubscribes.
     * @example
     * // Create many Unsubscribes
     * const unsubscribes = await prisma.unsubscribes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends unsubscribesCreateManyArgs>(args?: SelectSubset<T, unsubscribesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Unsubscribes and returns the data saved in the database.
     * @param {unsubscribesCreateManyAndReturnArgs} args - Arguments to create many Unsubscribes.
     * @example
     * // Create many Unsubscribes
     * const unsubscribes = await prisma.unsubscribes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Unsubscribes and only return the `id`
     * const unsubscribesWithIdOnly = await prisma.unsubscribes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends unsubscribesCreateManyAndReturnArgs>(args?: SelectSubset<T, unsubscribesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$unsubscribesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Unsubscribes.
     * @param {unsubscribesDeleteArgs} args - Arguments to delete one Unsubscribes.
     * @example
     * // Delete one Unsubscribes
     * const Unsubscribes = await prisma.unsubscribes.delete({
     *   where: {
     *     // ... filter to delete one Unsubscribes
     *   }
     * })
     * 
     */
    delete<T extends unsubscribesDeleteArgs>(args: SelectSubset<T, unsubscribesDeleteArgs<ExtArgs>>): Prisma__unsubscribesClient<$Result.GetResult<Prisma.$unsubscribesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Unsubscribes.
     * @param {unsubscribesUpdateArgs} args - Arguments to update one Unsubscribes.
     * @example
     * // Update one Unsubscribes
     * const unsubscribes = await prisma.unsubscribes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends unsubscribesUpdateArgs>(args: SelectSubset<T, unsubscribesUpdateArgs<ExtArgs>>): Prisma__unsubscribesClient<$Result.GetResult<Prisma.$unsubscribesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Unsubscribes.
     * @param {unsubscribesDeleteManyArgs} args - Arguments to filter Unsubscribes to delete.
     * @example
     * // Delete a few Unsubscribes
     * const { count } = await prisma.unsubscribes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends unsubscribesDeleteManyArgs>(args?: SelectSubset<T, unsubscribesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Unsubscribes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {unsubscribesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Unsubscribes
     * const unsubscribes = await prisma.unsubscribes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends unsubscribesUpdateManyArgs>(args: SelectSubset<T, unsubscribesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Unsubscribes and returns the data updated in the database.
     * @param {unsubscribesUpdateManyAndReturnArgs} args - Arguments to update many Unsubscribes.
     * @example
     * // Update many Unsubscribes
     * const unsubscribes = await prisma.unsubscribes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Unsubscribes and only return the `id`
     * const unsubscribesWithIdOnly = await prisma.unsubscribes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends unsubscribesUpdateManyAndReturnArgs>(args: SelectSubset<T, unsubscribesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$unsubscribesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Unsubscribes.
     * @param {unsubscribesUpsertArgs} args - Arguments to update or create a Unsubscribes.
     * @example
     * // Update or create a Unsubscribes
     * const unsubscribes = await prisma.unsubscribes.upsert({
     *   create: {
     *     // ... data to create a Unsubscribes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Unsubscribes we want to update
     *   }
     * })
     */
    upsert<T extends unsubscribesUpsertArgs>(args: SelectSubset<T, unsubscribesUpsertArgs<ExtArgs>>): Prisma__unsubscribesClient<$Result.GetResult<Prisma.$unsubscribesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Unsubscribes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {unsubscribesCountArgs} args - Arguments to filter Unsubscribes to count.
     * @example
     * // Count the number of Unsubscribes
     * const count = await prisma.unsubscribes.count({
     *   where: {
     *     // ... the filter for the Unsubscribes we want to count
     *   }
     * })
    **/
    count<T extends unsubscribesCountArgs>(
      args?: Subset<T, unsubscribesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UnsubscribesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Unsubscribes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnsubscribesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UnsubscribesAggregateArgs>(args: Subset<T, UnsubscribesAggregateArgs>): Prisma.PrismaPromise<GetUnsubscribesAggregateType<T>>

    /**
     * Group by Unsubscribes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {unsubscribesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends unsubscribesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: unsubscribesGroupByArgs['orderBy'] }
        : { orderBy?: unsubscribesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, unsubscribesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnsubscribesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the unsubscribes model
   */
  readonly fields: unsubscribesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for unsubscribes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__unsubscribesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contact<T extends contactsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, contactsDefaultArgs<ExtArgs>>): Prisma__contactsClient<$Result.GetResult<Prisma.$contactsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the unsubscribes model
   */
  interface unsubscribesFieldRefs {
    readonly id: FieldRef<"unsubscribes", 'String'>
    readonly tenant_id: FieldRef<"unsubscribes", 'String'>
    readonly source: FieldRef<"unsubscribes", 'unsubscribe_source'>
    readonly unsubscribed_at: FieldRef<"unsubscribes", 'DateTime'>
    readonly global: FieldRef<"unsubscribes", 'Boolean'>
    readonly list_ids: FieldRef<"unsubscribes", 'String[]'>
    readonly contact_id: FieldRef<"unsubscribes", 'String'>
    readonly created_at: FieldRef<"unsubscribes", 'DateTime'>
    readonly created_by: FieldRef<"unsubscribes", 'String'>
    readonly updated_at: FieldRef<"unsubscribes", 'DateTime'>
    readonly updated_by: FieldRef<"unsubscribes", 'String'>
  }
    

  // Custom InputTypes
  /**
   * unsubscribes findUnique
   */
  export type unsubscribesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unsubscribes
     */
    select?: unsubscribesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unsubscribes
     */
    omit?: unsubscribesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unsubscribesInclude<ExtArgs> | null
    /**
     * Filter, which unsubscribes to fetch.
     */
    where: unsubscribesWhereUniqueInput
  }

  /**
   * unsubscribes findUniqueOrThrow
   */
  export type unsubscribesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unsubscribes
     */
    select?: unsubscribesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unsubscribes
     */
    omit?: unsubscribesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unsubscribesInclude<ExtArgs> | null
    /**
     * Filter, which unsubscribes to fetch.
     */
    where: unsubscribesWhereUniqueInput
  }

  /**
   * unsubscribes findFirst
   */
  export type unsubscribesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unsubscribes
     */
    select?: unsubscribesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unsubscribes
     */
    omit?: unsubscribesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unsubscribesInclude<ExtArgs> | null
    /**
     * Filter, which unsubscribes to fetch.
     */
    where?: unsubscribesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of unsubscribes to fetch.
     */
    orderBy?: unsubscribesOrderByWithRelationInput | unsubscribesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for unsubscribes.
     */
    cursor?: unsubscribesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` unsubscribes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` unsubscribes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of unsubscribes.
     */
    distinct?: UnsubscribesScalarFieldEnum | UnsubscribesScalarFieldEnum[]
  }

  /**
   * unsubscribes findFirstOrThrow
   */
  export type unsubscribesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unsubscribes
     */
    select?: unsubscribesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unsubscribes
     */
    omit?: unsubscribesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unsubscribesInclude<ExtArgs> | null
    /**
     * Filter, which unsubscribes to fetch.
     */
    where?: unsubscribesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of unsubscribes to fetch.
     */
    orderBy?: unsubscribesOrderByWithRelationInput | unsubscribesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for unsubscribes.
     */
    cursor?: unsubscribesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` unsubscribes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` unsubscribes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of unsubscribes.
     */
    distinct?: UnsubscribesScalarFieldEnum | UnsubscribesScalarFieldEnum[]
  }

  /**
   * unsubscribes findMany
   */
  export type unsubscribesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unsubscribes
     */
    select?: unsubscribesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unsubscribes
     */
    omit?: unsubscribesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unsubscribesInclude<ExtArgs> | null
    /**
     * Filter, which unsubscribes to fetch.
     */
    where?: unsubscribesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of unsubscribes to fetch.
     */
    orderBy?: unsubscribesOrderByWithRelationInput | unsubscribesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing unsubscribes.
     */
    cursor?: unsubscribesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` unsubscribes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` unsubscribes.
     */
    skip?: number
    distinct?: UnsubscribesScalarFieldEnum | UnsubscribesScalarFieldEnum[]
  }

  /**
   * unsubscribes create
   */
  export type unsubscribesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unsubscribes
     */
    select?: unsubscribesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unsubscribes
     */
    omit?: unsubscribesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unsubscribesInclude<ExtArgs> | null
    /**
     * The data needed to create a unsubscribes.
     */
    data: XOR<unsubscribesCreateInput, unsubscribesUncheckedCreateInput>
  }

  /**
   * unsubscribes createMany
   */
  export type unsubscribesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many unsubscribes.
     */
    data: unsubscribesCreateManyInput | unsubscribesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * unsubscribes createManyAndReturn
   */
  export type unsubscribesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unsubscribes
     */
    select?: unsubscribesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the unsubscribes
     */
    omit?: unsubscribesOmit<ExtArgs> | null
    /**
     * The data used to create many unsubscribes.
     */
    data: unsubscribesCreateManyInput | unsubscribesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unsubscribesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * unsubscribes update
   */
  export type unsubscribesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unsubscribes
     */
    select?: unsubscribesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unsubscribes
     */
    omit?: unsubscribesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unsubscribesInclude<ExtArgs> | null
    /**
     * The data needed to update a unsubscribes.
     */
    data: XOR<unsubscribesUpdateInput, unsubscribesUncheckedUpdateInput>
    /**
     * Choose, which unsubscribes to update.
     */
    where: unsubscribesWhereUniqueInput
  }

  /**
   * unsubscribes updateMany
   */
  export type unsubscribesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update unsubscribes.
     */
    data: XOR<unsubscribesUpdateManyMutationInput, unsubscribesUncheckedUpdateManyInput>
    /**
     * Filter which unsubscribes to update
     */
    where?: unsubscribesWhereInput
    /**
     * Limit how many unsubscribes to update.
     */
    limit?: number
  }

  /**
   * unsubscribes updateManyAndReturn
   */
  export type unsubscribesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unsubscribes
     */
    select?: unsubscribesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the unsubscribes
     */
    omit?: unsubscribesOmit<ExtArgs> | null
    /**
     * The data used to update unsubscribes.
     */
    data: XOR<unsubscribesUpdateManyMutationInput, unsubscribesUncheckedUpdateManyInput>
    /**
     * Filter which unsubscribes to update
     */
    where?: unsubscribesWhereInput
    /**
     * Limit how many unsubscribes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unsubscribesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * unsubscribes upsert
   */
  export type unsubscribesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unsubscribes
     */
    select?: unsubscribesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unsubscribes
     */
    omit?: unsubscribesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unsubscribesInclude<ExtArgs> | null
    /**
     * The filter to search for the unsubscribes to update in case it exists.
     */
    where: unsubscribesWhereUniqueInput
    /**
     * In case the unsubscribes found by the `where` argument doesn't exist, create a new unsubscribes with this data.
     */
    create: XOR<unsubscribesCreateInput, unsubscribesUncheckedCreateInput>
    /**
     * In case the unsubscribes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<unsubscribesUpdateInput, unsubscribesUncheckedUpdateInput>
  }

  /**
   * unsubscribes delete
   */
  export type unsubscribesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unsubscribes
     */
    select?: unsubscribesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unsubscribes
     */
    omit?: unsubscribesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unsubscribesInclude<ExtArgs> | null
    /**
     * Filter which unsubscribes to delete.
     */
    where: unsubscribesWhereUniqueInput
  }

  /**
   * unsubscribes deleteMany
   */
  export type unsubscribesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which unsubscribes to delete
     */
    where?: unsubscribesWhereInput
    /**
     * Limit how many unsubscribes to delete.
     */
    limit?: number
  }

  /**
   * unsubscribes without action
   */
  export type unsubscribesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unsubscribes
     */
    select?: unsubscribesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unsubscribes
     */
    omit?: unsubscribesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unsubscribesInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    email: string | null
    first_name: string | null
    last_name: string | null
    role: string | null
    is_active: boolean | null
    last_login_at: Date | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    email: string | null
    first_name: string | null
    last_name: string | null
    role: string | null
    is_active: boolean | null
    last_login_at: Date | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    tenant_id: number
    email: number
    first_name: number
    last_name: number
    role: number
    is_active: number
    last_login_at: number
    permissions: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    tenant_id?: true
    email?: true
    first_name?: true
    last_name?: true
    role?: true
    is_active?: true
    last_login_at?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    tenant_id?: true
    email?: true
    first_name?: true
    last_name?: true
    role?: true
    is_active?: true
    last_login_at?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    tenant_id?: true
    email?: true
    first_name?: true
    last_name?: true
    role?: true
    is_active?: true
    last_login_at?: true
    permissions?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    tenant_id: string
    email: string
    first_name: string | null
    last_name: string | null
    role: string
    is_active: boolean
    last_login_at: Date | null
    permissions: string[]
    created_at: Date
    created_by: string
    updated_at: Date | null
    updated_by: string | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    role?: boolean
    is_active?: boolean
    last_login_at?: boolean
    permissions?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    role?: boolean
    is_active?: boolean
    last_login_at?: boolean
    permissions?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    role?: boolean
    is_active?: boolean
    last_login_at?: boolean
    permissions?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    tenant_id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    role?: boolean
    is_active?: boolean
    last_login_at?: boolean
    permissions?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenant_id" | "email" | "first_name" | "last_name" | "role" | "is_active" | "last_login_at" | "permissions" | "created_at" | "created_by" | "updated_at" | "updated_by", ExtArgs["result"]["users"]>

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenant_id: string
      email: string
      first_name: string | null
      last_name: string | null
      role: string
      is_active: boolean
      last_login_at: Date | null
      permissions: string[]
      created_at: Date
      created_by: string
      updated_at: Date | null
      updated_by: string | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly tenant_id: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly first_name: FieldRef<"users", 'String'>
    readonly last_name: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'String'>
    readonly is_active: FieldRef<"users", 'Boolean'>
    readonly last_login_at: FieldRef<"users", 'DateTime'>
    readonly permissions: FieldRef<"users", 'String[]'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly created_by: FieldRef<"users", 'String'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
    readonly updated_by: FieldRef<"users", 'String'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
  }


  /**
   * Model api_keys
   */

  export type AggregateApi_keys = {
    _count: Api_keysCountAggregateOutputType | null
    _min: Api_keysMinAggregateOutputType | null
    _max: Api_keysMaxAggregateOutputType | null
  }

  export type Api_keysMinAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    name: string | null
    key: string | null
    is_active: boolean | null
    last_used_at: Date | null
    expires_at: Date | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type Api_keysMaxAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    name: string | null
    key: string | null
    is_active: boolean | null
    last_used_at: Date | null
    expires_at: Date | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type Api_keysCountAggregateOutputType = {
    id: number
    tenant_id: number
    name: number
    key: number
    is_active: number
    last_used_at: number
    expires_at: number
    permissions: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    _all: number
  }


  export type Api_keysMinAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    key?: true
    is_active?: true
    last_used_at?: true
    expires_at?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type Api_keysMaxAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    key?: true
    is_active?: true
    last_used_at?: true
    expires_at?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type Api_keysCountAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    key?: true
    is_active?: true
    last_used_at?: true
    expires_at?: true
    permissions?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    _all?: true
  }

  export type Api_keysAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which api_keys to aggregate.
     */
    where?: api_keysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of api_keys to fetch.
     */
    orderBy?: api_keysOrderByWithRelationInput | api_keysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: api_keysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` api_keys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` api_keys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned api_keys
    **/
    _count?: true | Api_keysCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Api_keysMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Api_keysMaxAggregateInputType
  }

  export type GetApi_keysAggregateType<T extends Api_keysAggregateArgs> = {
        [P in keyof T & keyof AggregateApi_keys]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApi_keys[P]>
      : GetScalarType<T[P], AggregateApi_keys[P]>
  }




  export type api_keysGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: api_keysWhereInput
    orderBy?: api_keysOrderByWithAggregationInput | api_keysOrderByWithAggregationInput[]
    by: Api_keysScalarFieldEnum[] | Api_keysScalarFieldEnum
    having?: api_keysScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Api_keysCountAggregateInputType | true
    _min?: Api_keysMinAggregateInputType
    _max?: Api_keysMaxAggregateInputType
  }

  export type Api_keysGroupByOutputType = {
    id: string
    tenant_id: string
    name: string
    key: string
    is_active: boolean
    last_used_at: Date | null
    expires_at: Date | null
    permissions: string[]
    created_at: Date
    created_by: string
    updated_at: Date | null
    updated_by: string | null
    _count: Api_keysCountAggregateOutputType | null
    _min: Api_keysMinAggregateOutputType | null
    _max: Api_keysMaxAggregateOutputType | null
  }

  type GetApi_keysGroupByPayload<T extends api_keysGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Api_keysGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Api_keysGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Api_keysGroupByOutputType[P]>
            : GetScalarType<T[P], Api_keysGroupByOutputType[P]>
        }
      >
    >


  export type api_keysSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    key?: boolean
    is_active?: boolean
    last_used_at?: boolean
    expires_at?: boolean
    permissions?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["api_keys"]>

  export type api_keysSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    key?: boolean
    is_active?: boolean
    last_used_at?: boolean
    expires_at?: boolean
    permissions?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["api_keys"]>

  export type api_keysSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    key?: boolean
    is_active?: boolean
    last_used_at?: boolean
    expires_at?: boolean
    permissions?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["api_keys"]>

  export type api_keysSelectScalar = {
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    key?: boolean
    is_active?: boolean
    last_used_at?: boolean
    expires_at?: boolean
    permissions?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }

  export type api_keysOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenant_id" | "name" | "key" | "is_active" | "last_used_at" | "expires_at" | "permissions" | "created_at" | "created_by" | "updated_at" | "updated_by", ExtArgs["result"]["api_keys"]>

  export type $api_keysPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "api_keys"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenant_id: string
      name: string
      key: string
      is_active: boolean
      last_used_at: Date | null
      expires_at: Date | null
      permissions: string[]
      created_at: Date
      created_by: string
      updated_at: Date | null
      updated_by: string | null
    }, ExtArgs["result"]["api_keys"]>
    composites: {}
  }

  type api_keysGetPayload<S extends boolean | null | undefined | api_keysDefaultArgs> = $Result.GetResult<Prisma.$api_keysPayload, S>

  type api_keysCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<api_keysFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Api_keysCountAggregateInputType | true
    }

  export interface api_keysDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['api_keys'], meta: { name: 'api_keys' } }
    /**
     * Find zero or one Api_keys that matches the filter.
     * @param {api_keysFindUniqueArgs} args - Arguments to find a Api_keys
     * @example
     * // Get one Api_keys
     * const api_keys = await prisma.api_keys.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends api_keysFindUniqueArgs>(args: SelectSubset<T, api_keysFindUniqueArgs<ExtArgs>>): Prisma__api_keysClient<$Result.GetResult<Prisma.$api_keysPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Api_keys that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {api_keysFindUniqueOrThrowArgs} args - Arguments to find a Api_keys
     * @example
     * // Get one Api_keys
     * const api_keys = await prisma.api_keys.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends api_keysFindUniqueOrThrowArgs>(args: SelectSubset<T, api_keysFindUniqueOrThrowArgs<ExtArgs>>): Prisma__api_keysClient<$Result.GetResult<Prisma.$api_keysPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Api_keys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {api_keysFindFirstArgs} args - Arguments to find a Api_keys
     * @example
     * // Get one Api_keys
     * const api_keys = await prisma.api_keys.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends api_keysFindFirstArgs>(args?: SelectSubset<T, api_keysFindFirstArgs<ExtArgs>>): Prisma__api_keysClient<$Result.GetResult<Prisma.$api_keysPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Api_keys that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {api_keysFindFirstOrThrowArgs} args - Arguments to find a Api_keys
     * @example
     * // Get one Api_keys
     * const api_keys = await prisma.api_keys.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends api_keysFindFirstOrThrowArgs>(args?: SelectSubset<T, api_keysFindFirstOrThrowArgs<ExtArgs>>): Prisma__api_keysClient<$Result.GetResult<Prisma.$api_keysPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Api_keys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {api_keysFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Api_keys
     * const api_keys = await prisma.api_keys.findMany()
     * 
     * // Get first 10 Api_keys
     * const api_keys = await prisma.api_keys.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const api_keysWithIdOnly = await prisma.api_keys.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends api_keysFindManyArgs>(args?: SelectSubset<T, api_keysFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$api_keysPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Api_keys.
     * @param {api_keysCreateArgs} args - Arguments to create a Api_keys.
     * @example
     * // Create one Api_keys
     * const Api_keys = await prisma.api_keys.create({
     *   data: {
     *     // ... data to create a Api_keys
     *   }
     * })
     * 
     */
    create<T extends api_keysCreateArgs>(args: SelectSubset<T, api_keysCreateArgs<ExtArgs>>): Prisma__api_keysClient<$Result.GetResult<Prisma.$api_keysPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Api_keys.
     * @param {api_keysCreateManyArgs} args - Arguments to create many Api_keys.
     * @example
     * // Create many Api_keys
     * const api_keys = await prisma.api_keys.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends api_keysCreateManyArgs>(args?: SelectSubset<T, api_keysCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Api_keys and returns the data saved in the database.
     * @param {api_keysCreateManyAndReturnArgs} args - Arguments to create many Api_keys.
     * @example
     * // Create many Api_keys
     * const api_keys = await prisma.api_keys.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Api_keys and only return the `id`
     * const api_keysWithIdOnly = await prisma.api_keys.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends api_keysCreateManyAndReturnArgs>(args?: SelectSubset<T, api_keysCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$api_keysPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Api_keys.
     * @param {api_keysDeleteArgs} args - Arguments to delete one Api_keys.
     * @example
     * // Delete one Api_keys
     * const Api_keys = await prisma.api_keys.delete({
     *   where: {
     *     // ... filter to delete one Api_keys
     *   }
     * })
     * 
     */
    delete<T extends api_keysDeleteArgs>(args: SelectSubset<T, api_keysDeleteArgs<ExtArgs>>): Prisma__api_keysClient<$Result.GetResult<Prisma.$api_keysPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Api_keys.
     * @param {api_keysUpdateArgs} args - Arguments to update one Api_keys.
     * @example
     * // Update one Api_keys
     * const api_keys = await prisma.api_keys.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends api_keysUpdateArgs>(args: SelectSubset<T, api_keysUpdateArgs<ExtArgs>>): Prisma__api_keysClient<$Result.GetResult<Prisma.$api_keysPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Api_keys.
     * @param {api_keysDeleteManyArgs} args - Arguments to filter Api_keys to delete.
     * @example
     * // Delete a few Api_keys
     * const { count } = await prisma.api_keys.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends api_keysDeleteManyArgs>(args?: SelectSubset<T, api_keysDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Api_keys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {api_keysUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Api_keys
     * const api_keys = await prisma.api_keys.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends api_keysUpdateManyArgs>(args: SelectSubset<T, api_keysUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Api_keys and returns the data updated in the database.
     * @param {api_keysUpdateManyAndReturnArgs} args - Arguments to update many Api_keys.
     * @example
     * // Update many Api_keys
     * const api_keys = await prisma.api_keys.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Api_keys and only return the `id`
     * const api_keysWithIdOnly = await prisma.api_keys.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends api_keysUpdateManyAndReturnArgs>(args: SelectSubset<T, api_keysUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$api_keysPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Api_keys.
     * @param {api_keysUpsertArgs} args - Arguments to update or create a Api_keys.
     * @example
     * // Update or create a Api_keys
     * const api_keys = await prisma.api_keys.upsert({
     *   create: {
     *     // ... data to create a Api_keys
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Api_keys we want to update
     *   }
     * })
     */
    upsert<T extends api_keysUpsertArgs>(args: SelectSubset<T, api_keysUpsertArgs<ExtArgs>>): Prisma__api_keysClient<$Result.GetResult<Prisma.$api_keysPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Api_keys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {api_keysCountArgs} args - Arguments to filter Api_keys to count.
     * @example
     * // Count the number of Api_keys
     * const count = await prisma.api_keys.count({
     *   where: {
     *     // ... the filter for the Api_keys we want to count
     *   }
     * })
    **/
    count<T extends api_keysCountArgs>(
      args?: Subset<T, api_keysCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Api_keysCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Api_keys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Api_keysAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Api_keysAggregateArgs>(args: Subset<T, Api_keysAggregateArgs>): Prisma.PrismaPromise<GetApi_keysAggregateType<T>>

    /**
     * Group by Api_keys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {api_keysGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends api_keysGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: api_keysGroupByArgs['orderBy'] }
        : { orderBy?: api_keysGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, api_keysGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApi_keysGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the api_keys model
   */
  readonly fields: api_keysFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for api_keys.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__api_keysClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the api_keys model
   */
  interface api_keysFieldRefs {
    readonly id: FieldRef<"api_keys", 'String'>
    readonly tenant_id: FieldRef<"api_keys", 'String'>
    readonly name: FieldRef<"api_keys", 'String'>
    readonly key: FieldRef<"api_keys", 'String'>
    readonly is_active: FieldRef<"api_keys", 'Boolean'>
    readonly last_used_at: FieldRef<"api_keys", 'DateTime'>
    readonly expires_at: FieldRef<"api_keys", 'DateTime'>
    readonly permissions: FieldRef<"api_keys", 'String[]'>
    readonly created_at: FieldRef<"api_keys", 'DateTime'>
    readonly created_by: FieldRef<"api_keys", 'String'>
    readonly updated_at: FieldRef<"api_keys", 'DateTime'>
    readonly updated_by: FieldRef<"api_keys", 'String'>
  }
    

  // Custom InputTypes
  /**
   * api_keys findUnique
   */
  export type api_keysFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the api_keys
     */
    select?: api_keysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the api_keys
     */
    omit?: api_keysOmit<ExtArgs> | null
    /**
     * Filter, which api_keys to fetch.
     */
    where: api_keysWhereUniqueInput
  }

  /**
   * api_keys findUniqueOrThrow
   */
  export type api_keysFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the api_keys
     */
    select?: api_keysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the api_keys
     */
    omit?: api_keysOmit<ExtArgs> | null
    /**
     * Filter, which api_keys to fetch.
     */
    where: api_keysWhereUniqueInput
  }

  /**
   * api_keys findFirst
   */
  export type api_keysFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the api_keys
     */
    select?: api_keysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the api_keys
     */
    omit?: api_keysOmit<ExtArgs> | null
    /**
     * Filter, which api_keys to fetch.
     */
    where?: api_keysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of api_keys to fetch.
     */
    orderBy?: api_keysOrderByWithRelationInput | api_keysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for api_keys.
     */
    cursor?: api_keysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` api_keys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` api_keys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of api_keys.
     */
    distinct?: Api_keysScalarFieldEnum | Api_keysScalarFieldEnum[]
  }

  /**
   * api_keys findFirstOrThrow
   */
  export type api_keysFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the api_keys
     */
    select?: api_keysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the api_keys
     */
    omit?: api_keysOmit<ExtArgs> | null
    /**
     * Filter, which api_keys to fetch.
     */
    where?: api_keysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of api_keys to fetch.
     */
    orderBy?: api_keysOrderByWithRelationInput | api_keysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for api_keys.
     */
    cursor?: api_keysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` api_keys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` api_keys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of api_keys.
     */
    distinct?: Api_keysScalarFieldEnum | Api_keysScalarFieldEnum[]
  }

  /**
   * api_keys findMany
   */
  export type api_keysFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the api_keys
     */
    select?: api_keysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the api_keys
     */
    omit?: api_keysOmit<ExtArgs> | null
    /**
     * Filter, which api_keys to fetch.
     */
    where?: api_keysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of api_keys to fetch.
     */
    orderBy?: api_keysOrderByWithRelationInput | api_keysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing api_keys.
     */
    cursor?: api_keysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` api_keys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` api_keys.
     */
    skip?: number
    distinct?: Api_keysScalarFieldEnum | Api_keysScalarFieldEnum[]
  }

  /**
   * api_keys create
   */
  export type api_keysCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the api_keys
     */
    select?: api_keysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the api_keys
     */
    omit?: api_keysOmit<ExtArgs> | null
    /**
     * The data needed to create a api_keys.
     */
    data: XOR<api_keysCreateInput, api_keysUncheckedCreateInput>
  }

  /**
   * api_keys createMany
   */
  export type api_keysCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many api_keys.
     */
    data: api_keysCreateManyInput | api_keysCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * api_keys createManyAndReturn
   */
  export type api_keysCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the api_keys
     */
    select?: api_keysSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the api_keys
     */
    omit?: api_keysOmit<ExtArgs> | null
    /**
     * The data used to create many api_keys.
     */
    data: api_keysCreateManyInput | api_keysCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * api_keys update
   */
  export type api_keysUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the api_keys
     */
    select?: api_keysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the api_keys
     */
    omit?: api_keysOmit<ExtArgs> | null
    /**
     * The data needed to update a api_keys.
     */
    data: XOR<api_keysUpdateInput, api_keysUncheckedUpdateInput>
    /**
     * Choose, which api_keys to update.
     */
    where: api_keysWhereUniqueInput
  }

  /**
   * api_keys updateMany
   */
  export type api_keysUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update api_keys.
     */
    data: XOR<api_keysUpdateManyMutationInput, api_keysUncheckedUpdateManyInput>
    /**
     * Filter which api_keys to update
     */
    where?: api_keysWhereInput
    /**
     * Limit how many api_keys to update.
     */
    limit?: number
  }

  /**
   * api_keys updateManyAndReturn
   */
  export type api_keysUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the api_keys
     */
    select?: api_keysSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the api_keys
     */
    omit?: api_keysOmit<ExtArgs> | null
    /**
     * The data used to update api_keys.
     */
    data: XOR<api_keysUpdateManyMutationInput, api_keysUncheckedUpdateManyInput>
    /**
     * Filter which api_keys to update
     */
    where?: api_keysWhereInput
    /**
     * Limit how many api_keys to update.
     */
    limit?: number
  }

  /**
   * api_keys upsert
   */
  export type api_keysUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the api_keys
     */
    select?: api_keysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the api_keys
     */
    omit?: api_keysOmit<ExtArgs> | null
    /**
     * The filter to search for the api_keys to update in case it exists.
     */
    where: api_keysWhereUniqueInput
    /**
     * In case the api_keys found by the `where` argument doesn't exist, create a new api_keys with this data.
     */
    create: XOR<api_keysCreateInput, api_keysUncheckedCreateInput>
    /**
     * In case the api_keys was found with the provided `where` argument, update it with this data.
     */
    update: XOR<api_keysUpdateInput, api_keysUncheckedUpdateInput>
  }

  /**
   * api_keys delete
   */
  export type api_keysDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the api_keys
     */
    select?: api_keysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the api_keys
     */
    omit?: api_keysOmit<ExtArgs> | null
    /**
     * Filter which api_keys to delete.
     */
    where: api_keysWhereUniqueInput
  }

  /**
   * api_keys deleteMany
   */
  export type api_keysDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which api_keys to delete
     */
    where?: api_keysWhereInput
    /**
     * Limit how many api_keys to delete.
     */
    limit?: number
  }

  /**
   * api_keys without action
   */
  export type api_keysDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the api_keys
     */
    select?: api_keysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the api_keys
     */
    omit?: api_keysOmit<ExtArgs> | null
  }


  /**
   * Model template_properties
   */

  export type AggregateTemplate_properties = {
    _count: Template_propertiesCountAggregateOutputType | null
    _min: Template_propertiesMinAggregateOutputType | null
    _max: Template_propertiesMaxAggregateOutputType | null
  }

  export type Template_propertiesMinAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    templates_id: string | null
    name: string | null
    type: string | null
  }

  export type Template_propertiesMaxAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    templates_id: string | null
    name: string | null
    type: string | null
  }

  export type Template_propertiesCountAggregateOutputType = {
    id: number
    tenant_id: number
    templates_id: number
    name: number
    type: number
    default_value: number
    _all: number
  }


  export type Template_propertiesMinAggregateInputType = {
    id?: true
    tenant_id?: true
    templates_id?: true
    name?: true
    type?: true
  }

  export type Template_propertiesMaxAggregateInputType = {
    id?: true
    tenant_id?: true
    templates_id?: true
    name?: true
    type?: true
  }

  export type Template_propertiesCountAggregateInputType = {
    id?: true
    tenant_id?: true
    templates_id?: true
    name?: true
    type?: true
    default_value?: true
    _all?: true
  }

  export type Template_propertiesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which template_properties to aggregate.
     */
    where?: template_propertiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of template_properties to fetch.
     */
    orderBy?: template_propertiesOrderByWithRelationInput | template_propertiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: template_propertiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` template_properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` template_properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned template_properties
    **/
    _count?: true | Template_propertiesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Template_propertiesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Template_propertiesMaxAggregateInputType
  }

  export type GetTemplate_propertiesAggregateType<T extends Template_propertiesAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplate_properties]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplate_properties[P]>
      : GetScalarType<T[P], AggregateTemplate_properties[P]>
  }




  export type template_propertiesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: template_propertiesWhereInput
    orderBy?: template_propertiesOrderByWithAggregationInput | template_propertiesOrderByWithAggregationInput[]
    by: Template_propertiesScalarFieldEnum[] | Template_propertiesScalarFieldEnum
    having?: template_propertiesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Template_propertiesCountAggregateInputType | true
    _min?: Template_propertiesMinAggregateInputType
    _max?: Template_propertiesMaxAggregateInputType
  }

  export type Template_propertiesGroupByOutputType = {
    id: string
    tenant_id: string
    templates_id: string | null
    name: string
    type: string
    default_value: JsonValue
    _count: Template_propertiesCountAggregateOutputType | null
    _min: Template_propertiesMinAggregateOutputType | null
    _max: Template_propertiesMaxAggregateOutputType | null
  }

  type GetTemplate_propertiesGroupByPayload<T extends template_propertiesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Template_propertiesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Template_propertiesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Template_propertiesGroupByOutputType[P]>
            : GetScalarType<T[P], Template_propertiesGroupByOutputType[P]>
        }
      >
    >


  export type template_propertiesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    templates_id?: boolean
    name?: boolean
    type?: boolean
    default_value?: boolean
    templates?: boolean | template_properties$templatesArgs<ExtArgs>
  }, ExtArgs["result"]["template_properties"]>

  export type template_propertiesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    templates_id?: boolean
    name?: boolean
    type?: boolean
    default_value?: boolean
    templates?: boolean | template_properties$templatesArgs<ExtArgs>
  }, ExtArgs["result"]["template_properties"]>

  export type template_propertiesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    templates_id?: boolean
    name?: boolean
    type?: boolean
    default_value?: boolean
    templates?: boolean | template_properties$templatesArgs<ExtArgs>
  }, ExtArgs["result"]["template_properties"]>

  export type template_propertiesSelectScalar = {
    id?: boolean
    tenant_id?: boolean
    templates_id?: boolean
    name?: boolean
    type?: boolean
    default_value?: boolean
  }

  export type template_propertiesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenant_id" | "templates_id" | "name" | "type" | "default_value", ExtArgs["result"]["template_properties"]>
  export type template_propertiesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    templates?: boolean | template_properties$templatesArgs<ExtArgs>
  }
  export type template_propertiesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    templates?: boolean | template_properties$templatesArgs<ExtArgs>
  }
  export type template_propertiesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    templates?: boolean | template_properties$templatesArgs<ExtArgs>
  }

  export type $template_propertiesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "template_properties"
    objects: {
      templates: Prisma.$templatesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenant_id: string
      templates_id: string | null
      name: string
      type: string
      default_value: Prisma.JsonValue
    }, ExtArgs["result"]["template_properties"]>
    composites: {}
  }

  type template_propertiesGetPayload<S extends boolean | null | undefined | template_propertiesDefaultArgs> = $Result.GetResult<Prisma.$template_propertiesPayload, S>

  type template_propertiesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<template_propertiesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Template_propertiesCountAggregateInputType | true
    }

  export interface template_propertiesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['template_properties'], meta: { name: 'template_properties' } }
    /**
     * Find zero or one Template_properties that matches the filter.
     * @param {template_propertiesFindUniqueArgs} args - Arguments to find a Template_properties
     * @example
     * // Get one Template_properties
     * const template_properties = await prisma.template_properties.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends template_propertiesFindUniqueArgs>(args: SelectSubset<T, template_propertiesFindUniqueArgs<ExtArgs>>): Prisma__template_propertiesClient<$Result.GetResult<Prisma.$template_propertiesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Template_properties that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {template_propertiesFindUniqueOrThrowArgs} args - Arguments to find a Template_properties
     * @example
     * // Get one Template_properties
     * const template_properties = await prisma.template_properties.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends template_propertiesFindUniqueOrThrowArgs>(args: SelectSubset<T, template_propertiesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__template_propertiesClient<$Result.GetResult<Prisma.$template_propertiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template_properties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {template_propertiesFindFirstArgs} args - Arguments to find a Template_properties
     * @example
     * // Get one Template_properties
     * const template_properties = await prisma.template_properties.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends template_propertiesFindFirstArgs>(args?: SelectSubset<T, template_propertiesFindFirstArgs<ExtArgs>>): Prisma__template_propertiesClient<$Result.GetResult<Prisma.$template_propertiesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template_properties that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {template_propertiesFindFirstOrThrowArgs} args - Arguments to find a Template_properties
     * @example
     * // Get one Template_properties
     * const template_properties = await prisma.template_properties.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends template_propertiesFindFirstOrThrowArgs>(args?: SelectSubset<T, template_propertiesFindFirstOrThrowArgs<ExtArgs>>): Prisma__template_propertiesClient<$Result.GetResult<Prisma.$template_propertiesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Template_properties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {template_propertiesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Template_properties
     * const template_properties = await prisma.template_properties.findMany()
     * 
     * // Get first 10 Template_properties
     * const template_properties = await prisma.template_properties.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const template_propertiesWithIdOnly = await prisma.template_properties.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends template_propertiesFindManyArgs>(args?: SelectSubset<T, template_propertiesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$template_propertiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Template_properties.
     * @param {template_propertiesCreateArgs} args - Arguments to create a Template_properties.
     * @example
     * // Create one Template_properties
     * const Template_properties = await prisma.template_properties.create({
     *   data: {
     *     // ... data to create a Template_properties
     *   }
     * })
     * 
     */
    create<T extends template_propertiesCreateArgs>(args: SelectSubset<T, template_propertiesCreateArgs<ExtArgs>>): Prisma__template_propertiesClient<$Result.GetResult<Prisma.$template_propertiesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Template_properties.
     * @param {template_propertiesCreateManyArgs} args - Arguments to create many Template_properties.
     * @example
     * // Create many Template_properties
     * const template_properties = await prisma.template_properties.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends template_propertiesCreateManyArgs>(args?: SelectSubset<T, template_propertiesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Template_properties and returns the data saved in the database.
     * @param {template_propertiesCreateManyAndReturnArgs} args - Arguments to create many Template_properties.
     * @example
     * // Create many Template_properties
     * const template_properties = await prisma.template_properties.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Template_properties and only return the `id`
     * const template_propertiesWithIdOnly = await prisma.template_properties.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends template_propertiesCreateManyAndReturnArgs>(args?: SelectSubset<T, template_propertiesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$template_propertiesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Template_properties.
     * @param {template_propertiesDeleteArgs} args - Arguments to delete one Template_properties.
     * @example
     * // Delete one Template_properties
     * const Template_properties = await prisma.template_properties.delete({
     *   where: {
     *     // ... filter to delete one Template_properties
     *   }
     * })
     * 
     */
    delete<T extends template_propertiesDeleteArgs>(args: SelectSubset<T, template_propertiesDeleteArgs<ExtArgs>>): Prisma__template_propertiesClient<$Result.GetResult<Prisma.$template_propertiesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Template_properties.
     * @param {template_propertiesUpdateArgs} args - Arguments to update one Template_properties.
     * @example
     * // Update one Template_properties
     * const template_properties = await prisma.template_properties.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends template_propertiesUpdateArgs>(args: SelectSubset<T, template_propertiesUpdateArgs<ExtArgs>>): Prisma__template_propertiesClient<$Result.GetResult<Prisma.$template_propertiesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Template_properties.
     * @param {template_propertiesDeleteManyArgs} args - Arguments to filter Template_properties to delete.
     * @example
     * // Delete a few Template_properties
     * const { count } = await prisma.template_properties.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends template_propertiesDeleteManyArgs>(args?: SelectSubset<T, template_propertiesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Template_properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {template_propertiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Template_properties
     * const template_properties = await prisma.template_properties.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends template_propertiesUpdateManyArgs>(args: SelectSubset<T, template_propertiesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Template_properties and returns the data updated in the database.
     * @param {template_propertiesUpdateManyAndReturnArgs} args - Arguments to update many Template_properties.
     * @example
     * // Update many Template_properties
     * const template_properties = await prisma.template_properties.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Template_properties and only return the `id`
     * const template_propertiesWithIdOnly = await prisma.template_properties.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends template_propertiesUpdateManyAndReturnArgs>(args: SelectSubset<T, template_propertiesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$template_propertiesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Template_properties.
     * @param {template_propertiesUpsertArgs} args - Arguments to update or create a Template_properties.
     * @example
     * // Update or create a Template_properties
     * const template_properties = await prisma.template_properties.upsert({
     *   create: {
     *     // ... data to create a Template_properties
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Template_properties we want to update
     *   }
     * })
     */
    upsert<T extends template_propertiesUpsertArgs>(args: SelectSubset<T, template_propertiesUpsertArgs<ExtArgs>>): Prisma__template_propertiesClient<$Result.GetResult<Prisma.$template_propertiesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Template_properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {template_propertiesCountArgs} args - Arguments to filter Template_properties to count.
     * @example
     * // Count the number of Template_properties
     * const count = await prisma.template_properties.count({
     *   where: {
     *     // ... the filter for the Template_properties we want to count
     *   }
     * })
    **/
    count<T extends template_propertiesCountArgs>(
      args?: Subset<T, template_propertiesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Template_propertiesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Template_properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Template_propertiesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Template_propertiesAggregateArgs>(args: Subset<T, Template_propertiesAggregateArgs>): Prisma.PrismaPromise<GetTemplate_propertiesAggregateType<T>>

    /**
     * Group by Template_properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {template_propertiesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends template_propertiesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: template_propertiesGroupByArgs['orderBy'] }
        : { orderBy?: template_propertiesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, template_propertiesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplate_propertiesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the template_properties model
   */
  readonly fields: template_propertiesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for template_properties.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__template_propertiesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    templates<T extends template_properties$templatesArgs<ExtArgs> = {}>(args?: Subset<T, template_properties$templatesArgs<ExtArgs>>): Prisma__templatesClient<$Result.GetResult<Prisma.$templatesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the template_properties model
   */
  interface template_propertiesFieldRefs {
    readonly id: FieldRef<"template_properties", 'String'>
    readonly tenant_id: FieldRef<"template_properties", 'String'>
    readonly templates_id: FieldRef<"template_properties", 'String'>
    readonly name: FieldRef<"template_properties", 'String'>
    readonly type: FieldRef<"template_properties", 'String'>
    readonly default_value: FieldRef<"template_properties", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * template_properties findUnique
   */
  export type template_propertiesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template_properties
     */
    select?: template_propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template_properties
     */
    omit?: template_propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: template_propertiesInclude<ExtArgs> | null
    /**
     * Filter, which template_properties to fetch.
     */
    where: template_propertiesWhereUniqueInput
  }

  /**
   * template_properties findUniqueOrThrow
   */
  export type template_propertiesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template_properties
     */
    select?: template_propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template_properties
     */
    omit?: template_propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: template_propertiesInclude<ExtArgs> | null
    /**
     * Filter, which template_properties to fetch.
     */
    where: template_propertiesWhereUniqueInput
  }

  /**
   * template_properties findFirst
   */
  export type template_propertiesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template_properties
     */
    select?: template_propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template_properties
     */
    omit?: template_propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: template_propertiesInclude<ExtArgs> | null
    /**
     * Filter, which template_properties to fetch.
     */
    where?: template_propertiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of template_properties to fetch.
     */
    orderBy?: template_propertiesOrderByWithRelationInput | template_propertiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for template_properties.
     */
    cursor?: template_propertiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` template_properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` template_properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of template_properties.
     */
    distinct?: Template_propertiesScalarFieldEnum | Template_propertiesScalarFieldEnum[]
  }

  /**
   * template_properties findFirstOrThrow
   */
  export type template_propertiesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template_properties
     */
    select?: template_propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template_properties
     */
    omit?: template_propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: template_propertiesInclude<ExtArgs> | null
    /**
     * Filter, which template_properties to fetch.
     */
    where?: template_propertiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of template_properties to fetch.
     */
    orderBy?: template_propertiesOrderByWithRelationInput | template_propertiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for template_properties.
     */
    cursor?: template_propertiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` template_properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` template_properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of template_properties.
     */
    distinct?: Template_propertiesScalarFieldEnum | Template_propertiesScalarFieldEnum[]
  }

  /**
   * template_properties findMany
   */
  export type template_propertiesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template_properties
     */
    select?: template_propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template_properties
     */
    omit?: template_propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: template_propertiesInclude<ExtArgs> | null
    /**
     * Filter, which template_properties to fetch.
     */
    where?: template_propertiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of template_properties to fetch.
     */
    orderBy?: template_propertiesOrderByWithRelationInput | template_propertiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing template_properties.
     */
    cursor?: template_propertiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` template_properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` template_properties.
     */
    skip?: number
    distinct?: Template_propertiesScalarFieldEnum | Template_propertiesScalarFieldEnum[]
  }

  /**
   * template_properties create
   */
  export type template_propertiesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template_properties
     */
    select?: template_propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template_properties
     */
    omit?: template_propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: template_propertiesInclude<ExtArgs> | null
    /**
     * The data needed to create a template_properties.
     */
    data: XOR<template_propertiesCreateInput, template_propertiesUncheckedCreateInput>
  }

  /**
   * template_properties createMany
   */
  export type template_propertiesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many template_properties.
     */
    data: template_propertiesCreateManyInput | template_propertiesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * template_properties createManyAndReturn
   */
  export type template_propertiesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template_properties
     */
    select?: template_propertiesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the template_properties
     */
    omit?: template_propertiesOmit<ExtArgs> | null
    /**
     * The data used to create many template_properties.
     */
    data: template_propertiesCreateManyInput | template_propertiesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: template_propertiesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * template_properties update
   */
  export type template_propertiesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template_properties
     */
    select?: template_propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template_properties
     */
    omit?: template_propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: template_propertiesInclude<ExtArgs> | null
    /**
     * The data needed to update a template_properties.
     */
    data: XOR<template_propertiesUpdateInput, template_propertiesUncheckedUpdateInput>
    /**
     * Choose, which template_properties to update.
     */
    where: template_propertiesWhereUniqueInput
  }

  /**
   * template_properties updateMany
   */
  export type template_propertiesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update template_properties.
     */
    data: XOR<template_propertiesUpdateManyMutationInput, template_propertiesUncheckedUpdateManyInput>
    /**
     * Filter which template_properties to update
     */
    where?: template_propertiesWhereInput
    /**
     * Limit how many template_properties to update.
     */
    limit?: number
  }

  /**
   * template_properties updateManyAndReturn
   */
  export type template_propertiesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template_properties
     */
    select?: template_propertiesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the template_properties
     */
    omit?: template_propertiesOmit<ExtArgs> | null
    /**
     * The data used to update template_properties.
     */
    data: XOR<template_propertiesUpdateManyMutationInput, template_propertiesUncheckedUpdateManyInput>
    /**
     * Filter which template_properties to update
     */
    where?: template_propertiesWhereInput
    /**
     * Limit how many template_properties to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: template_propertiesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * template_properties upsert
   */
  export type template_propertiesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template_properties
     */
    select?: template_propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template_properties
     */
    omit?: template_propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: template_propertiesInclude<ExtArgs> | null
    /**
     * The filter to search for the template_properties to update in case it exists.
     */
    where: template_propertiesWhereUniqueInput
    /**
     * In case the template_properties found by the `where` argument doesn't exist, create a new template_properties with this data.
     */
    create: XOR<template_propertiesCreateInput, template_propertiesUncheckedCreateInput>
    /**
     * In case the template_properties was found with the provided `where` argument, update it with this data.
     */
    update: XOR<template_propertiesUpdateInput, template_propertiesUncheckedUpdateInput>
  }

  /**
   * template_properties delete
   */
  export type template_propertiesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template_properties
     */
    select?: template_propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template_properties
     */
    omit?: template_propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: template_propertiesInclude<ExtArgs> | null
    /**
     * Filter which template_properties to delete.
     */
    where: template_propertiesWhereUniqueInput
  }

  /**
   * template_properties deleteMany
   */
  export type template_propertiesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which template_properties to delete
     */
    where?: template_propertiesWhereInput
    /**
     * Limit how many template_properties to delete.
     */
    limit?: number
  }

  /**
   * template_properties.templates
   */
  export type template_properties$templatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the templates
     */
    select?: templatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the templates
     */
    omit?: templatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: templatesInclude<ExtArgs> | null
    where?: templatesWhereInput
  }

  /**
   * template_properties without action
   */
  export type template_propertiesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template_properties
     */
    select?: template_propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template_properties
     */
    omit?: template_propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: template_propertiesInclude<ExtArgs> | null
  }


  /**
   * Model templates
   */

  export type AggregateTemplates = {
    _count: TemplatesCountAggregateOutputType | null
    _min: TemplatesMinAggregateOutputType | null
    _max: TemplatesMaxAggregateOutputType | null
  }

  export type TemplatesMinAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    name: string | null
    description: string | null
    content: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type TemplatesMaxAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    name: string | null
    description: string | null
    content: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type TemplatesCountAggregateOutputType = {
    id: number
    tenant_id: number
    name: number
    description: number
    content: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    _all: number
  }


  export type TemplatesMinAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    description?: true
    content?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type TemplatesMaxAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    description?: true
    content?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type TemplatesCountAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    description?: true
    content?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    _all?: true
  }

  export type TemplatesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which templates to aggregate.
     */
    where?: templatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of templates to fetch.
     */
    orderBy?: templatesOrderByWithRelationInput | templatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: templatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned templates
    **/
    _count?: true | TemplatesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplatesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplatesMaxAggregateInputType
  }

  export type GetTemplatesAggregateType<T extends TemplatesAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplates]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplates[P]>
      : GetScalarType<T[P], AggregateTemplates[P]>
  }




  export type templatesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: templatesWhereInput
    orderBy?: templatesOrderByWithAggregationInput | templatesOrderByWithAggregationInput[]
    by: TemplatesScalarFieldEnum[] | TemplatesScalarFieldEnum
    having?: templatesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplatesCountAggregateInputType | true
    _min?: TemplatesMinAggregateInputType
    _max?: TemplatesMaxAggregateInputType
  }

  export type TemplatesGroupByOutputType = {
    id: string
    tenant_id: string
    name: string
    description: string | null
    content: string
    created_at: Date
    created_by: string
    updated_at: Date | null
    updated_by: string | null
    _count: TemplatesCountAggregateOutputType | null
    _min: TemplatesMinAggregateOutputType | null
    _max: TemplatesMaxAggregateOutputType | null
  }

  type GetTemplatesGroupByPayload<T extends templatesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplatesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplatesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplatesGroupByOutputType[P]>
            : GetScalarType<T[P], TemplatesGroupByOutputType[P]>
        }
      >
    >


  export type templatesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    description?: boolean
    content?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    properties?: boolean | templates$propertiesArgs<ExtArgs>
    _count?: boolean | TemplatesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templates"]>

  export type templatesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    description?: boolean
    content?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["templates"]>

  export type templatesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    description?: boolean
    content?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["templates"]>

  export type templatesSelectScalar = {
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    description?: boolean
    content?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }

  export type templatesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenant_id" | "name" | "description" | "content" | "created_at" | "created_by" | "updated_at" | "updated_by", ExtArgs["result"]["templates"]>
  export type templatesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | templates$propertiesArgs<ExtArgs>
    _count?: boolean | TemplatesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type templatesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type templatesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $templatesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "templates"
    objects: {
      properties: Prisma.$template_propertiesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenant_id: string
      name: string
      description: string | null
      content: string
      created_at: Date
      created_by: string
      updated_at: Date | null
      updated_by: string | null
    }, ExtArgs["result"]["templates"]>
    composites: {}
  }

  type templatesGetPayload<S extends boolean | null | undefined | templatesDefaultArgs> = $Result.GetResult<Prisma.$templatesPayload, S>

  type templatesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<templatesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TemplatesCountAggregateInputType | true
    }

  export interface templatesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['templates'], meta: { name: 'templates' } }
    /**
     * Find zero or one Templates that matches the filter.
     * @param {templatesFindUniqueArgs} args - Arguments to find a Templates
     * @example
     * // Get one Templates
     * const templates = await prisma.templates.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends templatesFindUniqueArgs>(args: SelectSubset<T, templatesFindUniqueArgs<ExtArgs>>): Prisma__templatesClient<$Result.GetResult<Prisma.$templatesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Templates that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {templatesFindUniqueOrThrowArgs} args - Arguments to find a Templates
     * @example
     * // Get one Templates
     * const templates = await prisma.templates.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends templatesFindUniqueOrThrowArgs>(args: SelectSubset<T, templatesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__templatesClient<$Result.GetResult<Prisma.$templatesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Templates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {templatesFindFirstArgs} args - Arguments to find a Templates
     * @example
     * // Get one Templates
     * const templates = await prisma.templates.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends templatesFindFirstArgs>(args?: SelectSubset<T, templatesFindFirstArgs<ExtArgs>>): Prisma__templatesClient<$Result.GetResult<Prisma.$templatesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Templates that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {templatesFindFirstOrThrowArgs} args - Arguments to find a Templates
     * @example
     * // Get one Templates
     * const templates = await prisma.templates.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends templatesFindFirstOrThrowArgs>(args?: SelectSubset<T, templatesFindFirstOrThrowArgs<ExtArgs>>): Prisma__templatesClient<$Result.GetResult<Prisma.$templatesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Templates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {templatesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Templates
     * const templates = await prisma.templates.findMany()
     * 
     * // Get first 10 Templates
     * const templates = await prisma.templates.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templatesWithIdOnly = await prisma.templates.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends templatesFindManyArgs>(args?: SelectSubset<T, templatesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$templatesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Templates.
     * @param {templatesCreateArgs} args - Arguments to create a Templates.
     * @example
     * // Create one Templates
     * const Templates = await prisma.templates.create({
     *   data: {
     *     // ... data to create a Templates
     *   }
     * })
     * 
     */
    create<T extends templatesCreateArgs>(args: SelectSubset<T, templatesCreateArgs<ExtArgs>>): Prisma__templatesClient<$Result.GetResult<Prisma.$templatesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Templates.
     * @param {templatesCreateManyArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const templates = await prisma.templates.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends templatesCreateManyArgs>(args?: SelectSubset<T, templatesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Templates and returns the data saved in the database.
     * @param {templatesCreateManyAndReturnArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const templates = await prisma.templates.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Templates and only return the `id`
     * const templatesWithIdOnly = await prisma.templates.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends templatesCreateManyAndReturnArgs>(args?: SelectSubset<T, templatesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$templatesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Templates.
     * @param {templatesDeleteArgs} args - Arguments to delete one Templates.
     * @example
     * // Delete one Templates
     * const Templates = await prisma.templates.delete({
     *   where: {
     *     // ... filter to delete one Templates
     *   }
     * })
     * 
     */
    delete<T extends templatesDeleteArgs>(args: SelectSubset<T, templatesDeleteArgs<ExtArgs>>): Prisma__templatesClient<$Result.GetResult<Prisma.$templatesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Templates.
     * @param {templatesUpdateArgs} args - Arguments to update one Templates.
     * @example
     * // Update one Templates
     * const templates = await prisma.templates.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends templatesUpdateArgs>(args: SelectSubset<T, templatesUpdateArgs<ExtArgs>>): Prisma__templatesClient<$Result.GetResult<Prisma.$templatesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Templates.
     * @param {templatesDeleteManyArgs} args - Arguments to filter Templates to delete.
     * @example
     * // Delete a few Templates
     * const { count } = await prisma.templates.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends templatesDeleteManyArgs>(args?: SelectSubset<T, templatesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {templatesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Templates
     * const templates = await prisma.templates.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends templatesUpdateManyArgs>(args: SelectSubset<T, templatesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates and returns the data updated in the database.
     * @param {templatesUpdateManyAndReturnArgs} args - Arguments to update many Templates.
     * @example
     * // Update many Templates
     * const templates = await prisma.templates.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Templates and only return the `id`
     * const templatesWithIdOnly = await prisma.templates.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends templatesUpdateManyAndReturnArgs>(args: SelectSubset<T, templatesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$templatesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Templates.
     * @param {templatesUpsertArgs} args - Arguments to update or create a Templates.
     * @example
     * // Update or create a Templates
     * const templates = await prisma.templates.upsert({
     *   create: {
     *     // ... data to create a Templates
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Templates we want to update
     *   }
     * })
     */
    upsert<T extends templatesUpsertArgs>(args: SelectSubset<T, templatesUpsertArgs<ExtArgs>>): Prisma__templatesClient<$Result.GetResult<Prisma.$templatesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {templatesCountArgs} args - Arguments to filter Templates to count.
     * @example
     * // Count the number of Templates
     * const count = await prisma.templates.count({
     *   where: {
     *     // ... the filter for the Templates we want to count
     *   }
     * })
    **/
    count<T extends templatesCountArgs>(
      args?: Subset<T, templatesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplatesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplatesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TemplatesAggregateArgs>(args: Subset<T, TemplatesAggregateArgs>): Prisma.PrismaPromise<GetTemplatesAggregateType<T>>

    /**
     * Group by Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {templatesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends templatesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: templatesGroupByArgs['orderBy'] }
        : { orderBy?: templatesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, templatesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplatesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the templates model
   */
  readonly fields: templatesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for templates.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__templatesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    properties<T extends templates$propertiesArgs<ExtArgs> = {}>(args?: Subset<T, templates$propertiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$template_propertiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the templates model
   */
  interface templatesFieldRefs {
    readonly id: FieldRef<"templates", 'String'>
    readonly tenant_id: FieldRef<"templates", 'String'>
    readonly name: FieldRef<"templates", 'String'>
    readonly description: FieldRef<"templates", 'String'>
    readonly content: FieldRef<"templates", 'String'>
    readonly created_at: FieldRef<"templates", 'DateTime'>
    readonly created_by: FieldRef<"templates", 'String'>
    readonly updated_at: FieldRef<"templates", 'DateTime'>
    readonly updated_by: FieldRef<"templates", 'String'>
  }
    

  // Custom InputTypes
  /**
   * templates findUnique
   */
  export type templatesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the templates
     */
    select?: templatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the templates
     */
    omit?: templatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: templatesInclude<ExtArgs> | null
    /**
     * Filter, which templates to fetch.
     */
    where: templatesWhereUniqueInput
  }

  /**
   * templates findUniqueOrThrow
   */
  export type templatesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the templates
     */
    select?: templatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the templates
     */
    omit?: templatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: templatesInclude<ExtArgs> | null
    /**
     * Filter, which templates to fetch.
     */
    where: templatesWhereUniqueInput
  }

  /**
   * templates findFirst
   */
  export type templatesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the templates
     */
    select?: templatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the templates
     */
    omit?: templatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: templatesInclude<ExtArgs> | null
    /**
     * Filter, which templates to fetch.
     */
    where?: templatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of templates to fetch.
     */
    orderBy?: templatesOrderByWithRelationInput | templatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for templates.
     */
    cursor?: templatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of templates.
     */
    distinct?: TemplatesScalarFieldEnum | TemplatesScalarFieldEnum[]
  }

  /**
   * templates findFirstOrThrow
   */
  export type templatesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the templates
     */
    select?: templatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the templates
     */
    omit?: templatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: templatesInclude<ExtArgs> | null
    /**
     * Filter, which templates to fetch.
     */
    where?: templatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of templates to fetch.
     */
    orderBy?: templatesOrderByWithRelationInput | templatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for templates.
     */
    cursor?: templatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of templates.
     */
    distinct?: TemplatesScalarFieldEnum | TemplatesScalarFieldEnum[]
  }

  /**
   * templates findMany
   */
  export type templatesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the templates
     */
    select?: templatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the templates
     */
    omit?: templatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: templatesInclude<ExtArgs> | null
    /**
     * Filter, which templates to fetch.
     */
    where?: templatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of templates to fetch.
     */
    orderBy?: templatesOrderByWithRelationInput | templatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing templates.
     */
    cursor?: templatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` templates.
     */
    skip?: number
    distinct?: TemplatesScalarFieldEnum | TemplatesScalarFieldEnum[]
  }

  /**
   * templates create
   */
  export type templatesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the templates
     */
    select?: templatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the templates
     */
    omit?: templatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: templatesInclude<ExtArgs> | null
    /**
     * The data needed to create a templates.
     */
    data: XOR<templatesCreateInput, templatesUncheckedCreateInput>
  }

  /**
   * templates createMany
   */
  export type templatesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many templates.
     */
    data: templatesCreateManyInput | templatesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * templates createManyAndReturn
   */
  export type templatesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the templates
     */
    select?: templatesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the templates
     */
    omit?: templatesOmit<ExtArgs> | null
    /**
     * The data used to create many templates.
     */
    data: templatesCreateManyInput | templatesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * templates update
   */
  export type templatesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the templates
     */
    select?: templatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the templates
     */
    omit?: templatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: templatesInclude<ExtArgs> | null
    /**
     * The data needed to update a templates.
     */
    data: XOR<templatesUpdateInput, templatesUncheckedUpdateInput>
    /**
     * Choose, which templates to update.
     */
    where: templatesWhereUniqueInput
  }

  /**
   * templates updateMany
   */
  export type templatesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update templates.
     */
    data: XOR<templatesUpdateManyMutationInput, templatesUncheckedUpdateManyInput>
    /**
     * Filter which templates to update
     */
    where?: templatesWhereInput
    /**
     * Limit how many templates to update.
     */
    limit?: number
  }

  /**
   * templates updateManyAndReturn
   */
  export type templatesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the templates
     */
    select?: templatesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the templates
     */
    omit?: templatesOmit<ExtArgs> | null
    /**
     * The data used to update templates.
     */
    data: XOR<templatesUpdateManyMutationInput, templatesUncheckedUpdateManyInput>
    /**
     * Filter which templates to update
     */
    where?: templatesWhereInput
    /**
     * Limit how many templates to update.
     */
    limit?: number
  }

  /**
   * templates upsert
   */
  export type templatesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the templates
     */
    select?: templatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the templates
     */
    omit?: templatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: templatesInclude<ExtArgs> | null
    /**
     * The filter to search for the templates to update in case it exists.
     */
    where: templatesWhereUniqueInput
    /**
     * In case the templates found by the `where` argument doesn't exist, create a new templates with this data.
     */
    create: XOR<templatesCreateInput, templatesUncheckedCreateInput>
    /**
     * In case the templates was found with the provided `where` argument, update it with this data.
     */
    update: XOR<templatesUpdateInput, templatesUncheckedUpdateInput>
  }

  /**
   * templates delete
   */
  export type templatesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the templates
     */
    select?: templatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the templates
     */
    omit?: templatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: templatesInclude<ExtArgs> | null
    /**
     * Filter which templates to delete.
     */
    where: templatesWhereUniqueInput
  }

  /**
   * templates deleteMany
   */
  export type templatesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which templates to delete
     */
    where?: templatesWhereInput
    /**
     * Limit how many templates to delete.
     */
    limit?: number
  }

  /**
   * templates.properties
   */
  export type templates$propertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template_properties
     */
    select?: template_propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template_properties
     */
    omit?: template_propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: template_propertiesInclude<ExtArgs> | null
    where?: template_propertiesWhereInput
    orderBy?: template_propertiesOrderByWithRelationInput | template_propertiesOrderByWithRelationInput[]
    cursor?: template_propertiesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Template_propertiesScalarFieldEnum | Template_propertiesScalarFieldEnum[]
  }

  /**
   * templates without action
   */
  export type templatesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the templates
     */
    select?: templatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the templates
     */
    omit?: templatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: templatesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TenantsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by'
  };

  export type TenantsScalarFieldEnum = (typeof TenantsScalarFieldEnum)[keyof typeof TenantsScalarFieldEnum]


  export const ContactsScalarFieldEnum: {
    id: 'id',
    tenant_id: 'tenant_id',
    email: 'email',
    first_name: 'first_name',
    last_name: 'last_name',
    last_activity_at: 'last_activity_at',
    subscriber_list_contacts_id: 'subscriber_list_contacts_id',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by',
    list_ids: 'list_ids'
  };

  export type ContactsScalarFieldEnum = (typeof ContactsScalarFieldEnum)[keyof typeof ContactsScalarFieldEnum]


  export const CampaignsScalarFieldEnum: {
    id: 'id',
    tenant_id: 'tenant_id',
    name: 'name',
    status: 'status',
    type: 'type',
    recipients: 'recipients',
    sent: 'sent',
    delivered: 'delivered',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by'
  };

  export type CampaignsScalarFieldEnum = (typeof CampaignsScalarFieldEnum)[keyof typeof CampaignsScalarFieldEnum]


  export const ActivitiesScalarFieldEnum: {
    id: 'id',
    tenant_id: 'tenant_id',
    send_name: 'send_name',
    subject: 'subject',
    status: 'status',
    sent_at: 'sent_at',
    last_event_received_at: 'last_event_received_at',
    last_event_type: 'last_event_type',
    opens: 'opens',
    clicks: 'clicks',
    campaign_id: 'campaign_id',
    contact_id: 'contact_id',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by'
  };

  export type ActivitiesScalarFieldEnum = (typeof ActivitiesScalarFieldEnum)[keyof typeof ActivitiesScalarFieldEnum]


  export const BouncesScalarFieldEnum: {
    id: 'id',
    tenant_id: 'tenant_id',
    bounced_at: 'bounced_at',
    reason: 'reason',
    bounce_type: 'bounce_type',
    contact_id: 'contact_id',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by'
  };

  export type BouncesScalarFieldEnum = (typeof BouncesScalarFieldEnum)[keyof typeof BouncesScalarFieldEnum]


  export const SubscribersScalarFieldEnum: {
    id: 'id',
    tenant_id: 'tenant_id',
    status: 'status',
    subscribed_at: 'subscribed_at',
    contact_id: 'contact_id',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by'
  };

  export type SubscribersScalarFieldEnum = (typeof SubscribersScalarFieldEnum)[keyof typeof SubscribersScalarFieldEnum]


  export const Subscriber_listScalarFieldEnum: {
    id: 'id',
    tenant_id: 'tenant_id',
    name: 'name',
    description: 'description',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by'
  };

  export type Subscriber_listScalarFieldEnum = (typeof Subscriber_listScalarFieldEnum)[keyof typeof Subscriber_listScalarFieldEnum]


  export const Subscriber_list_contactsScalarFieldEnum: {
    id: 'id',
    tenant_id: 'tenant_id',
    subscriber_list_id: 'subscriber_list_id',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by'
  };

  export type Subscriber_list_contactsScalarFieldEnum = (typeof Subscriber_list_contactsScalarFieldEnum)[keyof typeof Subscriber_list_contactsScalarFieldEnum]


  export const UnsubscribesScalarFieldEnum: {
    id: 'id',
    tenant_id: 'tenant_id',
    source: 'source',
    unsubscribed_at: 'unsubscribed_at',
    global: 'global',
    list_ids: 'list_ids',
    contact_id: 'contact_id',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by'
  };

  export type UnsubscribesScalarFieldEnum = (typeof UnsubscribesScalarFieldEnum)[keyof typeof UnsubscribesScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    tenant_id: 'tenant_id',
    email: 'email',
    first_name: 'first_name',
    last_name: 'last_name',
    role: 'role',
    is_active: 'is_active',
    last_login_at: 'last_login_at',
    permissions: 'permissions',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const Api_keysScalarFieldEnum: {
    id: 'id',
    tenant_id: 'tenant_id',
    name: 'name',
    key: 'key',
    is_active: 'is_active',
    last_used_at: 'last_used_at',
    expires_at: 'expires_at',
    permissions: 'permissions',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by'
  };

  export type Api_keysScalarFieldEnum = (typeof Api_keysScalarFieldEnum)[keyof typeof Api_keysScalarFieldEnum]


  export const Template_propertiesScalarFieldEnum: {
    id: 'id',
    tenant_id: 'tenant_id',
    templates_id: 'templates_id',
    name: 'name',
    type: 'type',
    default_value: 'default_value'
  };

  export type Template_propertiesScalarFieldEnum = (typeof Template_propertiesScalarFieldEnum)[keyof typeof Template_propertiesScalarFieldEnum]


  export const TemplatesScalarFieldEnum: {
    id: 'id',
    tenant_id: 'tenant_id',
    name: 'name',
    description: 'description',
    content: 'content',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by'
  };

  export type TemplatesScalarFieldEnum = (typeof TemplatesScalarFieldEnum)[keyof typeof TemplatesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'campaign_status'
   */
  export type Enumcampaign_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'campaign_status'>
    


  /**
   * Reference to a field of type 'campaign_status[]'
   */
  export type ListEnumcampaign_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'campaign_status[]'>
    


  /**
   * Reference to a field of type 'campaign_type'
   */
  export type Enumcampaign_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'campaign_type'>
    


  /**
   * Reference to a field of type 'campaign_type[]'
   */
  export type ListEnumcampaign_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'campaign_type[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'activity_status'
   */
  export type Enumactivity_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'activity_status'>
    


  /**
   * Reference to a field of type 'activity_status[]'
   */
  export type ListEnumactivity_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'activity_status[]'>
    


  /**
   * Reference to a field of type 'event_type'
   */
  export type Enumevent_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'event_type'>
    


  /**
   * Reference to a field of type 'event_type[]'
   */
  export type ListEnumevent_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'event_type[]'>
    


  /**
   * Reference to a field of type 'bounce_type'
   */
  export type Enumbounce_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'bounce_type'>
    


  /**
   * Reference to a field of type 'bounce_type[]'
   */
  export type ListEnumbounce_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'bounce_type[]'>
    


  /**
   * Reference to a field of type 'subscriber_status'
   */
  export type Enumsubscriber_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'subscriber_status'>
    


  /**
   * Reference to a field of type 'subscriber_status[]'
   */
  export type ListEnumsubscriber_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'subscriber_status[]'>
    


  /**
   * Reference to a field of type 'unsubscribe_source'
   */
  export type Enumunsubscribe_sourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'unsubscribe_source'>
    


  /**
   * Reference to a field of type 'unsubscribe_source[]'
   */
  export type ListEnumunsubscribe_sourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'unsubscribe_source[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type tenantsWhereInput = {
    AND?: tenantsWhereInput | tenantsWhereInput[]
    OR?: tenantsWhereInput[]
    NOT?: tenantsWhereInput | tenantsWhereInput[]
    id?: UuidFilter<"tenants"> | string
    name?: StringFilter<"tenants"> | string
    created_at?: DateTimeFilter<"tenants"> | Date | string
    created_by?: StringFilter<"tenants"> | string
    updated_at?: DateTimeNullableFilter<"tenants"> | Date | string | null
    updated_by?: StringNullableFilter<"tenants"> | string | null
  }

  export type tenantsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
  }

  export type tenantsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: tenantsWhereInput | tenantsWhereInput[]
    OR?: tenantsWhereInput[]
    NOT?: tenantsWhereInput | tenantsWhereInput[]
    name?: StringFilter<"tenants"> | string
    created_at?: DateTimeFilter<"tenants"> | Date | string
    created_by?: StringFilter<"tenants"> | string
    updated_at?: DateTimeNullableFilter<"tenants"> | Date | string | null
    updated_by?: StringNullableFilter<"tenants"> | string | null
  }, "id">

  export type tenantsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    _count?: tenantsCountOrderByAggregateInput
    _max?: tenantsMaxOrderByAggregateInput
    _min?: tenantsMinOrderByAggregateInput
  }

  export type tenantsScalarWhereWithAggregatesInput = {
    AND?: tenantsScalarWhereWithAggregatesInput | tenantsScalarWhereWithAggregatesInput[]
    OR?: tenantsScalarWhereWithAggregatesInput[]
    NOT?: tenantsScalarWhereWithAggregatesInput | tenantsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"tenants"> | string
    name?: StringWithAggregatesFilter<"tenants"> | string
    created_at?: DateTimeWithAggregatesFilter<"tenants"> | Date | string
    created_by?: StringWithAggregatesFilter<"tenants"> | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"tenants"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"tenants"> | string | null
  }

  export type contactsWhereInput = {
    AND?: contactsWhereInput | contactsWhereInput[]
    OR?: contactsWhereInput[]
    NOT?: contactsWhereInput | contactsWhereInput[]
    id?: UuidFilter<"contacts"> | string
    tenant_id?: UuidFilter<"contacts"> | string
    email?: StringFilter<"contacts"> | string
    first_name?: StringNullableFilter<"contacts"> | string | null
    last_name?: StringNullableFilter<"contacts"> | string | null
    last_activity_at?: DateTimeNullableFilter<"contacts"> | Date | string | null
    subscriber_list_contacts_id?: UuidNullableFilter<"contacts"> | string | null
    created_at?: DateTimeFilter<"contacts"> | Date | string
    created_by?: StringFilter<"contacts"> | string
    updated_at?: DateTimeNullableFilter<"contacts"> | Date | string | null
    updated_by?: StringNullableFilter<"contacts"> | string | null
    list_ids?: StringNullableListFilter<"contacts">
    SubscriberListContacts?: XOR<Subscriber_list_contactsNullableScalarRelationFilter, subscriber_list_contactsWhereInput> | null
    activity?: ActivitiesListRelationFilter
    bounce?: BouncesListRelationFilter
    subscriber?: SubscribersListRelationFilter
    unsubscribe?: UnsubscribesListRelationFilter
  }

  export type contactsOrderByWithRelationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    email?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    last_activity_at?: SortOrderInput | SortOrder
    subscriber_list_contacts_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    list_ids?: SortOrder
    SubscriberListContacts?: subscriber_list_contactsOrderByWithRelationInput
    activity?: activitiesOrderByRelationAggregateInput
    bounce?: bouncesOrderByRelationAggregateInput
    subscriber?: subscribersOrderByRelationAggregateInput
    unsubscribe?: unsubscribesOrderByRelationAggregateInput
  }

  export type contactsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenant_id_email?: contactsTenant_idEmailCompoundUniqueInput
    AND?: contactsWhereInput | contactsWhereInput[]
    OR?: contactsWhereInput[]
    NOT?: contactsWhereInput | contactsWhereInput[]
    tenant_id?: UuidFilter<"contacts"> | string
    email?: StringFilter<"contacts"> | string
    first_name?: StringNullableFilter<"contacts"> | string | null
    last_name?: StringNullableFilter<"contacts"> | string | null
    last_activity_at?: DateTimeNullableFilter<"contacts"> | Date | string | null
    subscriber_list_contacts_id?: UuidNullableFilter<"contacts"> | string | null
    created_at?: DateTimeFilter<"contacts"> | Date | string
    created_by?: StringFilter<"contacts"> | string
    updated_at?: DateTimeNullableFilter<"contacts"> | Date | string | null
    updated_by?: StringNullableFilter<"contacts"> | string | null
    list_ids?: StringNullableListFilter<"contacts">
    SubscriberListContacts?: XOR<Subscriber_list_contactsNullableScalarRelationFilter, subscriber_list_contactsWhereInput> | null
    activity?: ActivitiesListRelationFilter
    bounce?: BouncesListRelationFilter
    subscriber?: SubscribersListRelationFilter
    unsubscribe?: UnsubscribesListRelationFilter
  }, "id" | "tenant_id_email">

  export type contactsOrderByWithAggregationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    email?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    last_activity_at?: SortOrderInput | SortOrder
    subscriber_list_contacts_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    list_ids?: SortOrder
    _count?: contactsCountOrderByAggregateInput
    _max?: contactsMaxOrderByAggregateInput
    _min?: contactsMinOrderByAggregateInput
  }

  export type contactsScalarWhereWithAggregatesInput = {
    AND?: contactsScalarWhereWithAggregatesInput | contactsScalarWhereWithAggregatesInput[]
    OR?: contactsScalarWhereWithAggregatesInput[]
    NOT?: contactsScalarWhereWithAggregatesInput | contactsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"contacts"> | string
    tenant_id?: UuidWithAggregatesFilter<"contacts"> | string
    email?: StringWithAggregatesFilter<"contacts"> | string
    first_name?: StringNullableWithAggregatesFilter<"contacts"> | string | null
    last_name?: StringNullableWithAggregatesFilter<"contacts"> | string | null
    last_activity_at?: DateTimeNullableWithAggregatesFilter<"contacts"> | Date | string | null
    subscriber_list_contacts_id?: UuidNullableWithAggregatesFilter<"contacts"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"contacts"> | Date | string
    created_by?: StringWithAggregatesFilter<"contacts"> | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"contacts"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"contacts"> | string | null
    list_ids?: StringNullableListFilter<"contacts">
  }

  export type campaignsWhereInput = {
    AND?: campaignsWhereInput | campaignsWhereInput[]
    OR?: campaignsWhereInput[]
    NOT?: campaignsWhereInput | campaignsWhereInput[]
    id?: UuidFilter<"campaigns"> | string
    tenant_id?: UuidFilter<"campaigns"> | string
    name?: StringFilter<"campaigns"> | string
    status?: Enumcampaign_statusFilter<"campaigns"> | $Enums.campaign_status
    type?: Enumcampaign_typeFilter<"campaigns"> | $Enums.campaign_type
    recipients?: IntFilter<"campaigns"> | number
    sent?: IntFilter<"campaigns"> | number
    delivered?: IntFilter<"campaigns"> | number
    created_at?: DateTimeFilter<"campaigns"> | Date | string
    created_by?: StringFilter<"campaigns"> | string
    updated_at?: DateTimeNullableFilter<"campaigns"> | Date | string | null
    updated_by?: StringNullableFilter<"campaigns"> | string | null
    activity?: ActivitiesListRelationFilter
  }

  export type campaignsOrderByWithRelationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    type?: SortOrder
    recipients?: SortOrder
    sent?: SortOrder
    delivered?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    activity?: activitiesOrderByRelationAggregateInput
  }

  export type campaignsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenant_id_name?: campaignsTenant_idNameCompoundUniqueInput
    AND?: campaignsWhereInput | campaignsWhereInput[]
    OR?: campaignsWhereInput[]
    NOT?: campaignsWhereInput | campaignsWhereInput[]
    tenant_id?: UuidFilter<"campaigns"> | string
    name?: StringFilter<"campaigns"> | string
    status?: Enumcampaign_statusFilter<"campaigns"> | $Enums.campaign_status
    type?: Enumcampaign_typeFilter<"campaigns"> | $Enums.campaign_type
    recipients?: IntFilter<"campaigns"> | number
    sent?: IntFilter<"campaigns"> | number
    delivered?: IntFilter<"campaigns"> | number
    created_at?: DateTimeFilter<"campaigns"> | Date | string
    created_by?: StringFilter<"campaigns"> | string
    updated_at?: DateTimeNullableFilter<"campaigns"> | Date | string | null
    updated_by?: StringNullableFilter<"campaigns"> | string | null
    activity?: ActivitiesListRelationFilter
  }, "id" | "tenant_id_name">

  export type campaignsOrderByWithAggregationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    type?: SortOrder
    recipients?: SortOrder
    sent?: SortOrder
    delivered?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    _count?: campaignsCountOrderByAggregateInput
    _avg?: campaignsAvgOrderByAggregateInput
    _max?: campaignsMaxOrderByAggregateInput
    _min?: campaignsMinOrderByAggregateInput
    _sum?: campaignsSumOrderByAggregateInput
  }

  export type campaignsScalarWhereWithAggregatesInput = {
    AND?: campaignsScalarWhereWithAggregatesInput | campaignsScalarWhereWithAggregatesInput[]
    OR?: campaignsScalarWhereWithAggregatesInput[]
    NOT?: campaignsScalarWhereWithAggregatesInput | campaignsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"campaigns"> | string
    tenant_id?: UuidWithAggregatesFilter<"campaigns"> | string
    name?: StringWithAggregatesFilter<"campaigns"> | string
    status?: Enumcampaign_statusWithAggregatesFilter<"campaigns"> | $Enums.campaign_status
    type?: Enumcampaign_typeWithAggregatesFilter<"campaigns"> | $Enums.campaign_type
    recipients?: IntWithAggregatesFilter<"campaigns"> | number
    sent?: IntWithAggregatesFilter<"campaigns"> | number
    delivered?: IntWithAggregatesFilter<"campaigns"> | number
    created_at?: DateTimeWithAggregatesFilter<"campaigns"> | Date | string
    created_by?: StringWithAggregatesFilter<"campaigns"> | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"campaigns"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"campaigns"> | string | null
  }

  export type activitiesWhereInput = {
    AND?: activitiesWhereInput | activitiesWhereInput[]
    OR?: activitiesWhereInput[]
    NOT?: activitiesWhereInput | activitiesWhereInput[]
    id?: UuidFilter<"activities"> | string
    tenant_id?: UuidFilter<"activities"> | string
    send_name?: StringFilter<"activities"> | string
    subject?: StringFilter<"activities"> | string
    status?: Enumactivity_statusFilter<"activities"> | $Enums.activity_status
    sent_at?: DateTimeFilter<"activities"> | Date | string
    last_event_received_at?: DateTimeFilter<"activities"> | Date | string
    last_event_type?: Enumevent_typeFilter<"activities"> | $Enums.event_type
    opens?: IntFilter<"activities"> | number
    clicks?: IntFilter<"activities"> | number
    campaign_id?: UuidNullableFilter<"activities"> | string | null
    contact_id?: UuidFilter<"activities"> | string
    created_at?: DateTimeFilter<"activities"> | Date | string
    created_by?: StringFilter<"activities"> | string
    updated_at?: DateTimeNullableFilter<"activities"> | Date | string | null
    updated_by?: StringNullableFilter<"activities"> | string | null
    receiver?: XOR<ContactsScalarRelationFilter, contactsWhereInput>
    campaign?: XOR<CampaignsNullableScalarRelationFilter, campaignsWhereInput> | null
  }

  export type activitiesOrderByWithRelationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    send_name?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    sent_at?: SortOrder
    last_event_received_at?: SortOrder
    last_event_type?: SortOrder
    opens?: SortOrder
    clicks?: SortOrder
    campaign_id?: SortOrderInput | SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    receiver?: contactsOrderByWithRelationInput
    campaign?: campaignsOrderByWithRelationInput
  }

  export type activitiesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: activitiesWhereInput | activitiesWhereInput[]
    OR?: activitiesWhereInput[]
    NOT?: activitiesWhereInput | activitiesWhereInput[]
    tenant_id?: UuidFilter<"activities"> | string
    send_name?: StringFilter<"activities"> | string
    subject?: StringFilter<"activities"> | string
    status?: Enumactivity_statusFilter<"activities"> | $Enums.activity_status
    sent_at?: DateTimeFilter<"activities"> | Date | string
    last_event_received_at?: DateTimeFilter<"activities"> | Date | string
    last_event_type?: Enumevent_typeFilter<"activities"> | $Enums.event_type
    opens?: IntFilter<"activities"> | number
    clicks?: IntFilter<"activities"> | number
    campaign_id?: UuidNullableFilter<"activities"> | string | null
    contact_id?: UuidFilter<"activities"> | string
    created_at?: DateTimeFilter<"activities"> | Date | string
    created_by?: StringFilter<"activities"> | string
    updated_at?: DateTimeNullableFilter<"activities"> | Date | string | null
    updated_by?: StringNullableFilter<"activities"> | string | null
    receiver?: XOR<ContactsScalarRelationFilter, contactsWhereInput>
    campaign?: XOR<CampaignsNullableScalarRelationFilter, campaignsWhereInput> | null
  }, "id">

  export type activitiesOrderByWithAggregationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    send_name?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    sent_at?: SortOrder
    last_event_received_at?: SortOrder
    last_event_type?: SortOrder
    opens?: SortOrder
    clicks?: SortOrder
    campaign_id?: SortOrderInput | SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    _count?: activitiesCountOrderByAggregateInput
    _avg?: activitiesAvgOrderByAggregateInput
    _max?: activitiesMaxOrderByAggregateInput
    _min?: activitiesMinOrderByAggregateInput
    _sum?: activitiesSumOrderByAggregateInput
  }

  export type activitiesScalarWhereWithAggregatesInput = {
    AND?: activitiesScalarWhereWithAggregatesInput | activitiesScalarWhereWithAggregatesInput[]
    OR?: activitiesScalarWhereWithAggregatesInput[]
    NOT?: activitiesScalarWhereWithAggregatesInput | activitiesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"activities"> | string
    tenant_id?: UuidWithAggregatesFilter<"activities"> | string
    send_name?: StringWithAggregatesFilter<"activities"> | string
    subject?: StringWithAggregatesFilter<"activities"> | string
    status?: Enumactivity_statusWithAggregatesFilter<"activities"> | $Enums.activity_status
    sent_at?: DateTimeWithAggregatesFilter<"activities"> | Date | string
    last_event_received_at?: DateTimeWithAggregatesFilter<"activities"> | Date | string
    last_event_type?: Enumevent_typeWithAggregatesFilter<"activities"> | $Enums.event_type
    opens?: IntWithAggregatesFilter<"activities"> | number
    clicks?: IntWithAggregatesFilter<"activities"> | number
    campaign_id?: UuidNullableWithAggregatesFilter<"activities"> | string | null
    contact_id?: UuidWithAggregatesFilter<"activities"> | string
    created_at?: DateTimeWithAggregatesFilter<"activities"> | Date | string
    created_by?: StringWithAggregatesFilter<"activities"> | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"activities"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"activities"> | string | null
  }

  export type bouncesWhereInput = {
    AND?: bouncesWhereInput | bouncesWhereInput[]
    OR?: bouncesWhereInput[]
    NOT?: bouncesWhereInput | bouncesWhereInput[]
    id?: UuidFilter<"bounces"> | string
    tenant_id?: UuidFilter<"bounces"> | string
    bounced_at?: DateTimeFilter<"bounces"> | Date | string
    reason?: StringFilter<"bounces"> | string
    bounce_type?: Enumbounce_typeFilter<"bounces"> | $Enums.bounce_type
    contact_id?: UuidFilter<"bounces"> | string
    created_at?: DateTimeFilter<"bounces"> | Date | string
    created_by?: StringFilter<"bounces"> | string
    updated_at?: DateTimeNullableFilter<"bounces"> | Date | string | null
    updated_by?: StringNullableFilter<"bounces"> | string | null
    contact?: XOR<ContactsScalarRelationFilter, contactsWhereInput>
  }

  export type bouncesOrderByWithRelationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    bounced_at?: SortOrder
    reason?: SortOrder
    bounce_type?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    contact?: contactsOrderByWithRelationInput
  }

  export type bouncesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenant_id_contact_id?: bouncesTenant_idContact_idCompoundUniqueInput
    AND?: bouncesWhereInput | bouncesWhereInput[]
    OR?: bouncesWhereInput[]
    NOT?: bouncesWhereInput | bouncesWhereInput[]
    tenant_id?: UuidFilter<"bounces"> | string
    bounced_at?: DateTimeFilter<"bounces"> | Date | string
    reason?: StringFilter<"bounces"> | string
    bounce_type?: Enumbounce_typeFilter<"bounces"> | $Enums.bounce_type
    contact_id?: UuidFilter<"bounces"> | string
    created_at?: DateTimeFilter<"bounces"> | Date | string
    created_by?: StringFilter<"bounces"> | string
    updated_at?: DateTimeNullableFilter<"bounces"> | Date | string | null
    updated_by?: StringNullableFilter<"bounces"> | string | null
    contact?: XOR<ContactsScalarRelationFilter, contactsWhereInput>
  }, "id" | "tenant_id_contact_id">

  export type bouncesOrderByWithAggregationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    bounced_at?: SortOrder
    reason?: SortOrder
    bounce_type?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    _count?: bouncesCountOrderByAggregateInput
    _max?: bouncesMaxOrderByAggregateInput
    _min?: bouncesMinOrderByAggregateInput
  }

  export type bouncesScalarWhereWithAggregatesInput = {
    AND?: bouncesScalarWhereWithAggregatesInput | bouncesScalarWhereWithAggregatesInput[]
    OR?: bouncesScalarWhereWithAggregatesInput[]
    NOT?: bouncesScalarWhereWithAggregatesInput | bouncesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"bounces"> | string
    tenant_id?: UuidWithAggregatesFilter<"bounces"> | string
    bounced_at?: DateTimeWithAggregatesFilter<"bounces"> | Date | string
    reason?: StringWithAggregatesFilter<"bounces"> | string
    bounce_type?: Enumbounce_typeWithAggregatesFilter<"bounces"> | $Enums.bounce_type
    contact_id?: UuidWithAggregatesFilter<"bounces"> | string
    created_at?: DateTimeWithAggregatesFilter<"bounces"> | Date | string
    created_by?: StringWithAggregatesFilter<"bounces"> | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"bounces"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"bounces"> | string | null
  }

  export type subscribersWhereInput = {
    AND?: subscribersWhereInput | subscribersWhereInput[]
    OR?: subscribersWhereInput[]
    NOT?: subscribersWhereInput | subscribersWhereInput[]
    id?: UuidFilter<"subscribers"> | string
    tenant_id?: UuidFilter<"subscribers"> | string
    status?: Enumsubscriber_statusFilter<"subscribers"> | $Enums.subscriber_status
    subscribed_at?: DateTimeFilter<"subscribers"> | Date | string
    contact_id?: UuidFilter<"subscribers"> | string
    created_at?: DateTimeFilter<"subscribers"> | Date | string
    created_by?: StringFilter<"subscribers"> | string
    updated_at?: DateTimeNullableFilter<"subscribers"> | Date | string | null
    updated_by?: StringNullableFilter<"subscribers"> | string | null
    contact?: XOR<ContactsScalarRelationFilter, contactsWhereInput>
  }

  export type subscribersOrderByWithRelationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    status?: SortOrder
    subscribed_at?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    contact?: contactsOrderByWithRelationInput
  }

  export type subscribersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenant_id_contact_id?: subscribersTenant_idContact_idCompoundUniqueInput
    AND?: subscribersWhereInput | subscribersWhereInput[]
    OR?: subscribersWhereInput[]
    NOT?: subscribersWhereInput | subscribersWhereInput[]
    tenant_id?: UuidFilter<"subscribers"> | string
    status?: Enumsubscriber_statusFilter<"subscribers"> | $Enums.subscriber_status
    subscribed_at?: DateTimeFilter<"subscribers"> | Date | string
    contact_id?: UuidFilter<"subscribers"> | string
    created_at?: DateTimeFilter<"subscribers"> | Date | string
    created_by?: StringFilter<"subscribers"> | string
    updated_at?: DateTimeNullableFilter<"subscribers"> | Date | string | null
    updated_by?: StringNullableFilter<"subscribers"> | string | null
    contact?: XOR<ContactsScalarRelationFilter, contactsWhereInput>
  }, "id" | "tenant_id_contact_id">

  export type subscribersOrderByWithAggregationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    status?: SortOrder
    subscribed_at?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    _count?: subscribersCountOrderByAggregateInput
    _max?: subscribersMaxOrderByAggregateInput
    _min?: subscribersMinOrderByAggregateInput
  }

  export type subscribersScalarWhereWithAggregatesInput = {
    AND?: subscribersScalarWhereWithAggregatesInput | subscribersScalarWhereWithAggregatesInput[]
    OR?: subscribersScalarWhereWithAggregatesInput[]
    NOT?: subscribersScalarWhereWithAggregatesInput | subscribersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"subscribers"> | string
    tenant_id?: UuidWithAggregatesFilter<"subscribers"> | string
    status?: Enumsubscriber_statusWithAggregatesFilter<"subscribers"> | $Enums.subscriber_status
    subscribed_at?: DateTimeWithAggregatesFilter<"subscribers"> | Date | string
    contact_id?: UuidWithAggregatesFilter<"subscribers"> | string
    created_at?: DateTimeWithAggregatesFilter<"subscribers"> | Date | string
    created_by?: StringWithAggregatesFilter<"subscribers"> | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"subscribers"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"subscribers"> | string | null
  }

  export type subscriber_listWhereInput = {
    AND?: subscriber_listWhereInput | subscriber_listWhereInput[]
    OR?: subscriber_listWhereInput[]
    NOT?: subscriber_listWhereInput | subscriber_listWhereInput[]
    id?: UuidFilter<"subscriber_list"> | string
    tenant_id?: UuidFilter<"subscriber_list"> | string
    name?: StringFilter<"subscriber_list"> | string
    description?: StringNullableFilter<"subscriber_list"> | string | null
    created_at?: DateTimeFilter<"subscriber_list"> | Date | string
    created_by?: StringFilter<"subscriber_list"> | string
    updated_at?: DateTimeNullableFilter<"subscriber_list"> | Date | string | null
    updated_by?: StringNullableFilter<"subscriber_list"> | string | null
    SubscriberListContacts?: Subscriber_list_contactsListRelationFilter
  }

  export type subscriber_listOrderByWithRelationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    SubscriberListContacts?: subscriber_list_contactsOrderByRelationAggregateInput
  }

  export type subscriber_listWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenant_id_name?: subscriber_listTenant_idNameCompoundUniqueInput
    AND?: subscriber_listWhereInput | subscriber_listWhereInput[]
    OR?: subscriber_listWhereInput[]
    NOT?: subscriber_listWhereInput | subscriber_listWhereInput[]
    tenant_id?: UuidFilter<"subscriber_list"> | string
    name?: StringFilter<"subscriber_list"> | string
    description?: StringNullableFilter<"subscriber_list"> | string | null
    created_at?: DateTimeFilter<"subscriber_list"> | Date | string
    created_by?: StringFilter<"subscriber_list"> | string
    updated_at?: DateTimeNullableFilter<"subscriber_list"> | Date | string | null
    updated_by?: StringNullableFilter<"subscriber_list"> | string | null
    SubscriberListContacts?: Subscriber_list_contactsListRelationFilter
  }, "id" | "tenant_id_name">

  export type subscriber_listOrderByWithAggregationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    _count?: subscriber_listCountOrderByAggregateInput
    _max?: subscriber_listMaxOrderByAggregateInput
    _min?: subscriber_listMinOrderByAggregateInput
  }

  export type subscriber_listScalarWhereWithAggregatesInput = {
    AND?: subscriber_listScalarWhereWithAggregatesInput | subscriber_listScalarWhereWithAggregatesInput[]
    OR?: subscriber_listScalarWhereWithAggregatesInput[]
    NOT?: subscriber_listScalarWhereWithAggregatesInput | subscriber_listScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"subscriber_list"> | string
    tenant_id?: UuidWithAggregatesFilter<"subscriber_list"> | string
    name?: StringWithAggregatesFilter<"subscriber_list"> | string
    description?: StringNullableWithAggregatesFilter<"subscriber_list"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"subscriber_list"> | Date | string
    created_by?: StringWithAggregatesFilter<"subscriber_list"> | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"subscriber_list"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"subscriber_list"> | string | null
  }

  export type subscriber_list_contactsWhereInput = {
    AND?: subscriber_list_contactsWhereInput | subscriber_list_contactsWhereInput[]
    OR?: subscriber_list_contactsWhereInput[]
    NOT?: subscriber_list_contactsWhereInput | subscriber_list_contactsWhereInput[]
    id?: UuidFilter<"subscriber_list_contacts"> | string
    tenant_id?: UuidFilter<"subscriber_list_contacts"> | string
    subscriber_list_id?: UuidFilter<"subscriber_list_contacts"> | string
    created_at?: DateTimeFilter<"subscriber_list_contacts"> | Date | string
    created_by?: StringFilter<"subscriber_list_contacts"> | string
    updated_at?: DateTimeNullableFilter<"subscriber_list_contacts"> | Date | string | null
    updated_by?: StringNullableFilter<"subscriber_list_contacts"> | string | null
    subscriberList?: XOR<Subscriber_listScalarRelationFilter, subscriber_listWhereInput>
    contacts?: ContactsListRelationFilter
  }

  export type subscriber_list_contactsOrderByWithRelationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    subscriber_list_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    subscriberList?: subscriber_listOrderByWithRelationInput
    contacts?: contactsOrderByRelationAggregateInput
  }

  export type subscriber_list_contactsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: subscriber_list_contactsWhereInput | subscriber_list_contactsWhereInput[]
    OR?: subscriber_list_contactsWhereInput[]
    NOT?: subscriber_list_contactsWhereInput | subscriber_list_contactsWhereInput[]
    tenant_id?: UuidFilter<"subscriber_list_contacts"> | string
    subscriber_list_id?: UuidFilter<"subscriber_list_contacts"> | string
    created_at?: DateTimeFilter<"subscriber_list_contacts"> | Date | string
    created_by?: StringFilter<"subscriber_list_contacts"> | string
    updated_at?: DateTimeNullableFilter<"subscriber_list_contacts"> | Date | string | null
    updated_by?: StringNullableFilter<"subscriber_list_contacts"> | string | null
    subscriberList?: XOR<Subscriber_listScalarRelationFilter, subscriber_listWhereInput>
    contacts?: ContactsListRelationFilter
  }, "id">

  export type subscriber_list_contactsOrderByWithAggregationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    subscriber_list_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    _count?: subscriber_list_contactsCountOrderByAggregateInput
    _max?: subscriber_list_contactsMaxOrderByAggregateInput
    _min?: subscriber_list_contactsMinOrderByAggregateInput
  }

  export type subscriber_list_contactsScalarWhereWithAggregatesInput = {
    AND?: subscriber_list_contactsScalarWhereWithAggregatesInput | subscriber_list_contactsScalarWhereWithAggregatesInput[]
    OR?: subscriber_list_contactsScalarWhereWithAggregatesInput[]
    NOT?: subscriber_list_contactsScalarWhereWithAggregatesInput | subscriber_list_contactsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"subscriber_list_contacts"> | string
    tenant_id?: UuidWithAggregatesFilter<"subscriber_list_contacts"> | string
    subscriber_list_id?: UuidWithAggregatesFilter<"subscriber_list_contacts"> | string
    created_at?: DateTimeWithAggregatesFilter<"subscriber_list_contacts"> | Date | string
    created_by?: StringWithAggregatesFilter<"subscriber_list_contacts"> | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"subscriber_list_contacts"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"subscriber_list_contacts"> | string | null
  }

  export type unsubscribesWhereInput = {
    AND?: unsubscribesWhereInput | unsubscribesWhereInput[]
    OR?: unsubscribesWhereInput[]
    NOT?: unsubscribesWhereInput | unsubscribesWhereInput[]
    id?: UuidFilter<"unsubscribes"> | string
    tenant_id?: UuidFilter<"unsubscribes"> | string
    source?: Enumunsubscribe_sourceFilter<"unsubscribes"> | $Enums.unsubscribe_source
    unsubscribed_at?: DateTimeFilter<"unsubscribes"> | Date | string
    global?: BoolFilter<"unsubscribes"> | boolean
    list_ids?: StringNullableListFilter<"unsubscribes">
    contact_id?: UuidFilter<"unsubscribes"> | string
    created_at?: DateTimeFilter<"unsubscribes"> | Date | string
    created_by?: StringFilter<"unsubscribes"> | string
    updated_at?: DateTimeNullableFilter<"unsubscribes"> | Date | string | null
    updated_by?: StringNullableFilter<"unsubscribes"> | string | null
    contact?: XOR<ContactsScalarRelationFilter, contactsWhereInput>
  }

  export type unsubscribesOrderByWithRelationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    source?: SortOrder
    unsubscribed_at?: SortOrder
    global?: SortOrder
    list_ids?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    contact?: contactsOrderByWithRelationInput
  }

  export type unsubscribesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenant_id_contact_id?: unsubscribesTenant_idContact_idCompoundUniqueInput
    AND?: unsubscribesWhereInput | unsubscribesWhereInput[]
    OR?: unsubscribesWhereInput[]
    NOT?: unsubscribesWhereInput | unsubscribesWhereInput[]
    tenant_id?: UuidFilter<"unsubscribes"> | string
    source?: Enumunsubscribe_sourceFilter<"unsubscribes"> | $Enums.unsubscribe_source
    unsubscribed_at?: DateTimeFilter<"unsubscribes"> | Date | string
    global?: BoolFilter<"unsubscribes"> | boolean
    list_ids?: StringNullableListFilter<"unsubscribes">
    contact_id?: UuidFilter<"unsubscribes"> | string
    created_at?: DateTimeFilter<"unsubscribes"> | Date | string
    created_by?: StringFilter<"unsubscribes"> | string
    updated_at?: DateTimeNullableFilter<"unsubscribes"> | Date | string | null
    updated_by?: StringNullableFilter<"unsubscribes"> | string | null
    contact?: XOR<ContactsScalarRelationFilter, contactsWhereInput>
  }, "id" | "tenant_id_contact_id">

  export type unsubscribesOrderByWithAggregationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    source?: SortOrder
    unsubscribed_at?: SortOrder
    global?: SortOrder
    list_ids?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    _count?: unsubscribesCountOrderByAggregateInput
    _max?: unsubscribesMaxOrderByAggregateInput
    _min?: unsubscribesMinOrderByAggregateInput
  }

  export type unsubscribesScalarWhereWithAggregatesInput = {
    AND?: unsubscribesScalarWhereWithAggregatesInput | unsubscribesScalarWhereWithAggregatesInput[]
    OR?: unsubscribesScalarWhereWithAggregatesInput[]
    NOT?: unsubscribesScalarWhereWithAggregatesInput | unsubscribesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"unsubscribes"> | string
    tenant_id?: UuidWithAggregatesFilter<"unsubscribes"> | string
    source?: Enumunsubscribe_sourceWithAggregatesFilter<"unsubscribes"> | $Enums.unsubscribe_source
    unsubscribed_at?: DateTimeWithAggregatesFilter<"unsubscribes"> | Date | string
    global?: BoolWithAggregatesFilter<"unsubscribes"> | boolean
    list_ids?: StringNullableListFilter<"unsubscribes">
    contact_id?: UuidWithAggregatesFilter<"unsubscribes"> | string
    created_at?: DateTimeWithAggregatesFilter<"unsubscribes"> | Date | string
    created_by?: StringWithAggregatesFilter<"unsubscribes"> | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"unsubscribes"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"unsubscribes"> | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: UuidFilter<"users"> | string
    tenant_id?: UuidFilter<"users"> | string
    email?: StringFilter<"users"> | string
    first_name?: StringNullableFilter<"users"> | string | null
    last_name?: StringNullableFilter<"users"> | string | null
    role?: StringFilter<"users"> | string
    is_active?: BoolFilter<"users"> | boolean
    last_login_at?: DateTimeNullableFilter<"users"> | Date | string | null
    permissions?: StringNullableListFilter<"users">
    created_at?: DateTimeFilter<"users"> | Date | string
    created_by?: StringFilter<"users"> | string
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_by?: StringNullableFilter<"users"> | string | null
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    email?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    role?: SortOrder
    is_active?: SortOrder
    last_login_at?: SortOrderInput | SortOrder
    permissions?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    tenant_id?: UuidFilter<"users"> | string
    email?: StringFilter<"users"> | string
    first_name?: StringNullableFilter<"users"> | string | null
    last_name?: StringNullableFilter<"users"> | string | null
    role?: StringFilter<"users"> | string
    is_active?: BoolFilter<"users"> | boolean
    last_login_at?: DateTimeNullableFilter<"users"> | Date | string | null
    permissions?: StringNullableListFilter<"users">
    created_at?: DateTimeFilter<"users"> | Date | string
    created_by?: StringFilter<"users"> | string
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_by?: StringNullableFilter<"users"> | string | null
  }, "id">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    email?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    role?: SortOrder
    is_active?: SortOrder
    last_login_at?: SortOrderInput | SortOrder
    permissions?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"users"> | string
    tenant_id?: UuidWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    first_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    last_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    role?: StringWithAggregatesFilter<"users"> | string
    is_active?: BoolWithAggregatesFilter<"users"> | boolean
    last_login_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    permissions?: StringNullableListFilter<"users">
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
    created_by?: StringWithAggregatesFilter<"users"> | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"users"> | string | null
  }

  export type api_keysWhereInput = {
    AND?: api_keysWhereInput | api_keysWhereInput[]
    OR?: api_keysWhereInput[]
    NOT?: api_keysWhereInput | api_keysWhereInput[]
    id?: UuidFilter<"api_keys"> | string
    tenant_id?: UuidFilter<"api_keys"> | string
    name?: StringFilter<"api_keys"> | string
    key?: StringFilter<"api_keys"> | string
    is_active?: BoolFilter<"api_keys"> | boolean
    last_used_at?: DateTimeNullableFilter<"api_keys"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"api_keys"> | Date | string | null
    permissions?: StringNullableListFilter<"api_keys">
    created_at?: DateTimeFilter<"api_keys"> | Date | string
    created_by?: StringFilter<"api_keys"> | string
    updated_at?: DateTimeNullableFilter<"api_keys"> | Date | string | null
    updated_by?: StringNullableFilter<"api_keys"> | string | null
  }

  export type api_keysOrderByWithRelationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    is_active?: SortOrder
    last_used_at?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    permissions?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
  }

  export type api_keysWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: api_keysWhereInput | api_keysWhereInput[]
    OR?: api_keysWhereInput[]
    NOT?: api_keysWhereInput | api_keysWhereInput[]
    tenant_id?: UuidFilter<"api_keys"> | string
    name?: StringFilter<"api_keys"> | string
    key?: StringFilter<"api_keys"> | string
    is_active?: BoolFilter<"api_keys"> | boolean
    last_used_at?: DateTimeNullableFilter<"api_keys"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"api_keys"> | Date | string | null
    permissions?: StringNullableListFilter<"api_keys">
    created_at?: DateTimeFilter<"api_keys"> | Date | string
    created_by?: StringFilter<"api_keys"> | string
    updated_at?: DateTimeNullableFilter<"api_keys"> | Date | string | null
    updated_by?: StringNullableFilter<"api_keys"> | string | null
  }, "id">

  export type api_keysOrderByWithAggregationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    is_active?: SortOrder
    last_used_at?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    permissions?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    _count?: api_keysCountOrderByAggregateInput
    _max?: api_keysMaxOrderByAggregateInput
    _min?: api_keysMinOrderByAggregateInput
  }

  export type api_keysScalarWhereWithAggregatesInput = {
    AND?: api_keysScalarWhereWithAggregatesInput | api_keysScalarWhereWithAggregatesInput[]
    OR?: api_keysScalarWhereWithAggregatesInput[]
    NOT?: api_keysScalarWhereWithAggregatesInput | api_keysScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"api_keys"> | string
    tenant_id?: UuidWithAggregatesFilter<"api_keys"> | string
    name?: StringWithAggregatesFilter<"api_keys"> | string
    key?: StringWithAggregatesFilter<"api_keys"> | string
    is_active?: BoolWithAggregatesFilter<"api_keys"> | boolean
    last_used_at?: DateTimeNullableWithAggregatesFilter<"api_keys"> | Date | string | null
    expires_at?: DateTimeNullableWithAggregatesFilter<"api_keys"> | Date | string | null
    permissions?: StringNullableListFilter<"api_keys">
    created_at?: DateTimeWithAggregatesFilter<"api_keys"> | Date | string
    created_by?: StringWithAggregatesFilter<"api_keys"> | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"api_keys"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"api_keys"> | string | null
  }

  export type template_propertiesWhereInput = {
    AND?: template_propertiesWhereInput | template_propertiesWhereInput[]
    OR?: template_propertiesWhereInput[]
    NOT?: template_propertiesWhereInput | template_propertiesWhereInput[]
    id?: UuidFilter<"template_properties"> | string
    tenant_id?: UuidFilter<"template_properties"> | string
    templates_id?: UuidNullableFilter<"template_properties"> | string | null
    name?: StringFilter<"template_properties"> | string
    type?: StringFilter<"template_properties"> | string
    default_value?: JsonFilter<"template_properties">
    templates?: XOR<TemplatesNullableScalarRelationFilter, templatesWhereInput> | null
  }

  export type template_propertiesOrderByWithRelationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    templates_id?: SortOrderInput | SortOrder
    name?: SortOrder
    type?: SortOrder
    default_value?: SortOrder
    templates?: templatesOrderByWithRelationInput
  }

  export type template_propertiesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: template_propertiesWhereInput | template_propertiesWhereInput[]
    OR?: template_propertiesWhereInput[]
    NOT?: template_propertiesWhereInput | template_propertiesWhereInput[]
    tenant_id?: UuidFilter<"template_properties"> | string
    templates_id?: UuidNullableFilter<"template_properties"> | string | null
    name?: StringFilter<"template_properties"> | string
    type?: StringFilter<"template_properties"> | string
    default_value?: JsonFilter<"template_properties">
    templates?: XOR<TemplatesNullableScalarRelationFilter, templatesWhereInput> | null
  }, "id">

  export type template_propertiesOrderByWithAggregationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    templates_id?: SortOrderInput | SortOrder
    name?: SortOrder
    type?: SortOrder
    default_value?: SortOrder
    _count?: template_propertiesCountOrderByAggregateInput
    _max?: template_propertiesMaxOrderByAggregateInput
    _min?: template_propertiesMinOrderByAggregateInput
  }

  export type template_propertiesScalarWhereWithAggregatesInput = {
    AND?: template_propertiesScalarWhereWithAggregatesInput | template_propertiesScalarWhereWithAggregatesInput[]
    OR?: template_propertiesScalarWhereWithAggregatesInput[]
    NOT?: template_propertiesScalarWhereWithAggregatesInput | template_propertiesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"template_properties"> | string
    tenant_id?: UuidWithAggregatesFilter<"template_properties"> | string
    templates_id?: UuidNullableWithAggregatesFilter<"template_properties"> | string | null
    name?: StringWithAggregatesFilter<"template_properties"> | string
    type?: StringWithAggregatesFilter<"template_properties"> | string
    default_value?: JsonWithAggregatesFilter<"template_properties">
  }

  export type templatesWhereInput = {
    AND?: templatesWhereInput | templatesWhereInput[]
    OR?: templatesWhereInput[]
    NOT?: templatesWhereInput | templatesWhereInput[]
    id?: UuidFilter<"templates"> | string
    tenant_id?: UuidFilter<"templates"> | string
    name?: StringFilter<"templates"> | string
    description?: StringNullableFilter<"templates"> | string | null
    content?: StringFilter<"templates"> | string
    created_at?: DateTimeFilter<"templates"> | Date | string
    created_by?: StringFilter<"templates"> | string
    updated_at?: DateTimeNullableFilter<"templates"> | Date | string | null
    updated_by?: StringNullableFilter<"templates"> | string | null
    properties?: Template_propertiesListRelationFilter
  }

  export type templatesOrderByWithRelationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    properties?: template_propertiesOrderByRelationAggregateInput
  }

  export type templatesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: templatesWhereInput | templatesWhereInput[]
    OR?: templatesWhereInput[]
    NOT?: templatesWhereInput | templatesWhereInput[]
    tenant_id?: UuidFilter<"templates"> | string
    name?: StringFilter<"templates"> | string
    description?: StringNullableFilter<"templates"> | string | null
    content?: StringFilter<"templates"> | string
    created_at?: DateTimeFilter<"templates"> | Date | string
    created_by?: StringFilter<"templates"> | string
    updated_at?: DateTimeNullableFilter<"templates"> | Date | string | null
    updated_by?: StringNullableFilter<"templates"> | string | null
    properties?: Template_propertiesListRelationFilter
  }, "id">

  export type templatesOrderByWithAggregationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    _count?: templatesCountOrderByAggregateInput
    _max?: templatesMaxOrderByAggregateInput
    _min?: templatesMinOrderByAggregateInput
  }

  export type templatesScalarWhereWithAggregatesInput = {
    AND?: templatesScalarWhereWithAggregatesInput | templatesScalarWhereWithAggregatesInput[]
    OR?: templatesScalarWhereWithAggregatesInput[]
    NOT?: templatesScalarWhereWithAggregatesInput | templatesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"templates"> | string
    tenant_id?: UuidWithAggregatesFilter<"templates"> | string
    name?: StringWithAggregatesFilter<"templates"> | string
    description?: StringNullableWithAggregatesFilter<"templates"> | string | null
    content?: StringWithAggregatesFilter<"templates"> | string
    created_at?: DateTimeWithAggregatesFilter<"templates"> | Date | string
    created_by?: StringWithAggregatesFilter<"templates"> | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"templates"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"templates"> | string | null
  }

  export type tenantsCreateInput = {
    id?: string
    name: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type tenantsUncheckedCreateInput = {
    id?: string
    name: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type tenantsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tenantsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tenantsCreateManyInput = {
    id?: string
    name: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type tenantsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tenantsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type contactsCreateInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
    SubscriberListContacts?: subscriber_list_contactsCreateNestedOneWithoutContactsInput
    activity?: activitiesCreateNestedManyWithoutReceiverInput
    bounce?: bouncesCreateNestedManyWithoutContactInput
    subscriber?: subscribersCreateNestedManyWithoutContactInput
    unsubscribe?: unsubscribesCreateNestedManyWithoutContactInput
  }

  export type contactsUncheckedCreateInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    subscriber_list_contacts_id?: string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
    activity?: activitiesUncheckedCreateNestedManyWithoutReceiverInput
    bounce?: bouncesUncheckedCreateNestedManyWithoutContactInput
    subscriber?: subscribersUncheckedCreateNestedManyWithoutContactInput
    unsubscribe?: unsubscribesUncheckedCreateNestedManyWithoutContactInput
  }

  export type contactsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
    SubscriberListContacts?: subscriber_list_contactsUpdateOneWithoutContactsNestedInput
    activity?: activitiesUpdateManyWithoutReceiverNestedInput
    bounce?: bouncesUpdateManyWithoutContactNestedInput
    subscriber?: subscribersUpdateManyWithoutContactNestedInput
    unsubscribe?: unsubscribesUpdateManyWithoutContactNestedInput
  }

  export type contactsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriber_list_contacts_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
    activity?: activitiesUncheckedUpdateManyWithoutReceiverNestedInput
    bounce?: bouncesUncheckedUpdateManyWithoutContactNestedInput
    subscriber?: subscribersUncheckedUpdateManyWithoutContactNestedInput
    unsubscribe?: unsubscribesUncheckedUpdateManyWithoutContactNestedInput
  }

  export type contactsCreateManyInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    subscriber_list_contacts_id?: string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
  }

  export type contactsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
  }

  export type contactsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriber_list_contacts_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
  }

  export type campaignsCreateInput = {
    id?: string
    tenant_id: string
    name: string
    status: $Enums.campaign_status
    type: $Enums.campaign_type
    recipients: number
    sent: number
    delivered: number
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    activity?: activitiesCreateNestedManyWithoutCampaignInput
  }

  export type campaignsUncheckedCreateInput = {
    id?: string
    tenant_id: string
    name: string
    status: $Enums.campaign_status
    type: $Enums.campaign_type
    recipients: number
    sent: number
    delivered: number
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    activity?: activitiesUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type campaignsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: Enumcampaign_statusFieldUpdateOperationsInput | $Enums.campaign_status
    type?: Enumcampaign_typeFieldUpdateOperationsInput | $Enums.campaign_type
    recipients?: IntFieldUpdateOperationsInput | number
    sent?: IntFieldUpdateOperationsInput | number
    delivered?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    activity?: activitiesUpdateManyWithoutCampaignNestedInput
  }

  export type campaignsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: Enumcampaign_statusFieldUpdateOperationsInput | $Enums.campaign_status
    type?: Enumcampaign_typeFieldUpdateOperationsInput | $Enums.campaign_type
    recipients?: IntFieldUpdateOperationsInput | number
    sent?: IntFieldUpdateOperationsInput | number
    delivered?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    activity?: activitiesUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type campaignsCreateManyInput = {
    id?: string
    tenant_id: string
    name: string
    status: $Enums.campaign_status
    type: $Enums.campaign_type
    recipients: number
    sent: number
    delivered: number
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type campaignsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: Enumcampaign_statusFieldUpdateOperationsInput | $Enums.campaign_status
    type?: Enumcampaign_typeFieldUpdateOperationsInput | $Enums.campaign_type
    recipients?: IntFieldUpdateOperationsInput | number
    sent?: IntFieldUpdateOperationsInput | number
    delivered?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type campaignsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: Enumcampaign_statusFieldUpdateOperationsInput | $Enums.campaign_status
    type?: Enumcampaign_typeFieldUpdateOperationsInput | $Enums.campaign_type
    recipients?: IntFieldUpdateOperationsInput | number
    sent?: IntFieldUpdateOperationsInput | number
    delivered?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activitiesCreateInput = {
    id?: string
    tenant_id: string
    send_name: string
    subject: string
    status: $Enums.activity_status
    sent_at: Date | string
    last_event_received_at: Date | string
    last_event_type: $Enums.event_type
    opens: number
    clicks: number
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    receiver: contactsCreateNestedOneWithoutActivityInput
    campaign?: campaignsCreateNestedOneWithoutActivityInput
  }

  export type activitiesUncheckedCreateInput = {
    id?: string
    tenant_id: string
    send_name: string
    subject: string
    status: $Enums.activity_status
    sent_at: Date | string
    last_event_received_at: Date | string
    last_event_type: $Enums.event_type
    opens: number
    clicks: number
    campaign_id?: string | null
    contact_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type activitiesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    send_name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: Enumactivity_statusFieldUpdateOperationsInput | $Enums.activity_status
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_type?: Enumevent_typeFieldUpdateOperationsInput | $Enums.event_type
    opens?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    receiver?: contactsUpdateOneRequiredWithoutActivityNestedInput
    campaign?: campaignsUpdateOneWithoutActivityNestedInput
  }

  export type activitiesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    send_name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: Enumactivity_statusFieldUpdateOperationsInput | $Enums.activity_status
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_type?: Enumevent_typeFieldUpdateOperationsInput | $Enums.event_type
    opens?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    campaign_id?: NullableStringFieldUpdateOperationsInput | string | null
    contact_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activitiesCreateManyInput = {
    id?: string
    tenant_id: string
    send_name: string
    subject: string
    status: $Enums.activity_status
    sent_at: Date | string
    last_event_received_at: Date | string
    last_event_type: $Enums.event_type
    opens: number
    clicks: number
    campaign_id?: string | null
    contact_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type activitiesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    send_name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: Enumactivity_statusFieldUpdateOperationsInput | $Enums.activity_status
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_type?: Enumevent_typeFieldUpdateOperationsInput | $Enums.event_type
    opens?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activitiesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    send_name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: Enumactivity_statusFieldUpdateOperationsInput | $Enums.activity_status
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_type?: Enumevent_typeFieldUpdateOperationsInput | $Enums.event_type
    opens?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    campaign_id?: NullableStringFieldUpdateOperationsInput | string | null
    contact_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bouncesCreateInput = {
    id?: string
    tenant_id: string
    bounced_at: Date | string
    reason: string
    bounce_type: $Enums.bounce_type
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    contact: contactsCreateNestedOneWithoutBounceInput
  }

  export type bouncesUncheckedCreateInput = {
    id?: string
    tenant_id: string
    bounced_at: Date | string
    reason: string
    bounce_type: $Enums.bounce_type
    contact_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type bouncesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    bounced_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bounce_type?: Enumbounce_typeFieldUpdateOperationsInput | $Enums.bounce_type
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: contactsUpdateOneRequiredWithoutBounceNestedInput
  }

  export type bouncesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    bounced_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bounce_type?: Enumbounce_typeFieldUpdateOperationsInput | $Enums.bounce_type
    contact_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bouncesCreateManyInput = {
    id?: string
    tenant_id: string
    bounced_at: Date | string
    reason: string
    bounce_type: $Enums.bounce_type
    contact_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type bouncesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    bounced_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bounce_type?: Enumbounce_typeFieldUpdateOperationsInput | $Enums.bounce_type
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bouncesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    bounced_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bounce_type?: Enumbounce_typeFieldUpdateOperationsInput | $Enums.bounce_type
    contact_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscribersCreateInput = {
    id?: string
    tenant_id: string
    status: $Enums.subscriber_status
    subscribed_at: Date | string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    contact: contactsCreateNestedOneWithoutSubscriberInput
  }

  export type subscribersUncheckedCreateInput = {
    id?: string
    tenant_id: string
    status: $Enums.subscriber_status
    subscribed_at: Date | string
    contact_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type subscribersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    status?: Enumsubscriber_statusFieldUpdateOperationsInput | $Enums.subscriber_status
    subscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: contactsUpdateOneRequiredWithoutSubscriberNestedInput
  }

  export type subscribersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    status?: Enumsubscriber_statusFieldUpdateOperationsInput | $Enums.subscriber_status
    subscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    contact_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscribersCreateManyInput = {
    id?: string
    tenant_id: string
    status: $Enums.subscriber_status
    subscribed_at: Date | string
    contact_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type subscribersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    status?: Enumsubscriber_statusFieldUpdateOperationsInput | $Enums.subscriber_status
    subscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscribersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    status?: Enumsubscriber_statusFieldUpdateOperationsInput | $Enums.subscriber_status
    subscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    contact_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscriber_listCreateInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    SubscriberListContacts?: subscriber_list_contactsCreateNestedManyWithoutSubscriberListInput
  }

  export type subscriber_listUncheckedCreateInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    SubscriberListContacts?: subscriber_list_contactsUncheckedCreateNestedManyWithoutSubscriberListInput
  }

  export type subscriber_listUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    SubscriberListContacts?: subscriber_list_contactsUpdateManyWithoutSubscriberListNestedInput
  }

  export type subscriber_listUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    SubscriberListContacts?: subscriber_list_contactsUncheckedUpdateManyWithoutSubscriberListNestedInput
  }

  export type subscriber_listCreateManyInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type subscriber_listUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscriber_listUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscriber_list_contactsCreateInput = {
    id?: string
    tenant_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    subscriberList: subscriber_listCreateNestedOneWithoutSubscriberListContactsInput
    contacts?: contactsCreateNestedManyWithoutSubscriberListContactsInput
  }

  export type subscriber_list_contactsUncheckedCreateInput = {
    id?: string
    tenant_id: string
    subscriber_list_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    contacts?: contactsUncheckedCreateNestedManyWithoutSubscriberListContactsInput
  }

  export type subscriber_list_contactsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    subscriberList?: subscriber_listUpdateOneRequiredWithoutSubscriberListContactsNestedInput
    contacts?: contactsUpdateManyWithoutSubscriberListContactsNestedInput
  }

  export type subscriber_list_contactsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    subscriber_list_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: contactsUncheckedUpdateManyWithoutSubscriberListContactsNestedInput
  }

  export type subscriber_list_contactsCreateManyInput = {
    id?: string
    tenant_id: string
    subscriber_list_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type subscriber_list_contactsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscriber_list_contactsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    subscriber_list_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type unsubscribesCreateInput = {
    id?: string
    tenant_id: string
    source: $Enums.unsubscribe_source
    unsubscribed_at: Date | string
    global: boolean
    list_ids?: unsubscribesCreatelist_idsInput | string[]
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    contact: contactsCreateNestedOneWithoutUnsubscribeInput
  }

  export type unsubscribesUncheckedCreateInput = {
    id?: string
    tenant_id: string
    source: $Enums.unsubscribe_source
    unsubscribed_at: Date | string
    global: boolean
    list_ids?: unsubscribesCreatelist_idsInput | string[]
    contact_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type unsubscribesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    source?: Enumunsubscribe_sourceFieldUpdateOperationsInput | $Enums.unsubscribe_source
    unsubscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    global?: BoolFieldUpdateOperationsInput | boolean
    list_ids?: unsubscribesUpdatelist_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: contactsUpdateOneRequiredWithoutUnsubscribeNestedInput
  }

  export type unsubscribesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    source?: Enumunsubscribe_sourceFieldUpdateOperationsInput | $Enums.unsubscribe_source
    unsubscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    global?: BoolFieldUpdateOperationsInput | boolean
    list_ids?: unsubscribesUpdatelist_idsInput | string[]
    contact_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type unsubscribesCreateManyInput = {
    id?: string
    tenant_id: string
    source: $Enums.unsubscribe_source
    unsubscribed_at: Date | string
    global: boolean
    list_ids?: unsubscribesCreatelist_idsInput | string[]
    contact_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type unsubscribesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    source?: Enumunsubscribe_sourceFieldUpdateOperationsInput | $Enums.unsubscribe_source
    unsubscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    global?: BoolFieldUpdateOperationsInput | boolean
    list_ids?: unsubscribesUpdatelist_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type unsubscribesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    source?: Enumunsubscribe_sourceFieldUpdateOperationsInput | $Enums.unsubscribe_source
    unsubscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    global?: BoolFieldUpdateOperationsInput | boolean
    list_ids?: unsubscribesUpdatelist_idsInput | string[]
    contact_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersCreateInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    role: string
    is_active: boolean
    last_login_at?: Date | string | null
    permissions?: usersCreatepermissionsInput | string[]
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type usersUncheckedCreateInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    role: string
    is_active: boolean
    last_login_at?: Date | string | null
    permissions?: usersCreatepermissionsInput | string[]
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: usersUpdatepermissionsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: usersUpdatepermissionsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersCreateManyInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    role: string
    is_active: boolean
    last_login_at?: Date | string | null
    permissions?: usersCreatepermissionsInput | string[]
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: usersUpdatepermissionsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: usersUpdatepermissionsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type api_keysCreateInput = {
    id?: string
    tenant_id: string
    name: string
    key: string
    is_active: boolean
    last_used_at?: Date | string | null
    expires_at?: Date | string | null
    permissions?: api_keysCreatepermissionsInput | string[]
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type api_keysUncheckedCreateInput = {
    id?: string
    tenant_id: string
    name: string
    key: string
    is_active: boolean
    last_used_at?: Date | string | null
    expires_at?: Date | string | null
    permissions?: api_keysCreatepermissionsInput | string[]
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type api_keysUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: api_keysUpdatepermissionsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type api_keysUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: api_keysUpdatepermissionsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type api_keysCreateManyInput = {
    id?: string
    tenant_id: string
    name: string
    key: string
    is_active: boolean
    last_used_at?: Date | string | null
    expires_at?: Date | string | null
    permissions?: api_keysCreatepermissionsInput | string[]
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type api_keysUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: api_keysUpdatepermissionsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type api_keysUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: api_keysUpdatepermissionsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type template_propertiesCreateInput = {
    id?: string
    tenant_id: string
    name: string
    type: string
    default_value: JsonNullValueInput | InputJsonValue
    templates?: templatesCreateNestedOneWithoutPropertiesInput
  }

  export type template_propertiesUncheckedCreateInput = {
    id?: string
    tenant_id: string
    templates_id?: string | null
    name: string
    type: string
    default_value: JsonNullValueInput | InputJsonValue
  }

  export type template_propertiesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    default_value?: JsonNullValueInput | InputJsonValue
    templates?: templatesUpdateOneWithoutPropertiesNestedInput
  }

  export type template_propertiesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    templates_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    default_value?: JsonNullValueInput | InputJsonValue
  }

  export type template_propertiesCreateManyInput = {
    id?: string
    tenant_id: string
    templates_id?: string | null
    name: string
    type: string
    default_value: JsonNullValueInput | InputJsonValue
  }

  export type template_propertiesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    default_value?: JsonNullValueInput | InputJsonValue
  }

  export type template_propertiesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    templates_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    default_value?: JsonNullValueInput | InputJsonValue
  }

  export type templatesCreateInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    content: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    properties?: template_propertiesCreateNestedManyWithoutTemplatesInput
  }

  export type templatesUncheckedCreateInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    content: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    properties?: template_propertiesUncheckedCreateNestedManyWithoutTemplatesInput
  }

  export type templatesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    properties?: template_propertiesUpdateManyWithoutTemplatesNestedInput
  }

  export type templatesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    properties?: template_propertiesUncheckedUpdateManyWithoutTemplatesNestedInput
  }

  export type templatesCreateManyInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    content: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type templatesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type templatesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type tenantsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type tenantsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type tenantsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type Subscriber_list_contactsNullableScalarRelationFilter = {
    is?: subscriber_list_contactsWhereInput | null
    isNot?: subscriber_list_contactsWhereInput | null
  }

  export type ActivitiesListRelationFilter = {
    every?: activitiesWhereInput
    some?: activitiesWhereInput
    none?: activitiesWhereInput
  }

  export type BouncesListRelationFilter = {
    every?: bouncesWhereInput
    some?: bouncesWhereInput
    none?: bouncesWhereInput
  }

  export type SubscribersListRelationFilter = {
    every?: subscribersWhereInput
    some?: subscribersWhereInput
    none?: subscribersWhereInput
  }

  export type UnsubscribesListRelationFilter = {
    every?: unsubscribesWhereInput
    some?: unsubscribesWhereInput
    none?: unsubscribesWhereInput
  }

  export type activitiesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type bouncesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type subscribersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type unsubscribesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type contactsTenant_idEmailCompoundUniqueInput = {
    tenant_id: string
    email: string
  }

  export type contactsCountOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    last_activity_at?: SortOrder
    subscriber_list_contacts_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
    list_ids?: SortOrder
  }

  export type contactsMaxOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    last_activity_at?: SortOrder
    subscriber_list_contacts_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type contactsMinOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    last_activity_at?: SortOrder
    subscriber_list_contacts_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type Enumcampaign_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.campaign_status | Enumcampaign_statusFieldRefInput<$PrismaModel>
    in?: $Enums.campaign_status[] | ListEnumcampaign_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.campaign_status[] | ListEnumcampaign_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumcampaign_statusFilter<$PrismaModel> | $Enums.campaign_status
  }

  export type Enumcampaign_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.campaign_type | Enumcampaign_typeFieldRefInput<$PrismaModel>
    in?: $Enums.campaign_type[] | ListEnumcampaign_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.campaign_type[] | ListEnumcampaign_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumcampaign_typeFilter<$PrismaModel> | $Enums.campaign_type
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type campaignsTenant_idNameCompoundUniqueInput = {
    tenant_id: string
    name: string
  }

  export type campaignsCountOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    type?: SortOrder
    recipients?: SortOrder
    sent?: SortOrder
    delivered?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type campaignsAvgOrderByAggregateInput = {
    recipients?: SortOrder
    sent?: SortOrder
    delivered?: SortOrder
  }

  export type campaignsMaxOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    type?: SortOrder
    recipients?: SortOrder
    sent?: SortOrder
    delivered?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type campaignsMinOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    type?: SortOrder
    recipients?: SortOrder
    sent?: SortOrder
    delivered?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type campaignsSumOrderByAggregateInput = {
    recipients?: SortOrder
    sent?: SortOrder
    delivered?: SortOrder
  }

  export type Enumcampaign_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.campaign_status | Enumcampaign_statusFieldRefInput<$PrismaModel>
    in?: $Enums.campaign_status[] | ListEnumcampaign_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.campaign_status[] | ListEnumcampaign_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumcampaign_statusWithAggregatesFilter<$PrismaModel> | $Enums.campaign_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumcampaign_statusFilter<$PrismaModel>
    _max?: NestedEnumcampaign_statusFilter<$PrismaModel>
  }

  export type Enumcampaign_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.campaign_type | Enumcampaign_typeFieldRefInput<$PrismaModel>
    in?: $Enums.campaign_type[] | ListEnumcampaign_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.campaign_type[] | ListEnumcampaign_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumcampaign_typeWithAggregatesFilter<$PrismaModel> | $Enums.campaign_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumcampaign_typeFilter<$PrismaModel>
    _max?: NestedEnumcampaign_typeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type Enumactivity_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.activity_status | Enumactivity_statusFieldRefInput<$PrismaModel>
    in?: $Enums.activity_status[] | ListEnumactivity_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.activity_status[] | ListEnumactivity_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumactivity_statusFilter<$PrismaModel> | $Enums.activity_status
  }

  export type Enumevent_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.event_type | Enumevent_typeFieldRefInput<$PrismaModel>
    in?: $Enums.event_type[] | ListEnumevent_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.event_type[] | ListEnumevent_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumevent_typeFilter<$PrismaModel> | $Enums.event_type
  }

  export type ContactsScalarRelationFilter = {
    is?: contactsWhereInput
    isNot?: contactsWhereInput
  }

  export type CampaignsNullableScalarRelationFilter = {
    is?: campaignsWhereInput | null
    isNot?: campaignsWhereInput | null
  }

  export type activitiesCountOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    send_name?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    sent_at?: SortOrder
    last_event_received_at?: SortOrder
    last_event_type?: SortOrder
    opens?: SortOrder
    clicks?: SortOrder
    campaign_id?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type activitiesAvgOrderByAggregateInput = {
    opens?: SortOrder
    clicks?: SortOrder
  }

  export type activitiesMaxOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    send_name?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    sent_at?: SortOrder
    last_event_received_at?: SortOrder
    last_event_type?: SortOrder
    opens?: SortOrder
    clicks?: SortOrder
    campaign_id?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type activitiesMinOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    send_name?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    sent_at?: SortOrder
    last_event_received_at?: SortOrder
    last_event_type?: SortOrder
    opens?: SortOrder
    clicks?: SortOrder
    campaign_id?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type activitiesSumOrderByAggregateInput = {
    opens?: SortOrder
    clicks?: SortOrder
  }

  export type Enumactivity_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.activity_status | Enumactivity_statusFieldRefInput<$PrismaModel>
    in?: $Enums.activity_status[] | ListEnumactivity_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.activity_status[] | ListEnumactivity_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumactivity_statusWithAggregatesFilter<$PrismaModel> | $Enums.activity_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumactivity_statusFilter<$PrismaModel>
    _max?: NestedEnumactivity_statusFilter<$PrismaModel>
  }

  export type Enumevent_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.event_type | Enumevent_typeFieldRefInput<$PrismaModel>
    in?: $Enums.event_type[] | ListEnumevent_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.event_type[] | ListEnumevent_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumevent_typeWithAggregatesFilter<$PrismaModel> | $Enums.event_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumevent_typeFilter<$PrismaModel>
    _max?: NestedEnumevent_typeFilter<$PrismaModel>
  }

  export type Enumbounce_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.bounce_type | Enumbounce_typeFieldRefInput<$PrismaModel>
    in?: $Enums.bounce_type[] | ListEnumbounce_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.bounce_type[] | ListEnumbounce_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumbounce_typeFilter<$PrismaModel> | $Enums.bounce_type
  }

  export type bouncesTenant_idContact_idCompoundUniqueInput = {
    tenant_id: string
    contact_id: string
  }

  export type bouncesCountOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    bounced_at?: SortOrder
    reason?: SortOrder
    bounce_type?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type bouncesMaxOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    bounced_at?: SortOrder
    reason?: SortOrder
    bounce_type?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type bouncesMinOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    bounced_at?: SortOrder
    reason?: SortOrder
    bounce_type?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type Enumbounce_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.bounce_type | Enumbounce_typeFieldRefInput<$PrismaModel>
    in?: $Enums.bounce_type[] | ListEnumbounce_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.bounce_type[] | ListEnumbounce_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumbounce_typeWithAggregatesFilter<$PrismaModel> | $Enums.bounce_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumbounce_typeFilter<$PrismaModel>
    _max?: NestedEnumbounce_typeFilter<$PrismaModel>
  }

  export type Enumsubscriber_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.subscriber_status | Enumsubscriber_statusFieldRefInput<$PrismaModel>
    in?: $Enums.subscriber_status[] | ListEnumsubscriber_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.subscriber_status[] | ListEnumsubscriber_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumsubscriber_statusFilter<$PrismaModel> | $Enums.subscriber_status
  }

  export type subscribersTenant_idContact_idCompoundUniqueInput = {
    tenant_id: string
    contact_id: string
  }

  export type subscribersCountOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    status?: SortOrder
    subscribed_at?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type subscribersMaxOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    status?: SortOrder
    subscribed_at?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type subscribersMinOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    status?: SortOrder
    subscribed_at?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type Enumsubscriber_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.subscriber_status | Enumsubscriber_statusFieldRefInput<$PrismaModel>
    in?: $Enums.subscriber_status[] | ListEnumsubscriber_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.subscriber_status[] | ListEnumsubscriber_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumsubscriber_statusWithAggregatesFilter<$PrismaModel> | $Enums.subscriber_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumsubscriber_statusFilter<$PrismaModel>
    _max?: NestedEnumsubscriber_statusFilter<$PrismaModel>
  }

  export type Subscriber_list_contactsListRelationFilter = {
    every?: subscriber_list_contactsWhereInput
    some?: subscriber_list_contactsWhereInput
    none?: subscriber_list_contactsWhereInput
  }

  export type subscriber_list_contactsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type subscriber_listTenant_idNameCompoundUniqueInput = {
    tenant_id: string
    name: string
  }

  export type subscriber_listCountOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type subscriber_listMaxOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type subscriber_listMinOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type Subscriber_listScalarRelationFilter = {
    is?: subscriber_listWhereInput
    isNot?: subscriber_listWhereInput
  }

  export type ContactsListRelationFilter = {
    every?: contactsWhereInput
    some?: contactsWhereInput
    none?: contactsWhereInput
  }

  export type contactsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type subscriber_list_contactsCountOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    subscriber_list_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type subscriber_list_contactsMaxOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    subscriber_list_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type subscriber_list_contactsMinOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    subscriber_list_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type Enumunsubscribe_sourceFilter<$PrismaModel = never> = {
    equals?: $Enums.unsubscribe_source | Enumunsubscribe_sourceFieldRefInput<$PrismaModel>
    in?: $Enums.unsubscribe_source[] | ListEnumunsubscribe_sourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.unsubscribe_source[] | ListEnumunsubscribe_sourceFieldRefInput<$PrismaModel>
    not?: NestedEnumunsubscribe_sourceFilter<$PrismaModel> | $Enums.unsubscribe_source
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type unsubscribesTenant_idContact_idCompoundUniqueInput = {
    tenant_id: string
    contact_id: string
  }

  export type unsubscribesCountOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    source?: SortOrder
    unsubscribed_at?: SortOrder
    global?: SortOrder
    list_ids?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type unsubscribesMaxOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    source?: SortOrder
    unsubscribed_at?: SortOrder
    global?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type unsubscribesMinOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    source?: SortOrder
    unsubscribed_at?: SortOrder
    global?: SortOrder
    contact_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type Enumunsubscribe_sourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.unsubscribe_source | Enumunsubscribe_sourceFieldRefInput<$PrismaModel>
    in?: $Enums.unsubscribe_source[] | ListEnumunsubscribe_sourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.unsubscribe_source[] | ListEnumunsubscribe_sourceFieldRefInput<$PrismaModel>
    not?: NestedEnumunsubscribe_sourceWithAggregatesFilter<$PrismaModel> | $Enums.unsubscribe_source
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumunsubscribe_sourceFilter<$PrismaModel>
    _max?: NestedEnumunsubscribe_sourceFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    role?: SortOrder
    is_active?: SortOrder
    last_login_at?: SortOrder
    permissions?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    role?: SortOrder
    is_active?: SortOrder
    last_login_at?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    role?: SortOrder
    is_active?: SortOrder
    last_login_at?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type api_keysCountOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    is_active?: SortOrder
    last_used_at?: SortOrder
    expires_at?: SortOrder
    permissions?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type api_keysMaxOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    is_active?: SortOrder
    last_used_at?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type api_keysMinOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    is_active?: SortOrder
    last_used_at?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TemplatesNullableScalarRelationFilter = {
    is?: templatesWhereInput | null
    isNot?: templatesWhereInput | null
  }

  export type template_propertiesCountOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    templates_id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    default_value?: SortOrder
  }

  export type template_propertiesMaxOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    templates_id?: SortOrder
    name?: SortOrder
    type?: SortOrder
  }

  export type template_propertiesMinOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    templates_id?: SortOrder
    name?: SortOrder
    type?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type Template_propertiesListRelationFilter = {
    every?: template_propertiesWhereInput
    some?: template_propertiesWhereInput
    none?: template_propertiesWhereInput
  }

  export type template_propertiesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type templatesCountOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type templatesMaxOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type templatesMinOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type contactsCreatelist_idsInput = {
    set: string[]
  }

  export type subscriber_list_contactsCreateNestedOneWithoutContactsInput = {
    create?: XOR<subscriber_list_contactsCreateWithoutContactsInput, subscriber_list_contactsUncheckedCreateWithoutContactsInput>
    connectOrCreate?: subscriber_list_contactsCreateOrConnectWithoutContactsInput
    connect?: subscriber_list_contactsWhereUniqueInput
  }

  export type activitiesCreateNestedManyWithoutReceiverInput = {
    create?: XOR<activitiesCreateWithoutReceiverInput, activitiesUncheckedCreateWithoutReceiverInput> | activitiesCreateWithoutReceiverInput[] | activitiesUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: activitiesCreateOrConnectWithoutReceiverInput | activitiesCreateOrConnectWithoutReceiverInput[]
    createMany?: activitiesCreateManyReceiverInputEnvelope
    connect?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
  }

  export type bouncesCreateNestedManyWithoutContactInput = {
    create?: XOR<bouncesCreateWithoutContactInput, bouncesUncheckedCreateWithoutContactInput> | bouncesCreateWithoutContactInput[] | bouncesUncheckedCreateWithoutContactInput[]
    connectOrCreate?: bouncesCreateOrConnectWithoutContactInput | bouncesCreateOrConnectWithoutContactInput[]
    createMany?: bouncesCreateManyContactInputEnvelope
    connect?: bouncesWhereUniqueInput | bouncesWhereUniqueInput[]
  }

  export type subscribersCreateNestedManyWithoutContactInput = {
    create?: XOR<subscribersCreateWithoutContactInput, subscribersUncheckedCreateWithoutContactInput> | subscribersCreateWithoutContactInput[] | subscribersUncheckedCreateWithoutContactInput[]
    connectOrCreate?: subscribersCreateOrConnectWithoutContactInput | subscribersCreateOrConnectWithoutContactInput[]
    createMany?: subscribersCreateManyContactInputEnvelope
    connect?: subscribersWhereUniqueInput | subscribersWhereUniqueInput[]
  }

  export type unsubscribesCreateNestedManyWithoutContactInput = {
    create?: XOR<unsubscribesCreateWithoutContactInput, unsubscribesUncheckedCreateWithoutContactInput> | unsubscribesCreateWithoutContactInput[] | unsubscribesUncheckedCreateWithoutContactInput[]
    connectOrCreate?: unsubscribesCreateOrConnectWithoutContactInput | unsubscribesCreateOrConnectWithoutContactInput[]
    createMany?: unsubscribesCreateManyContactInputEnvelope
    connect?: unsubscribesWhereUniqueInput | unsubscribesWhereUniqueInput[]
  }

  export type activitiesUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<activitiesCreateWithoutReceiverInput, activitiesUncheckedCreateWithoutReceiverInput> | activitiesCreateWithoutReceiverInput[] | activitiesUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: activitiesCreateOrConnectWithoutReceiverInput | activitiesCreateOrConnectWithoutReceiverInput[]
    createMany?: activitiesCreateManyReceiverInputEnvelope
    connect?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
  }

  export type bouncesUncheckedCreateNestedManyWithoutContactInput = {
    create?: XOR<bouncesCreateWithoutContactInput, bouncesUncheckedCreateWithoutContactInput> | bouncesCreateWithoutContactInput[] | bouncesUncheckedCreateWithoutContactInput[]
    connectOrCreate?: bouncesCreateOrConnectWithoutContactInput | bouncesCreateOrConnectWithoutContactInput[]
    createMany?: bouncesCreateManyContactInputEnvelope
    connect?: bouncesWhereUniqueInput | bouncesWhereUniqueInput[]
  }

  export type subscribersUncheckedCreateNestedManyWithoutContactInput = {
    create?: XOR<subscribersCreateWithoutContactInput, subscribersUncheckedCreateWithoutContactInput> | subscribersCreateWithoutContactInput[] | subscribersUncheckedCreateWithoutContactInput[]
    connectOrCreate?: subscribersCreateOrConnectWithoutContactInput | subscribersCreateOrConnectWithoutContactInput[]
    createMany?: subscribersCreateManyContactInputEnvelope
    connect?: subscribersWhereUniqueInput | subscribersWhereUniqueInput[]
  }

  export type unsubscribesUncheckedCreateNestedManyWithoutContactInput = {
    create?: XOR<unsubscribesCreateWithoutContactInput, unsubscribesUncheckedCreateWithoutContactInput> | unsubscribesCreateWithoutContactInput[] | unsubscribesUncheckedCreateWithoutContactInput[]
    connectOrCreate?: unsubscribesCreateOrConnectWithoutContactInput | unsubscribesCreateOrConnectWithoutContactInput[]
    createMany?: unsubscribesCreateManyContactInputEnvelope
    connect?: unsubscribesWhereUniqueInput | unsubscribesWhereUniqueInput[]
  }

  export type contactsUpdatelist_idsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type subscriber_list_contactsUpdateOneWithoutContactsNestedInput = {
    create?: XOR<subscriber_list_contactsCreateWithoutContactsInput, subscriber_list_contactsUncheckedCreateWithoutContactsInput>
    connectOrCreate?: subscriber_list_contactsCreateOrConnectWithoutContactsInput
    upsert?: subscriber_list_contactsUpsertWithoutContactsInput
    disconnect?: subscriber_list_contactsWhereInput | boolean
    delete?: subscriber_list_contactsWhereInput | boolean
    connect?: subscriber_list_contactsWhereUniqueInput
    update?: XOR<XOR<subscriber_list_contactsUpdateToOneWithWhereWithoutContactsInput, subscriber_list_contactsUpdateWithoutContactsInput>, subscriber_list_contactsUncheckedUpdateWithoutContactsInput>
  }

  export type activitiesUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<activitiesCreateWithoutReceiverInput, activitiesUncheckedCreateWithoutReceiverInput> | activitiesCreateWithoutReceiverInput[] | activitiesUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: activitiesCreateOrConnectWithoutReceiverInput | activitiesCreateOrConnectWithoutReceiverInput[]
    upsert?: activitiesUpsertWithWhereUniqueWithoutReceiverInput | activitiesUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: activitiesCreateManyReceiverInputEnvelope
    set?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    disconnect?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    delete?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    connect?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    update?: activitiesUpdateWithWhereUniqueWithoutReceiverInput | activitiesUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: activitiesUpdateManyWithWhereWithoutReceiverInput | activitiesUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: activitiesScalarWhereInput | activitiesScalarWhereInput[]
  }

  export type bouncesUpdateManyWithoutContactNestedInput = {
    create?: XOR<bouncesCreateWithoutContactInput, bouncesUncheckedCreateWithoutContactInput> | bouncesCreateWithoutContactInput[] | bouncesUncheckedCreateWithoutContactInput[]
    connectOrCreate?: bouncesCreateOrConnectWithoutContactInput | bouncesCreateOrConnectWithoutContactInput[]
    upsert?: bouncesUpsertWithWhereUniqueWithoutContactInput | bouncesUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: bouncesCreateManyContactInputEnvelope
    set?: bouncesWhereUniqueInput | bouncesWhereUniqueInput[]
    disconnect?: bouncesWhereUniqueInput | bouncesWhereUniqueInput[]
    delete?: bouncesWhereUniqueInput | bouncesWhereUniqueInput[]
    connect?: bouncesWhereUniqueInput | bouncesWhereUniqueInput[]
    update?: bouncesUpdateWithWhereUniqueWithoutContactInput | bouncesUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: bouncesUpdateManyWithWhereWithoutContactInput | bouncesUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: bouncesScalarWhereInput | bouncesScalarWhereInput[]
  }

  export type subscribersUpdateManyWithoutContactNestedInput = {
    create?: XOR<subscribersCreateWithoutContactInput, subscribersUncheckedCreateWithoutContactInput> | subscribersCreateWithoutContactInput[] | subscribersUncheckedCreateWithoutContactInput[]
    connectOrCreate?: subscribersCreateOrConnectWithoutContactInput | subscribersCreateOrConnectWithoutContactInput[]
    upsert?: subscribersUpsertWithWhereUniqueWithoutContactInput | subscribersUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: subscribersCreateManyContactInputEnvelope
    set?: subscribersWhereUniqueInput | subscribersWhereUniqueInput[]
    disconnect?: subscribersWhereUniqueInput | subscribersWhereUniqueInput[]
    delete?: subscribersWhereUniqueInput | subscribersWhereUniqueInput[]
    connect?: subscribersWhereUniqueInput | subscribersWhereUniqueInput[]
    update?: subscribersUpdateWithWhereUniqueWithoutContactInput | subscribersUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: subscribersUpdateManyWithWhereWithoutContactInput | subscribersUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: subscribersScalarWhereInput | subscribersScalarWhereInput[]
  }

  export type unsubscribesUpdateManyWithoutContactNestedInput = {
    create?: XOR<unsubscribesCreateWithoutContactInput, unsubscribesUncheckedCreateWithoutContactInput> | unsubscribesCreateWithoutContactInput[] | unsubscribesUncheckedCreateWithoutContactInput[]
    connectOrCreate?: unsubscribesCreateOrConnectWithoutContactInput | unsubscribesCreateOrConnectWithoutContactInput[]
    upsert?: unsubscribesUpsertWithWhereUniqueWithoutContactInput | unsubscribesUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: unsubscribesCreateManyContactInputEnvelope
    set?: unsubscribesWhereUniqueInput | unsubscribesWhereUniqueInput[]
    disconnect?: unsubscribesWhereUniqueInput | unsubscribesWhereUniqueInput[]
    delete?: unsubscribesWhereUniqueInput | unsubscribesWhereUniqueInput[]
    connect?: unsubscribesWhereUniqueInput | unsubscribesWhereUniqueInput[]
    update?: unsubscribesUpdateWithWhereUniqueWithoutContactInput | unsubscribesUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: unsubscribesUpdateManyWithWhereWithoutContactInput | unsubscribesUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: unsubscribesScalarWhereInput | unsubscribesScalarWhereInput[]
  }

  export type activitiesUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<activitiesCreateWithoutReceiverInput, activitiesUncheckedCreateWithoutReceiverInput> | activitiesCreateWithoutReceiverInput[] | activitiesUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: activitiesCreateOrConnectWithoutReceiverInput | activitiesCreateOrConnectWithoutReceiverInput[]
    upsert?: activitiesUpsertWithWhereUniqueWithoutReceiverInput | activitiesUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: activitiesCreateManyReceiverInputEnvelope
    set?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    disconnect?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    delete?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    connect?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    update?: activitiesUpdateWithWhereUniqueWithoutReceiverInput | activitiesUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: activitiesUpdateManyWithWhereWithoutReceiverInput | activitiesUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: activitiesScalarWhereInput | activitiesScalarWhereInput[]
  }

  export type bouncesUncheckedUpdateManyWithoutContactNestedInput = {
    create?: XOR<bouncesCreateWithoutContactInput, bouncesUncheckedCreateWithoutContactInput> | bouncesCreateWithoutContactInput[] | bouncesUncheckedCreateWithoutContactInput[]
    connectOrCreate?: bouncesCreateOrConnectWithoutContactInput | bouncesCreateOrConnectWithoutContactInput[]
    upsert?: bouncesUpsertWithWhereUniqueWithoutContactInput | bouncesUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: bouncesCreateManyContactInputEnvelope
    set?: bouncesWhereUniqueInput | bouncesWhereUniqueInput[]
    disconnect?: bouncesWhereUniqueInput | bouncesWhereUniqueInput[]
    delete?: bouncesWhereUniqueInput | bouncesWhereUniqueInput[]
    connect?: bouncesWhereUniqueInput | bouncesWhereUniqueInput[]
    update?: bouncesUpdateWithWhereUniqueWithoutContactInput | bouncesUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: bouncesUpdateManyWithWhereWithoutContactInput | bouncesUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: bouncesScalarWhereInput | bouncesScalarWhereInput[]
  }

  export type subscribersUncheckedUpdateManyWithoutContactNestedInput = {
    create?: XOR<subscribersCreateWithoutContactInput, subscribersUncheckedCreateWithoutContactInput> | subscribersCreateWithoutContactInput[] | subscribersUncheckedCreateWithoutContactInput[]
    connectOrCreate?: subscribersCreateOrConnectWithoutContactInput | subscribersCreateOrConnectWithoutContactInput[]
    upsert?: subscribersUpsertWithWhereUniqueWithoutContactInput | subscribersUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: subscribersCreateManyContactInputEnvelope
    set?: subscribersWhereUniqueInput | subscribersWhereUniqueInput[]
    disconnect?: subscribersWhereUniqueInput | subscribersWhereUniqueInput[]
    delete?: subscribersWhereUniqueInput | subscribersWhereUniqueInput[]
    connect?: subscribersWhereUniqueInput | subscribersWhereUniqueInput[]
    update?: subscribersUpdateWithWhereUniqueWithoutContactInput | subscribersUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: subscribersUpdateManyWithWhereWithoutContactInput | subscribersUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: subscribersScalarWhereInput | subscribersScalarWhereInput[]
  }

  export type unsubscribesUncheckedUpdateManyWithoutContactNestedInput = {
    create?: XOR<unsubscribesCreateWithoutContactInput, unsubscribesUncheckedCreateWithoutContactInput> | unsubscribesCreateWithoutContactInput[] | unsubscribesUncheckedCreateWithoutContactInput[]
    connectOrCreate?: unsubscribesCreateOrConnectWithoutContactInput | unsubscribesCreateOrConnectWithoutContactInput[]
    upsert?: unsubscribesUpsertWithWhereUniqueWithoutContactInput | unsubscribesUpsertWithWhereUniqueWithoutContactInput[]
    createMany?: unsubscribesCreateManyContactInputEnvelope
    set?: unsubscribesWhereUniqueInput | unsubscribesWhereUniqueInput[]
    disconnect?: unsubscribesWhereUniqueInput | unsubscribesWhereUniqueInput[]
    delete?: unsubscribesWhereUniqueInput | unsubscribesWhereUniqueInput[]
    connect?: unsubscribesWhereUniqueInput | unsubscribesWhereUniqueInput[]
    update?: unsubscribesUpdateWithWhereUniqueWithoutContactInput | unsubscribesUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: unsubscribesUpdateManyWithWhereWithoutContactInput | unsubscribesUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: unsubscribesScalarWhereInput | unsubscribesScalarWhereInput[]
  }

  export type activitiesCreateNestedManyWithoutCampaignInput = {
    create?: XOR<activitiesCreateWithoutCampaignInput, activitiesUncheckedCreateWithoutCampaignInput> | activitiesCreateWithoutCampaignInput[] | activitiesUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: activitiesCreateOrConnectWithoutCampaignInput | activitiesCreateOrConnectWithoutCampaignInput[]
    createMany?: activitiesCreateManyCampaignInputEnvelope
    connect?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
  }

  export type activitiesUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<activitiesCreateWithoutCampaignInput, activitiesUncheckedCreateWithoutCampaignInput> | activitiesCreateWithoutCampaignInput[] | activitiesUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: activitiesCreateOrConnectWithoutCampaignInput | activitiesCreateOrConnectWithoutCampaignInput[]
    createMany?: activitiesCreateManyCampaignInputEnvelope
    connect?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
  }

  export type Enumcampaign_statusFieldUpdateOperationsInput = {
    set?: $Enums.campaign_status
  }

  export type Enumcampaign_typeFieldUpdateOperationsInput = {
    set?: $Enums.campaign_type
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type activitiesUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<activitiesCreateWithoutCampaignInput, activitiesUncheckedCreateWithoutCampaignInput> | activitiesCreateWithoutCampaignInput[] | activitiesUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: activitiesCreateOrConnectWithoutCampaignInput | activitiesCreateOrConnectWithoutCampaignInput[]
    upsert?: activitiesUpsertWithWhereUniqueWithoutCampaignInput | activitiesUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: activitiesCreateManyCampaignInputEnvelope
    set?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    disconnect?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    delete?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    connect?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    update?: activitiesUpdateWithWhereUniqueWithoutCampaignInput | activitiesUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: activitiesUpdateManyWithWhereWithoutCampaignInput | activitiesUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: activitiesScalarWhereInput | activitiesScalarWhereInput[]
  }

  export type activitiesUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<activitiesCreateWithoutCampaignInput, activitiesUncheckedCreateWithoutCampaignInput> | activitiesCreateWithoutCampaignInput[] | activitiesUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: activitiesCreateOrConnectWithoutCampaignInput | activitiesCreateOrConnectWithoutCampaignInput[]
    upsert?: activitiesUpsertWithWhereUniqueWithoutCampaignInput | activitiesUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: activitiesCreateManyCampaignInputEnvelope
    set?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    disconnect?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    delete?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    connect?: activitiesWhereUniqueInput | activitiesWhereUniqueInput[]
    update?: activitiesUpdateWithWhereUniqueWithoutCampaignInput | activitiesUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: activitiesUpdateManyWithWhereWithoutCampaignInput | activitiesUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: activitiesScalarWhereInput | activitiesScalarWhereInput[]
  }

  export type contactsCreateNestedOneWithoutActivityInput = {
    create?: XOR<contactsCreateWithoutActivityInput, contactsUncheckedCreateWithoutActivityInput>
    connectOrCreate?: contactsCreateOrConnectWithoutActivityInput
    connect?: contactsWhereUniqueInput
  }

  export type campaignsCreateNestedOneWithoutActivityInput = {
    create?: XOR<campaignsCreateWithoutActivityInput, campaignsUncheckedCreateWithoutActivityInput>
    connectOrCreate?: campaignsCreateOrConnectWithoutActivityInput
    connect?: campaignsWhereUniqueInput
  }

  export type Enumactivity_statusFieldUpdateOperationsInput = {
    set?: $Enums.activity_status
  }

  export type Enumevent_typeFieldUpdateOperationsInput = {
    set?: $Enums.event_type
  }

  export type contactsUpdateOneRequiredWithoutActivityNestedInput = {
    create?: XOR<contactsCreateWithoutActivityInput, contactsUncheckedCreateWithoutActivityInput>
    connectOrCreate?: contactsCreateOrConnectWithoutActivityInput
    upsert?: contactsUpsertWithoutActivityInput
    connect?: contactsWhereUniqueInput
    update?: XOR<XOR<contactsUpdateToOneWithWhereWithoutActivityInput, contactsUpdateWithoutActivityInput>, contactsUncheckedUpdateWithoutActivityInput>
  }

  export type campaignsUpdateOneWithoutActivityNestedInput = {
    create?: XOR<campaignsCreateWithoutActivityInput, campaignsUncheckedCreateWithoutActivityInput>
    connectOrCreate?: campaignsCreateOrConnectWithoutActivityInput
    upsert?: campaignsUpsertWithoutActivityInput
    disconnect?: campaignsWhereInput | boolean
    delete?: campaignsWhereInput | boolean
    connect?: campaignsWhereUniqueInput
    update?: XOR<XOR<campaignsUpdateToOneWithWhereWithoutActivityInput, campaignsUpdateWithoutActivityInput>, campaignsUncheckedUpdateWithoutActivityInput>
  }

  export type contactsCreateNestedOneWithoutBounceInput = {
    create?: XOR<contactsCreateWithoutBounceInput, contactsUncheckedCreateWithoutBounceInput>
    connectOrCreate?: contactsCreateOrConnectWithoutBounceInput
    connect?: contactsWhereUniqueInput
  }

  export type Enumbounce_typeFieldUpdateOperationsInput = {
    set?: $Enums.bounce_type
  }

  export type contactsUpdateOneRequiredWithoutBounceNestedInput = {
    create?: XOR<contactsCreateWithoutBounceInput, contactsUncheckedCreateWithoutBounceInput>
    connectOrCreate?: contactsCreateOrConnectWithoutBounceInput
    upsert?: contactsUpsertWithoutBounceInput
    connect?: contactsWhereUniqueInput
    update?: XOR<XOR<contactsUpdateToOneWithWhereWithoutBounceInput, contactsUpdateWithoutBounceInput>, contactsUncheckedUpdateWithoutBounceInput>
  }

  export type contactsCreateNestedOneWithoutSubscriberInput = {
    create?: XOR<contactsCreateWithoutSubscriberInput, contactsUncheckedCreateWithoutSubscriberInput>
    connectOrCreate?: contactsCreateOrConnectWithoutSubscriberInput
    connect?: contactsWhereUniqueInput
  }

  export type Enumsubscriber_statusFieldUpdateOperationsInput = {
    set?: $Enums.subscriber_status
  }

  export type contactsUpdateOneRequiredWithoutSubscriberNestedInput = {
    create?: XOR<contactsCreateWithoutSubscriberInput, contactsUncheckedCreateWithoutSubscriberInput>
    connectOrCreate?: contactsCreateOrConnectWithoutSubscriberInput
    upsert?: contactsUpsertWithoutSubscriberInput
    connect?: contactsWhereUniqueInput
    update?: XOR<XOR<contactsUpdateToOneWithWhereWithoutSubscriberInput, contactsUpdateWithoutSubscriberInput>, contactsUncheckedUpdateWithoutSubscriberInput>
  }

  export type subscriber_list_contactsCreateNestedManyWithoutSubscriberListInput = {
    create?: XOR<subscriber_list_contactsCreateWithoutSubscriberListInput, subscriber_list_contactsUncheckedCreateWithoutSubscriberListInput> | subscriber_list_contactsCreateWithoutSubscriberListInput[] | subscriber_list_contactsUncheckedCreateWithoutSubscriberListInput[]
    connectOrCreate?: subscriber_list_contactsCreateOrConnectWithoutSubscriberListInput | subscriber_list_contactsCreateOrConnectWithoutSubscriberListInput[]
    createMany?: subscriber_list_contactsCreateManySubscriberListInputEnvelope
    connect?: subscriber_list_contactsWhereUniqueInput | subscriber_list_contactsWhereUniqueInput[]
  }

  export type subscriber_list_contactsUncheckedCreateNestedManyWithoutSubscriberListInput = {
    create?: XOR<subscriber_list_contactsCreateWithoutSubscriberListInput, subscriber_list_contactsUncheckedCreateWithoutSubscriberListInput> | subscriber_list_contactsCreateWithoutSubscriberListInput[] | subscriber_list_contactsUncheckedCreateWithoutSubscriberListInput[]
    connectOrCreate?: subscriber_list_contactsCreateOrConnectWithoutSubscriberListInput | subscriber_list_contactsCreateOrConnectWithoutSubscriberListInput[]
    createMany?: subscriber_list_contactsCreateManySubscriberListInputEnvelope
    connect?: subscriber_list_contactsWhereUniqueInput | subscriber_list_contactsWhereUniqueInput[]
  }

  export type subscriber_list_contactsUpdateManyWithoutSubscriberListNestedInput = {
    create?: XOR<subscriber_list_contactsCreateWithoutSubscriberListInput, subscriber_list_contactsUncheckedCreateWithoutSubscriberListInput> | subscriber_list_contactsCreateWithoutSubscriberListInput[] | subscriber_list_contactsUncheckedCreateWithoutSubscriberListInput[]
    connectOrCreate?: subscriber_list_contactsCreateOrConnectWithoutSubscriberListInput | subscriber_list_contactsCreateOrConnectWithoutSubscriberListInput[]
    upsert?: subscriber_list_contactsUpsertWithWhereUniqueWithoutSubscriberListInput | subscriber_list_contactsUpsertWithWhereUniqueWithoutSubscriberListInput[]
    createMany?: subscriber_list_contactsCreateManySubscriberListInputEnvelope
    set?: subscriber_list_contactsWhereUniqueInput | subscriber_list_contactsWhereUniqueInput[]
    disconnect?: subscriber_list_contactsWhereUniqueInput | subscriber_list_contactsWhereUniqueInput[]
    delete?: subscriber_list_contactsWhereUniqueInput | subscriber_list_contactsWhereUniqueInput[]
    connect?: subscriber_list_contactsWhereUniqueInput | subscriber_list_contactsWhereUniqueInput[]
    update?: subscriber_list_contactsUpdateWithWhereUniqueWithoutSubscriberListInput | subscriber_list_contactsUpdateWithWhereUniqueWithoutSubscriberListInput[]
    updateMany?: subscriber_list_contactsUpdateManyWithWhereWithoutSubscriberListInput | subscriber_list_contactsUpdateManyWithWhereWithoutSubscriberListInput[]
    deleteMany?: subscriber_list_contactsScalarWhereInput | subscriber_list_contactsScalarWhereInput[]
  }

  export type subscriber_list_contactsUncheckedUpdateManyWithoutSubscriberListNestedInput = {
    create?: XOR<subscriber_list_contactsCreateWithoutSubscriberListInput, subscriber_list_contactsUncheckedCreateWithoutSubscriberListInput> | subscriber_list_contactsCreateWithoutSubscriberListInput[] | subscriber_list_contactsUncheckedCreateWithoutSubscriberListInput[]
    connectOrCreate?: subscriber_list_contactsCreateOrConnectWithoutSubscriberListInput | subscriber_list_contactsCreateOrConnectWithoutSubscriberListInput[]
    upsert?: subscriber_list_contactsUpsertWithWhereUniqueWithoutSubscriberListInput | subscriber_list_contactsUpsertWithWhereUniqueWithoutSubscriberListInput[]
    createMany?: subscriber_list_contactsCreateManySubscriberListInputEnvelope
    set?: subscriber_list_contactsWhereUniqueInput | subscriber_list_contactsWhereUniqueInput[]
    disconnect?: subscriber_list_contactsWhereUniqueInput | subscriber_list_contactsWhereUniqueInput[]
    delete?: subscriber_list_contactsWhereUniqueInput | subscriber_list_contactsWhereUniqueInput[]
    connect?: subscriber_list_contactsWhereUniqueInput | subscriber_list_contactsWhereUniqueInput[]
    update?: subscriber_list_contactsUpdateWithWhereUniqueWithoutSubscriberListInput | subscriber_list_contactsUpdateWithWhereUniqueWithoutSubscriberListInput[]
    updateMany?: subscriber_list_contactsUpdateManyWithWhereWithoutSubscriberListInput | subscriber_list_contactsUpdateManyWithWhereWithoutSubscriberListInput[]
    deleteMany?: subscriber_list_contactsScalarWhereInput | subscriber_list_contactsScalarWhereInput[]
  }

  export type subscriber_listCreateNestedOneWithoutSubscriberListContactsInput = {
    create?: XOR<subscriber_listCreateWithoutSubscriberListContactsInput, subscriber_listUncheckedCreateWithoutSubscriberListContactsInput>
    connectOrCreate?: subscriber_listCreateOrConnectWithoutSubscriberListContactsInput
    connect?: subscriber_listWhereUniqueInput
  }

  export type contactsCreateNestedManyWithoutSubscriberListContactsInput = {
    create?: XOR<contactsCreateWithoutSubscriberListContactsInput, contactsUncheckedCreateWithoutSubscriberListContactsInput> | contactsCreateWithoutSubscriberListContactsInput[] | contactsUncheckedCreateWithoutSubscriberListContactsInput[]
    connectOrCreate?: contactsCreateOrConnectWithoutSubscriberListContactsInput | contactsCreateOrConnectWithoutSubscriberListContactsInput[]
    createMany?: contactsCreateManySubscriberListContactsInputEnvelope
    connect?: contactsWhereUniqueInput | contactsWhereUniqueInput[]
  }

  export type contactsUncheckedCreateNestedManyWithoutSubscriberListContactsInput = {
    create?: XOR<contactsCreateWithoutSubscriberListContactsInput, contactsUncheckedCreateWithoutSubscriberListContactsInput> | contactsCreateWithoutSubscriberListContactsInput[] | contactsUncheckedCreateWithoutSubscriberListContactsInput[]
    connectOrCreate?: contactsCreateOrConnectWithoutSubscriberListContactsInput | contactsCreateOrConnectWithoutSubscriberListContactsInput[]
    createMany?: contactsCreateManySubscriberListContactsInputEnvelope
    connect?: contactsWhereUniqueInput | contactsWhereUniqueInput[]
  }

  export type subscriber_listUpdateOneRequiredWithoutSubscriberListContactsNestedInput = {
    create?: XOR<subscriber_listCreateWithoutSubscriberListContactsInput, subscriber_listUncheckedCreateWithoutSubscriberListContactsInput>
    connectOrCreate?: subscriber_listCreateOrConnectWithoutSubscriberListContactsInput
    upsert?: subscriber_listUpsertWithoutSubscriberListContactsInput
    connect?: subscriber_listWhereUniqueInput
    update?: XOR<XOR<subscriber_listUpdateToOneWithWhereWithoutSubscriberListContactsInput, subscriber_listUpdateWithoutSubscriberListContactsInput>, subscriber_listUncheckedUpdateWithoutSubscriberListContactsInput>
  }

  export type contactsUpdateManyWithoutSubscriberListContactsNestedInput = {
    create?: XOR<contactsCreateWithoutSubscriberListContactsInput, contactsUncheckedCreateWithoutSubscriberListContactsInput> | contactsCreateWithoutSubscriberListContactsInput[] | contactsUncheckedCreateWithoutSubscriberListContactsInput[]
    connectOrCreate?: contactsCreateOrConnectWithoutSubscriberListContactsInput | contactsCreateOrConnectWithoutSubscriberListContactsInput[]
    upsert?: contactsUpsertWithWhereUniqueWithoutSubscriberListContactsInput | contactsUpsertWithWhereUniqueWithoutSubscriberListContactsInput[]
    createMany?: contactsCreateManySubscriberListContactsInputEnvelope
    set?: contactsWhereUniqueInput | contactsWhereUniqueInput[]
    disconnect?: contactsWhereUniqueInput | contactsWhereUniqueInput[]
    delete?: contactsWhereUniqueInput | contactsWhereUniqueInput[]
    connect?: contactsWhereUniqueInput | contactsWhereUniqueInput[]
    update?: contactsUpdateWithWhereUniqueWithoutSubscriberListContactsInput | contactsUpdateWithWhereUniqueWithoutSubscriberListContactsInput[]
    updateMany?: contactsUpdateManyWithWhereWithoutSubscriberListContactsInput | contactsUpdateManyWithWhereWithoutSubscriberListContactsInput[]
    deleteMany?: contactsScalarWhereInput | contactsScalarWhereInput[]
  }

  export type contactsUncheckedUpdateManyWithoutSubscriberListContactsNestedInput = {
    create?: XOR<contactsCreateWithoutSubscriberListContactsInput, contactsUncheckedCreateWithoutSubscriberListContactsInput> | contactsCreateWithoutSubscriberListContactsInput[] | contactsUncheckedCreateWithoutSubscriberListContactsInput[]
    connectOrCreate?: contactsCreateOrConnectWithoutSubscriberListContactsInput | contactsCreateOrConnectWithoutSubscriberListContactsInput[]
    upsert?: contactsUpsertWithWhereUniqueWithoutSubscriberListContactsInput | contactsUpsertWithWhereUniqueWithoutSubscriberListContactsInput[]
    createMany?: contactsCreateManySubscriberListContactsInputEnvelope
    set?: contactsWhereUniqueInput | contactsWhereUniqueInput[]
    disconnect?: contactsWhereUniqueInput | contactsWhereUniqueInput[]
    delete?: contactsWhereUniqueInput | contactsWhereUniqueInput[]
    connect?: contactsWhereUniqueInput | contactsWhereUniqueInput[]
    update?: contactsUpdateWithWhereUniqueWithoutSubscriberListContactsInput | contactsUpdateWithWhereUniqueWithoutSubscriberListContactsInput[]
    updateMany?: contactsUpdateManyWithWhereWithoutSubscriberListContactsInput | contactsUpdateManyWithWhereWithoutSubscriberListContactsInput[]
    deleteMany?: contactsScalarWhereInput | contactsScalarWhereInput[]
  }

  export type unsubscribesCreatelist_idsInput = {
    set: string[]
  }

  export type contactsCreateNestedOneWithoutUnsubscribeInput = {
    create?: XOR<contactsCreateWithoutUnsubscribeInput, contactsUncheckedCreateWithoutUnsubscribeInput>
    connectOrCreate?: contactsCreateOrConnectWithoutUnsubscribeInput
    connect?: contactsWhereUniqueInput
  }

  export type Enumunsubscribe_sourceFieldUpdateOperationsInput = {
    set?: $Enums.unsubscribe_source
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type unsubscribesUpdatelist_idsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type contactsUpdateOneRequiredWithoutUnsubscribeNestedInput = {
    create?: XOR<contactsCreateWithoutUnsubscribeInput, contactsUncheckedCreateWithoutUnsubscribeInput>
    connectOrCreate?: contactsCreateOrConnectWithoutUnsubscribeInput
    upsert?: contactsUpsertWithoutUnsubscribeInput
    connect?: contactsWhereUniqueInput
    update?: XOR<XOR<contactsUpdateToOneWithWhereWithoutUnsubscribeInput, contactsUpdateWithoutUnsubscribeInput>, contactsUncheckedUpdateWithoutUnsubscribeInput>
  }

  export type usersCreatepermissionsInput = {
    set: string[]
  }

  export type usersUpdatepermissionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type api_keysCreatepermissionsInput = {
    set: string[]
  }

  export type api_keysUpdatepermissionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type templatesCreateNestedOneWithoutPropertiesInput = {
    create?: XOR<templatesCreateWithoutPropertiesInput, templatesUncheckedCreateWithoutPropertiesInput>
    connectOrCreate?: templatesCreateOrConnectWithoutPropertiesInput
    connect?: templatesWhereUniqueInput
  }

  export type templatesUpdateOneWithoutPropertiesNestedInput = {
    create?: XOR<templatesCreateWithoutPropertiesInput, templatesUncheckedCreateWithoutPropertiesInput>
    connectOrCreate?: templatesCreateOrConnectWithoutPropertiesInput
    upsert?: templatesUpsertWithoutPropertiesInput
    disconnect?: templatesWhereInput | boolean
    delete?: templatesWhereInput | boolean
    connect?: templatesWhereUniqueInput
    update?: XOR<XOR<templatesUpdateToOneWithWhereWithoutPropertiesInput, templatesUpdateWithoutPropertiesInput>, templatesUncheckedUpdateWithoutPropertiesInput>
  }

  export type template_propertiesCreateNestedManyWithoutTemplatesInput = {
    create?: XOR<template_propertiesCreateWithoutTemplatesInput, template_propertiesUncheckedCreateWithoutTemplatesInput> | template_propertiesCreateWithoutTemplatesInput[] | template_propertiesUncheckedCreateWithoutTemplatesInput[]
    connectOrCreate?: template_propertiesCreateOrConnectWithoutTemplatesInput | template_propertiesCreateOrConnectWithoutTemplatesInput[]
    createMany?: template_propertiesCreateManyTemplatesInputEnvelope
    connect?: template_propertiesWhereUniqueInput | template_propertiesWhereUniqueInput[]
  }

  export type template_propertiesUncheckedCreateNestedManyWithoutTemplatesInput = {
    create?: XOR<template_propertiesCreateWithoutTemplatesInput, template_propertiesUncheckedCreateWithoutTemplatesInput> | template_propertiesCreateWithoutTemplatesInput[] | template_propertiesUncheckedCreateWithoutTemplatesInput[]
    connectOrCreate?: template_propertiesCreateOrConnectWithoutTemplatesInput | template_propertiesCreateOrConnectWithoutTemplatesInput[]
    createMany?: template_propertiesCreateManyTemplatesInputEnvelope
    connect?: template_propertiesWhereUniqueInput | template_propertiesWhereUniqueInput[]
  }

  export type template_propertiesUpdateManyWithoutTemplatesNestedInput = {
    create?: XOR<template_propertiesCreateWithoutTemplatesInput, template_propertiesUncheckedCreateWithoutTemplatesInput> | template_propertiesCreateWithoutTemplatesInput[] | template_propertiesUncheckedCreateWithoutTemplatesInput[]
    connectOrCreate?: template_propertiesCreateOrConnectWithoutTemplatesInput | template_propertiesCreateOrConnectWithoutTemplatesInput[]
    upsert?: template_propertiesUpsertWithWhereUniqueWithoutTemplatesInput | template_propertiesUpsertWithWhereUniqueWithoutTemplatesInput[]
    createMany?: template_propertiesCreateManyTemplatesInputEnvelope
    set?: template_propertiesWhereUniqueInput | template_propertiesWhereUniqueInput[]
    disconnect?: template_propertiesWhereUniqueInput | template_propertiesWhereUniqueInput[]
    delete?: template_propertiesWhereUniqueInput | template_propertiesWhereUniqueInput[]
    connect?: template_propertiesWhereUniqueInput | template_propertiesWhereUniqueInput[]
    update?: template_propertiesUpdateWithWhereUniqueWithoutTemplatesInput | template_propertiesUpdateWithWhereUniqueWithoutTemplatesInput[]
    updateMany?: template_propertiesUpdateManyWithWhereWithoutTemplatesInput | template_propertiesUpdateManyWithWhereWithoutTemplatesInput[]
    deleteMany?: template_propertiesScalarWhereInput | template_propertiesScalarWhereInput[]
  }

  export type template_propertiesUncheckedUpdateManyWithoutTemplatesNestedInput = {
    create?: XOR<template_propertiesCreateWithoutTemplatesInput, template_propertiesUncheckedCreateWithoutTemplatesInput> | template_propertiesCreateWithoutTemplatesInput[] | template_propertiesUncheckedCreateWithoutTemplatesInput[]
    connectOrCreate?: template_propertiesCreateOrConnectWithoutTemplatesInput | template_propertiesCreateOrConnectWithoutTemplatesInput[]
    upsert?: template_propertiesUpsertWithWhereUniqueWithoutTemplatesInput | template_propertiesUpsertWithWhereUniqueWithoutTemplatesInput[]
    createMany?: template_propertiesCreateManyTemplatesInputEnvelope
    set?: template_propertiesWhereUniqueInput | template_propertiesWhereUniqueInput[]
    disconnect?: template_propertiesWhereUniqueInput | template_propertiesWhereUniqueInput[]
    delete?: template_propertiesWhereUniqueInput | template_propertiesWhereUniqueInput[]
    connect?: template_propertiesWhereUniqueInput | template_propertiesWhereUniqueInput[]
    update?: template_propertiesUpdateWithWhereUniqueWithoutTemplatesInput | template_propertiesUpdateWithWhereUniqueWithoutTemplatesInput[]
    updateMany?: template_propertiesUpdateManyWithWhereWithoutTemplatesInput | template_propertiesUpdateManyWithWhereWithoutTemplatesInput[]
    deleteMany?: template_propertiesScalarWhereInput | template_propertiesScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumcampaign_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.campaign_status | Enumcampaign_statusFieldRefInput<$PrismaModel>
    in?: $Enums.campaign_status[] | ListEnumcampaign_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.campaign_status[] | ListEnumcampaign_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumcampaign_statusFilter<$PrismaModel> | $Enums.campaign_status
  }

  export type NestedEnumcampaign_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.campaign_type | Enumcampaign_typeFieldRefInput<$PrismaModel>
    in?: $Enums.campaign_type[] | ListEnumcampaign_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.campaign_type[] | ListEnumcampaign_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumcampaign_typeFilter<$PrismaModel> | $Enums.campaign_type
  }

  export type NestedEnumcampaign_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.campaign_status | Enumcampaign_statusFieldRefInput<$PrismaModel>
    in?: $Enums.campaign_status[] | ListEnumcampaign_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.campaign_status[] | ListEnumcampaign_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumcampaign_statusWithAggregatesFilter<$PrismaModel> | $Enums.campaign_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumcampaign_statusFilter<$PrismaModel>
    _max?: NestedEnumcampaign_statusFilter<$PrismaModel>
  }

  export type NestedEnumcampaign_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.campaign_type | Enumcampaign_typeFieldRefInput<$PrismaModel>
    in?: $Enums.campaign_type[] | ListEnumcampaign_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.campaign_type[] | ListEnumcampaign_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumcampaign_typeWithAggregatesFilter<$PrismaModel> | $Enums.campaign_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumcampaign_typeFilter<$PrismaModel>
    _max?: NestedEnumcampaign_typeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumactivity_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.activity_status | Enumactivity_statusFieldRefInput<$PrismaModel>
    in?: $Enums.activity_status[] | ListEnumactivity_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.activity_status[] | ListEnumactivity_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumactivity_statusFilter<$PrismaModel> | $Enums.activity_status
  }

  export type NestedEnumevent_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.event_type | Enumevent_typeFieldRefInput<$PrismaModel>
    in?: $Enums.event_type[] | ListEnumevent_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.event_type[] | ListEnumevent_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumevent_typeFilter<$PrismaModel> | $Enums.event_type
  }

  export type NestedEnumactivity_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.activity_status | Enumactivity_statusFieldRefInput<$PrismaModel>
    in?: $Enums.activity_status[] | ListEnumactivity_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.activity_status[] | ListEnumactivity_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumactivity_statusWithAggregatesFilter<$PrismaModel> | $Enums.activity_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumactivity_statusFilter<$PrismaModel>
    _max?: NestedEnumactivity_statusFilter<$PrismaModel>
  }

  export type NestedEnumevent_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.event_type | Enumevent_typeFieldRefInput<$PrismaModel>
    in?: $Enums.event_type[] | ListEnumevent_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.event_type[] | ListEnumevent_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumevent_typeWithAggregatesFilter<$PrismaModel> | $Enums.event_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumevent_typeFilter<$PrismaModel>
    _max?: NestedEnumevent_typeFilter<$PrismaModel>
  }

  export type NestedEnumbounce_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.bounce_type | Enumbounce_typeFieldRefInput<$PrismaModel>
    in?: $Enums.bounce_type[] | ListEnumbounce_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.bounce_type[] | ListEnumbounce_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumbounce_typeFilter<$PrismaModel> | $Enums.bounce_type
  }

  export type NestedEnumbounce_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.bounce_type | Enumbounce_typeFieldRefInput<$PrismaModel>
    in?: $Enums.bounce_type[] | ListEnumbounce_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.bounce_type[] | ListEnumbounce_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumbounce_typeWithAggregatesFilter<$PrismaModel> | $Enums.bounce_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumbounce_typeFilter<$PrismaModel>
    _max?: NestedEnumbounce_typeFilter<$PrismaModel>
  }

  export type NestedEnumsubscriber_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.subscriber_status | Enumsubscriber_statusFieldRefInput<$PrismaModel>
    in?: $Enums.subscriber_status[] | ListEnumsubscriber_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.subscriber_status[] | ListEnumsubscriber_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumsubscriber_statusFilter<$PrismaModel> | $Enums.subscriber_status
  }

  export type NestedEnumsubscriber_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.subscriber_status | Enumsubscriber_statusFieldRefInput<$PrismaModel>
    in?: $Enums.subscriber_status[] | ListEnumsubscriber_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.subscriber_status[] | ListEnumsubscriber_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumsubscriber_statusWithAggregatesFilter<$PrismaModel> | $Enums.subscriber_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumsubscriber_statusFilter<$PrismaModel>
    _max?: NestedEnumsubscriber_statusFilter<$PrismaModel>
  }

  export type NestedEnumunsubscribe_sourceFilter<$PrismaModel = never> = {
    equals?: $Enums.unsubscribe_source | Enumunsubscribe_sourceFieldRefInput<$PrismaModel>
    in?: $Enums.unsubscribe_source[] | ListEnumunsubscribe_sourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.unsubscribe_source[] | ListEnumunsubscribe_sourceFieldRefInput<$PrismaModel>
    not?: NestedEnumunsubscribe_sourceFilter<$PrismaModel> | $Enums.unsubscribe_source
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumunsubscribe_sourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.unsubscribe_source | Enumunsubscribe_sourceFieldRefInput<$PrismaModel>
    in?: $Enums.unsubscribe_source[] | ListEnumunsubscribe_sourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.unsubscribe_source[] | ListEnumunsubscribe_sourceFieldRefInput<$PrismaModel>
    not?: NestedEnumunsubscribe_sourceWithAggregatesFilter<$PrismaModel> | $Enums.unsubscribe_source
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumunsubscribe_sourceFilter<$PrismaModel>
    _max?: NestedEnumunsubscribe_sourceFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type subscriber_list_contactsCreateWithoutContactsInput = {
    id?: string
    tenant_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    subscriberList: subscriber_listCreateNestedOneWithoutSubscriberListContactsInput
  }

  export type subscriber_list_contactsUncheckedCreateWithoutContactsInput = {
    id?: string
    tenant_id: string
    subscriber_list_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type subscriber_list_contactsCreateOrConnectWithoutContactsInput = {
    where: subscriber_list_contactsWhereUniqueInput
    create: XOR<subscriber_list_contactsCreateWithoutContactsInput, subscriber_list_contactsUncheckedCreateWithoutContactsInput>
  }

  export type activitiesCreateWithoutReceiverInput = {
    id?: string
    tenant_id: string
    send_name: string
    subject: string
    status: $Enums.activity_status
    sent_at: Date | string
    last_event_received_at: Date | string
    last_event_type: $Enums.event_type
    opens: number
    clicks: number
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    campaign?: campaignsCreateNestedOneWithoutActivityInput
  }

  export type activitiesUncheckedCreateWithoutReceiverInput = {
    id?: string
    tenant_id: string
    send_name: string
    subject: string
    status: $Enums.activity_status
    sent_at: Date | string
    last_event_received_at: Date | string
    last_event_type: $Enums.event_type
    opens: number
    clicks: number
    campaign_id?: string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type activitiesCreateOrConnectWithoutReceiverInput = {
    where: activitiesWhereUniqueInput
    create: XOR<activitiesCreateWithoutReceiverInput, activitiesUncheckedCreateWithoutReceiverInput>
  }

  export type activitiesCreateManyReceiverInputEnvelope = {
    data: activitiesCreateManyReceiverInput | activitiesCreateManyReceiverInput[]
    skipDuplicates?: boolean
  }

  export type bouncesCreateWithoutContactInput = {
    id?: string
    tenant_id: string
    bounced_at: Date | string
    reason: string
    bounce_type: $Enums.bounce_type
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type bouncesUncheckedCreateWithoutContactInput = {
    id?: string
    tenant_id: string
    bounced_at: Date | string
    reason: string
    bounce_type: $Enums.bounce_type
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type bouncesCreateOrConnectWithoutContactInput = {
    where: bouncesWhereUniqueInput
    create: XOR<bouncesCreateWithoutContactInput, bouncesUncheckedCreateWithoutContactInput>
  }

  export type bouncesCreateManyContactInputEnvelope = {
    data: bouncesCreateManyContactInput | bouncesCreateManyContactInput[]
    skipDuplicates?: boolean
  }

  export type subscribersCreateWithoutContactInput = {
    id?: string
    tenant_id: string
    status: $Enums.subscriber_status
    subscribed_at: Date | string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type subscribersUncheckedCreateWithoutContactInput = {
    id?: string
    tenant_id: string
    status: $Enums.subscriber_status
    subscribed_at: Date | string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type subscribersCreateOrConnectWithoutContactInput = {
    where: subscribersWhereUniqueInput
    create: XOR<subscribersCreateWithoutContactInput, subscribersUncheckedCreateWithoutContactInput>
  }

  export type subscribersCreateManyContactInputEnvelope = {
    data: subscribersCreateManyContactInput | subscribersCreateManyContactInput[]
    skipDuplicates?: boolean
  }

  export type unsubscribesCreateWithoutContactInput = {
    id?: string
    tenant_id: string
    source: $Enums.unsubscribe_source
    unsubscribed_at: Date | string
    global: boolean
    list_ids?: unsubscribesCreatelist_idsInput | string[]
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type unsubscribesUncheckedCreateWithoutContactInput = {
    id?: string
    tenant_id: string
    source: $Enums.unsubscribe_source
    unsubscribed_at: Date | string
    global: boolean
    list_ids?: unsubscribesCreatelist_idsInput | string[]
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type unsubscribesCreateOrConnectWithoutContactInput = {
    where: unsubscribesWhereUniqueInput
    create: XOR<unsubscribesCreateWithoutContactInput, unsubscribesUncheckedCreateWithoutContactInput>
  }

  export type unsubscribesCreateManyContactInputEnvelope = {
    data: unsubscribesCreateManyContactInput | unsubscribesCreateManyContactInput[]
    skipDuplicates?: boolean
  }

  export type subscriber_list_contactsUpsertWithoutContactsInput = {
    update: XOR<subscriber_list_contactsUpdateWithoutContactsInput, subscriber_list_contactsUncheckedUpdateWithoutContactsInput>
    create: XOR<subscriber_list_contactsCreateWithoutContactsInput, subscriber_list_contactsUncheckedCreateWithoutContactsInput>
    where?: subscriber_list_contactsWhereInput
  }

  export type subscriber_list_contactsUpdateToOneWithWhereWithoutContactsInput = {
    where?: subscriber_list_contactsWhereInput
    data: XOR<subscriber_list_contactsUpdateWithoutContactsInput, subscriber_list_contactsUncheckedUpdateWithoutContactsInput>
  }

  export type subscriber_list_contactsUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    subscriberList?: subscriber_listUpdateOneRequiredWithoutSubscriberListContactsNestedInput
  }

  export type subscriber_list_contactsUncheckedUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    subscriber_list_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activitiesUpsertWithWhereUniqueWithoutReceiverInput = {
    where: activitiesWhereUniqueInput
    update: XOR<activitiesUpdateWithoutReceiverInput, activitiesUncheckedUpdateWithoutReceiverInput>
    create: XOR<activitiesCreateWithoutReceiverInput, activitiesUncheckedCreateWithoutReceiverInput>
  }

  export type activitiesUpdateWithWhereUniqueWithoutReceiverInput = {
    where: activitiesWhereUniqueInput
    data: XOR<activitiesUpdateWithoutReceiverInput, activitiesUncheckedUpdateWithoutReceiverInput>
  }

  export type activitiesUpdateManyWithWhereWithoutReceiverInput = {
    where: activitiesScalarWhereInput
    data: XOR<activitiesUpdateManyMutationInput, activitiesUncheckedUpdateManyWithoutReceiverInput>
  }

  export type activitiesScalarWhereInput = {
    AND?: activitiesScalarWhereInput | activitiesScalarWhereInput[]
    OR?: activitiesScalarWhereInput[]
    NOT?: activitiesScalarWhereInput | activitiesScalarWhereInput[]
    id?: UuidFilter<"activities"> | string
    tenant_id?: UuidFilter<"activities"> | string
    send_name?: StringFilter<"activities"> | string
    subject?: StringFilter<"activities"> | string
    status?: Enumactivity_statusFilter<"activities"> | $Enums.activity_status
    sent_at?: DateTimeFilter<"activities"> | Date | string
    last_event_received_at?: DateTimeFilter<"activities"> | Date | string
    last_event_type?: Enumevent_typeFilter<"activities"> | $Enums.event_type
    opens?: IntFilter<"activities"> | number
    clicks?: IntFilter<"activities"> | number
    campaign_id?: UuidNullableFilter<"activities"> | string | null
    contact_id?: UuidFilter<"activities"> | string
    created_at?: DateTimeFilter<"activities"> | Date | string
    created_by?: StringFilter<"activities"> | string
    updated_at?: DateTimeNullableFilter<"activities"> | Date | string | null
    updated_by?: StringNullableFilter<"activities"> | string | null
  }

  export type bouncesUpsertWithWhereUniqueWithoutContactInput = {
    where: bouncesWhereUniqueInput
    update: XOR<bouncesUpdateWithoutContactInput, bouncesUncheckedUpdateWithoutContactInput>
    create: XOR<bouncesCreateWithoutContactInput, bouncesUncheckedCreateWithoutContactInput>
  }

  export type bouncesUpdateWithWhereUniqueWithoutContactInput = {
    where: bouncesWhereUniqueInput
    data: XOR<bouncesUpdateWithoutContactInput, bouncesUncheckedUpdateWithoutContactInput>
  }

  export type bouncesUpdateManyWithWhereWithoutContactInput = {
    where: bouncesScalarWhereInput
    data: XOR<bouncesUpdateManyMutationInput, bouncesUncheckedUpdateManyWithoutContactInput>
  }

  export type bouncesScalarWhereInput = {
    AND?: bouncesScalarWhereInput | bouncesScalarWhereInput[]
    OR?: bouncesScalarWhereInput[]
    NOT?: bouncesScalarWhereInput | bouncesScalarWhereInput[]
    id?: UuidFilter<"bounces"> | string
    tenant_id?: UuidFilter<"bounces"> | string
    bounced_at?: DateTimeFilter<"bounces"> | Date | string
    reason?: StringFilter<"bounces"> | string
    bounce_type?: Enumbounce_typeFilter<"bounces"> | $Enums.bounce_type
    contact_id?: UuidFilter<"bounces"> | string
    created_at?: DateTimeFilter<"bounces"> | Date | string
    created_by?: StringFilter<"bounces"> | string
    updated_at?: DateTimeNullableFilter<"bounces"> | Date | string | null
    updated_by?: StringNullableFilter<"bounces"> | string | null
  }

  export type subscribersUpsertWithWhereUniqueWithoutContactInput = {
    where: subscribersWhereUniqueInput
    update: XOR<subscribersUpdateWithoutContactInput, subscribersUncheckedUpdateWithoutContactInput>
    create: XOR<subscribersCreateWithoutContactInput, subscribersUncheckedCreateWithoutContactInput>
  }

  export type subscribersUpdateWithWhereUniqueWithoutContactInput = {
    where: subscribersWhereUniqueInput
    data: XOR<subscribersUpdateWithoutContactInput, subscribersUncheckedUpdateWithoutContactInput>
  }

  export type subscribersUpdateManyWithWhereWithoutContactInput = {
    where: subscribersScalarWhereInput
    data: XOR<subscribersUpdateManyMutationInput, subscribersUncheckedUpdateManyWithoutContactInput>
  }

  export type subscribersScalarWhereInput = {
    AND?: subscribersScalarWhereInput | subscribersScalarWhereInput[]
    OR?: subscribersScalarWhereInput[]
    NOT?: subscribersScalarWhereInput | subscribersScalarWhereInput[]
    id?: UuidFilter<"subscribers"> | string
    tenant_id?: UuidFilter<"subscribers"> | string
    status?: Enumsubscriber_statusFilter<"subscribers"> | $Enums.subscriber_status
    subscribed_at?: DateTimeFilter<"subscribers"> | Date | string
    contact_id?: UuidFilter<"subscribers"> | string
    created_at?: DateTimeFilter<"subscribers"> | Date | string
    created_by?: StringFilter<"subscribers"> | string
    updated_at?: DateTimeNullableFilter<"subscribers"> | Date | string | null
    updated_by?: StringNullableFilter<"subscribers"> | string | null
  }

  export type unsubscribesUpsertWithWhereUniqueWithoutContactInput = {
    where: unsubscribesWhereUniqueInput
    update: XOR<unsubscribesUpdateWithoutContactInput, unsubscribesUncheckedUpdateWithoutContactInput>
    create: XOR<unsubscribesCreateWithoutContactInput, unsubscribesUncheckedCreateWithoutContactInput>
  }

  export type unsubscribesUpdateWithWhereUniqueWithoutContactInput = {
    where: unsubscribesWhereUniqueInput
    data: XOR<unsubscribesUpdateWithoutContactInput, unsubscribesUncheckedUpdateWithoutContactInput>
  }

  export type unsubscribesUpdateManyWithWhereWithoutContactInput = {
    where: unsubscribesScalarWhereInput
    data: XOR<unsubscribesUpdateManyMutationInput, unsubscribesUncheckedUpdateManyWithoutContactInput>
  }

  export type unsubscribesScalarWhereInput = {
    AND?: unsubscribesScalarWhereInput | unsubscribesScalarWhereInput[]
    OR?: unsubscribesScalarWhereInput[]
    NOT?: unsubscribesScalarWhereInput | unsubscribesScalarWhereInput[]
    id?: UuidFilter<"unsubscribes"> | string
    tenant_id?: UuidFilter<"unsubscribes"> | string
    source?: Enumunsubscribe_sourceFilter<"unsubscribes"> | $Enums.unsubscribe_source
    unsubscribed_at?: DateTimeFilter<"unsubscribes"> | Date | string
    global?: BoolFilter<"unsubscribes"> | boolean
    list_ids?: StringNullableListFilter<"unsubscribes">
    contact_id?: UuidFilter<"unsubscribes"> | string
    created_at?: DateTimeFilter<"unsubscribes"> | Date | string
    created_by?: StringFilter<"unsubscribes"> | string
    updated_at?: DateTimeNullableFilter<"unsubscribes"> | Date | string | null
    updated_by?: StringNullableFilter<"unsubscribes"> | string | null
  }

  export type activitiesCreateWithoutCampaignInput = {
    id?: string
    tenant_id: string
    send_name: string
    subject: string
    status: $Enums.activity_status
    sent_at: Date | string
    last_event_received_at: Date | string
    last_event_type: $Enums.event_type
    opens: number
    clicks: number
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    receiver: contactsCreateNestedOneWithoutActivityInput
  }

  export type activitiesUncheckedCreateWithoutCampaignInput = {
    id?: string
    tenant_id: string
    send_name: string
    subject: string
    status: $Enums.activity_status
    sent_at: Date | string
    last_event_received_at: Date | string
    last_event_type: $Enums.event_type
    opens: number
    clicks: number
    contact_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type activitiesCreateOrConnectWithoutCampaignInput = {
    where: activitiesWhereUniqueInput
    create: XOR<activitiesCreateWithoutCampaignInput, activitiesUncheckedCreateWithoutCampaignInput>
  }

  export type activitiesCreateManyCampaignInputEnvelope = {
    data: activitiesCreateManyCampaignInput | activitiesCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type activitiesUpsertWithWhereUniqueWithoutCampaignInput = {
    where: activitiesWhereUniqueInput
    update: XOR<activitiesUpdateWithoutCampaignInput, activitiesUncheckedUpdateWithoutCampaignInput>
    create: XOR<activitiesCreateWithoutCampaignInput, activitiesUncheckedCreateWithoutCampaignInput>
  }

  export type activitiesUpdateWithWhereUniqueWithoutCampaignInput = {
    where: activitiesWhereUniqueInput
    data: XOR<activitiesUpdateWithoutCampaignInput, activitiesUncheckedUpdateWithoutCampaignInput>
  }

  export type activitiesUpdateManyWithWhereWithoutCampaignInput = {
    where: activitiesScalarWhereInput
    data: XOR<activitiesUpdateManyMutationInput, activitiesUncheckedUpdateManyWithoutCampaignInput>
  }

  export type contactsCreateWithoutActivityInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
    SubscriberListContacts?: subscriber_list_contactsCreateNestedOneWithoutContactsInput
    bounce?: bouncesCreateNestedManyWithoutContactInput
    subscriber?: subscribersCreateNestedManyWithoutContactInput
    unsubscribe?: unsubscribesCreateNestedManyWithoutContactInput
  }

  export type contactsUncheckedCreateWithoutActivityInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    subscriber_list_contacts_id?: string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
    bounce?: bouncesUncheckedCreateNestedManyWithoutContactInput
    subscriber?: subscribersUncheckedCreateNestedManyWithoutContactInput
    unsubscribe?: unsubscribesUncheckedCreateNestedManyWithoutContactInput
  }

  export type contactsCreateOrConnectWithoutActivityInput = {
    where: contactsWhereUniqueInput
    create: XOR<contactsCreateWithoutActivityInput, contactsUncheckedCreateWithoutActivityInput>
  }

  export type campaignsCreateWithoutActivityInput = {
    id?: string
    tenant_id: string
    name: string
    status: $Enums.campaign_status
    type: $Enums.campaign_type
    recipients: number
    sent: number
    delivered: number
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type campaignsUncheckedCreateWithoutActivityInput = {
    id?: string
    tenant_id: string
    name: string
    status: $Enums.campaign_status
    type: $Enums.campaign_type
    recipients: number
    sent: number
    delivered: number
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type campaignsCreateOrConnectWithoutActivityInput = {
    where: campaignsWhereUniqueInput
    create: XOR<campaignsCreateWithoutActivityInput, campaignsUncheckedCreateWithoutActivityInput>
  }

  export type contactsUpsertWithoutActivityInput = {
    update: XOR<contactsUpdateWithoutActivityInput, contactsUncheckedUpdateWithoutActivityInput>
    create: XOR<contactsCreateWithoutActivityInput, contactsUncheckedCreateWithoutActivityInput>
    where?: contactsWhereInput
  }

  export type contactsUpdateToOneWithWhereWithoutActivityInput = {
    where?: contactsWhereInput
    data: XOR<contactsUpdateWithoutActivityInput, contactsUncheckedUpdateWithoutActivityInput>
  }

  export type contactsUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
    SubscriberListContacts?: subscriber_list_contactsUpdateOneWithoutContactsNestedInput
    bounce?: bouncesUpdateManyWithoutContactNestedInput
    subscriber?: subscribersUpdateManyWithoutContactNestedInput
    unsubscribe?: unsubscribesUpdateManyWithoutContactNestedInput
  }

  export type contactsUncheckedUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriber_list_contacts_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
    bounce?: bouncesUncheckedUpdateManyWithoutContactNestedInput
    subscriber?: subscribersUncheckedUpdateManyWithoutContactNestedInput
    unsubscribe?: unsubscribesUncheckedUpdateManyWithoutContactNestedInput
  }

  export type campaignsUpsertWithoutActivityInput = {
    update: XOR<campaignsUpdateWithoutActivityInput, campaignsUncheckedUpdateWithoutActivityInput>
    create: XOR<campaignsCreateWithoutActivityInput, campaignsUncheckedCreateWithoutActivityInput>
    where?: campaignsWhereInput
  }

  export type campaignsUpdateToOneWithWhereWithoutActivityInput = {
    where?: campaignsWhereInput
    data: XOR<campaignsUpdateWithoutActivityInput, campaignsUncheckedUpdateWithoutActivityInput>
  }

  export type campaignsUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: Enumcampaign_statusFieldUpdateOperationsInput | $Enums.campaign_status
    type?: Enumcampaign_typeFieldUpdateOperationsInput | $Enums.campaign_type
    recipients?: IntFieldUpdateOperationsInput | number
    sent?: IntFieldUpdateOperationsInput | number
    delivered?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type campaignsUncheckedUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: Enumcampaign_statusFieldUpdateOperationsInput | $Enums.campaign_status
    type?: Enumcampaign_typeFieldUpdateOperationsInput | $Enums.campaign_type
    recipients?: IntFieldUpdateOperationsInput | number
    sent?: IntFieldUpdateOperationsInput | number
    delivered?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type contactsCreateWithoutBounceInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
    SubscriberListContacts?: subscriber_list_contactsCreateNestedOneWithoutContactsInput
    activity?: activitiesCreateNestedManyWithoutReceiverInput
    subscriber?: subscribersCreateNestedManyWithoutContactInput
    unsubscribe?: unsubscribesCreateNestedManyWithoutContactInput
  }

  export type contactsUncheckedCreateWithoutBounceInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    subscriber_list_contacts_id?: string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
    activity?: activitiesUncheckedCreateNestedManyWithoutReceiverInput
    subscriber?: subscribersUncheckedCreateNestedManyWithoutContactInput
    unsubscribe?: unsubscribesUncheckedCreateNestedManyWithoutContactInput
  }

  export type contactsCreateOrConnectWithoutBounceInput = {
    where: contactsWhereUniqueInput
    create: XOR<contactsCreateWithoutBounceInput, contactsUncheckedCreateWithoutBounceInput>
  }

  export type contactsUpsertWithoutBounceInput = {
    update: XOR<contactsUpdateWithoutBounceInput, contactsUncheckedUpdateWithoutBounceInput>
    create: XOR<contactsCreateWithoutBounceInput, contactsUncheckedCreateWithoutBounceInput>
    where?: contactsWhereInput
  }

  export type contactsUpdateToOneWithWhereWithoutBounceInput = {
    where?: contactsWhereInput
    data: XOR<contactsUpdateWithoutBounceInput, contactsUncheckedUpdateWithoutBounceInput>
  }

  export type contactsUpdateWithoutBounceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
    SubscriberListContacts?: subscriber_list_contactsUpdateOneWithoutContactsNestedInput
    activity?: activitiesUpdateManyWithoutReceiverNestedInput
    subscriber?: subscribersUpdateManyWithoutContactNestedInput
    unsubscribe?: unsubscribesUpdateManyWithoutContactNestedInput
  }

  export type contactsUncheckedUpdateWithoutBounceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriber_list_contacts_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
    activity?: activitiesUncheckedUpdateManyWithoutReceiverNestedInput
    subscriber?: subscribersUncheckedUpdateManyWithoutContactNestedInput
    unsubscribe?: unsubscribesUncheckedUpdateManyWithoutContactNestedInput
  }

  export type contactsCreateWithoutSubscriberInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
    SubscriberListContacts?: subscriber_list_contactsCreateNestedOneWithoutContactsInput
    activity?: activitiesCreateNestedManyWithoutReceiverInput
    bounce?: bouncesCreateNestedManyWithoutContactInput
    unsubscribe?: unsubscribesCreateNestedManyWithoutContactInput
  }

  export type contactsUncheckedCreateWithoutSubscriberInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    subscriber_list_contacts_id?: string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
    activity?: activitiesUncheckedCreateNestedManyWithoutReceiverInput
    bounce?: bouncesUncheckedCreateNestedManyWithoutContactInput
    unsubscribe?: unsubscribesUncheckedCreateNestedManyWithoutContactInput
  }

  export type contactsCreateOrConnectWithoutSubscriberInput = {
    where: contactsWhereUniqueInput
    create: XOR<contactsCreateWithoutSubscriberInput, contactsUncheckedCreateWithoutSubscriberInput>
  }

  export type contactsUpsertWithoutSubscriberInput = {
    update: XOR<contactsUpdateWithoutSubscriberInput, contactsUncheckedUpdateWithoutSubscriberInput>
    create: XOR<contactsCreateWithoutSubscriberInput, contactsUncheckedCreateWithoutSubscriberInput>
    where?: contactsWhereInput
  }

  export type contactsUpdateToOneWithWhereWithoutSubscriberInput = {
    where?: contactsWhereInput
    data: XOR<contactsUpdateWithoutSubscriberInput, contactsUncheckedUpdateWithoutSubscriberInput>
  }

  export type contactsUpdateWithoutSubscriberInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
    SubscriberListContacts?: subscriber_list_contactsUpdateOneWithoutContactsNestedInput
    activity?: activitiesUpdateManyWithoutReceiverNestedInput
    bounce?: bouncesUpdateManyWithoutContactNestedInput
    unsubscribe?: unsubscribesUpdateManyWithoutContactNestedInput
  }

  export type contactsUncheckedUpdateWithoutSubscriberInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriber_list_contacts_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
    activity?: activitiesUncheckedUpdateManyWithoutReceiverNestedInput
    bounce?: bouncesUncheckedUpdateManyWithoutContactNestedInput
    unsubscribe?: unsubscribesUncheckedUpdateManyWithoutContactNestedInput
  }

  export type subscriber_list_contactsCreateWithoutSubscriberListInput = {
    id?: string
    tenant_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    contacts?: contactsCreateNestedManyWithoutSubscriberListContactsInput
  }

  export type subscriber_list_contactsUncheckedCreateWithoutSubscriberListInput = {
    id?: string
    tenant_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    contacts?: contactsUncheckedCreateNestedManyWithoutSubscriberListContactsInput
  }

  export type subscriber_list_contactsCreateOrConnectWithoutSubscriberListInput = {
    where: subscriber_list_contactsWhereUniqueInput
    create: XOR<subscriber_list_contactsCreateWithoutSubscriberListInput, subscriber_list_contactsUncheckedCreateWithoutSubscriberListInput>
  }

  export type subscriber_list_contactsCreateManySubscriberListInputEnvelope = {
    data: subscriber_list_contactsCreateManySubscriberListInput | subscriber_list_contactsCreateManySubscriberListInput[]
    skipDuplicates?: boolean
  }

  export type subscriber_list_contactsUpsertWithWhereUniqueWithoutSubscriberListInput = {
    where: subscriber_list_contactsWhereUniqueInput
    update: XOR<subscriber_list_contactsUpdateWithoutSubscriberListInput, subscriber_list_contactsUncheckedUpdateWithoutSubscriberListInput>
    create: XOR<subscriber_list_contactsCreateWithoutSubscriberListInput, subscriber_list_contactsUncheckedCreateWithoutSubscriberListInput>
  }

  export type subscriber_list_contactsUpdateWithWhereUniqueWithoutSubscriberListInput = {
    where: subscriber_list_contactsWhereUniqueInput
    data: XOR<subscriber_list_contactsUpdateWithoutSubscriberListInput, subscriber_list_contactsUncheckedUpdateWithoutSubscriberListInput>
  }

  export type subscriber_list_contactsUpdateManyWithWhereWithoutSubscriberListInput = {
    where: subscriber_list_contactsScalarWhereInput
    data: XOR<subscriber_list_contactsUpdateManyMutationInput, subscriber_list_contactsUncheckedUpdateManyWithoutSubscriberListInput>
  }

  export type subscriber_list_contactsScalarWhereInput = {
    AND?: subscriber_list_contactsScalarWhereInput | subscriber_list_contactsScalarWhereInput[]
    OR?: subscriber_list_contactsScalarWhereInput[]
    NOT?: subscriber_list_contactsScalarWhereInput | subscriber_list_contactsScalarWhereInput[]
    id?: UuidFilter<"subscriber_list_contacts"> | string
    tenant_id?: UuidFilter<"subscriber_list_contacts"> | string
    subscriber_list_id?: UuidFilter<"subscriber_list_contacts"> | string
    created_at?: DateTimeFilter<"subscriber_list_contacts"> | Date | string
    created_by?: StringFilter<"subscriber_list_contacts"> | string
    updated_at?: DateTimeNullableFilter<"subscriber_list_contacts"> | Date | string | null
    updated_by?: StringNullableFilter<"subscriber_list_contacts"> | string | null
  }

  export type subscriber_listCreateWithoutSubscriberListContactsInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type subscriber_listUncheckedCreateWithoutSubscriberListContactsInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type subscriber_listCreateOrConnectWithoutSubscriberListContactsInput = {
    where: subscriber_listWhereUniqueInput
    create: XOR<subscriber_listCreateWithoutSubscriberListContactsInput, subscriber_listUncheckedCreateWithoutSubscriberListContactsInput>
  }

  export type contactsCreateWithoutSubscriberListContactsInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
    activity?: activitiesCreateNestedManyWithoutReceiverInput
    bounce?: bouncesCreateNestedManyWithoutContactInput
    subscriber?: subscribersCreateNestedManyWithoutContactInput
    unsubscribe?: unsubscribesCreateNestedManyWithoutContactInput
  }

  export type contactsUncheckedCreateWithoutSubscriberListContactsInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
    activity?: activitiesUncheckedCreateNestedManyWithoutReceiverInput
    bounce?: bouncesUncheckedCreateNestedManyWithoutContactInput
    subscriber?: subscribersUncheckedCreateNestedManyWithoutContactInput
    unsubscribe?: unsubscribesUncheckedCreateNestedManyWithoutContactInput
  }

  export type contactsCreateOrConnectWithoutSubscriberListContactsInput = {
    where: contactsWhereUniqueInput
    create: XOR<contactsCreateWithoutSubscriberListContactsInput, contactsUncheckedCreateWithoutSubscriberListContactsInput>
  }

  export type contactsCreateManySubscriberListContactsInputEnvelope = {
    data: contactsCreateManySubscriberListContactsInput | contactsCreateManySubscriberListContactsInput[]
    skipDuplicates?: boolean
  }

  export type subscriber_listUpsertWithoutSubscriberListContactsInput = {
    update: XOR<subscriber_listUpdateWithoutSubscriberListContactsInput, subscriber_listUncheckedUpdateWithoutSubscriberListContactsInput>
    create: XOR<subscriber_listCreateWithoutSubscriberListContactsInput, subscriber_listUncheckedCreateWithoutSubscriberListContactsInput>
    where?: subscriber_listWhereInput
  }

  export type subscriber_listUpdateToOneWithWhereWithoutSubscriberListContactsInput = {
    where?: subscriber_listWhereInput
    data: XOR<subscriber_listUpdateWithoutSubscriberListContactsInput, subscriber_listUncheckedUpdateWithoutSubscriberListContactsInput>
  }

  export type subscriber_listUpdateWithoutSubscriberListContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscriber_listUncheckedUpdateWithoutSubscriberListContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type contactsUpsertWithWhereUniqueWithoutSubscriberListContactsInput = {
    where: contactsWhereUniqueInput
    update: XOR<contactsUpdateWithoutSubscriberListContactsInput, contactsUncheckedUpdateWithoutSubscriberListContactsInput>
    create: XOR<contactsCreateWithoutSubscriberListContactsInput, contactsUncheckedCreateWithoutSubscriberListContactsInput>
  }

  export type contactsUpdateWithWhereUniqueWithoutSubscriberListContactsInput = {
    where: contactsWhereUniqueInput
    data: XOR<contactsUpdateWithoutSubscriberListContactsInput, contactsUncheckedUpdateWithoutSubscriberListContactsInput>
  }

  export type contactsUpdateManyWithWhereWithoutSubscriberListContactsInput = {
    where: contactsScalarWhereInput
    data: XOR<contactsUpdateManyMutationInput, contactsUncheckedUpdateManyWithoutSubscriberListContactsInput>
  }

  export type contactsScalarWhereInput = {
    AND?: contactsScalarWhereInput | contactsScalarWhereInput[]
    OR?: contactsScalarWhereInput[]
    NOT?: contactsScalarWhereInput | contactsScalarWhereInput[]
    id?: UuidFilter<"contacts"> | string
    tenant_id?: UuidFilter<"contacts"> | string
    email?: StringFilter<"contacts"> | string
    first_name?: StringNullableFilter<"contacts"> | string | null
    last_name?: StringNullableFilter<"contacts"> | string | null
    last_activity_at?: DateTimeNullableFilter<"contacts"> | Date | string | null
    subscriber_list_contacts_id?: UuidNullableFilter<"contacts"> | string | null
    created_at?: DateTimeFilter<"contacts"> | Date | string
    created_by?: StringFilter<"contacts"> | string
    updated_at?: DateTimeNullableFilter<"contacts"> | Date | string | null
    updated_by?: StringNullableFilter<"contacts"> | string | null
    list_ids?: StringNullableListFilter<"contacts">
  }

  export type contactsCreateWithoutUnsubscribeInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
    SubscriberListContacts?: subscriber_list_contactsCreateNestedOneWithoutContactsInput
    activity?: activitiesCreateNestedManyWithoutReceiverInput
    bounce?: bouncesCreateNestedManyWithoutContactInput
    subscriber?: subscribersCreateNestedManyWithoutContactInput
  }

  export type contactsUncheckedCreateWithoutUnsubscribeInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    subscriber_list_contacts_id?: string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
    activity?: activitiesUncheckedCreateNestedManyWithoutReceiverInput
    bounce?: bouncesUncheckedCreateNestedManyWithoutContactInput
    subscriber?: subscribersUncheckedCreateNestedManyWithoutContactInput
  }

  export type contactsCreateOrConnectWithoutUnsubscribeInput = {
    where: contactsWhereUniqueInput
    create: XOR<contactsCreateWithoutUnsubscribeInput, contactsUncheckedCreateWithoutUnsubscribeInput>
  }

  export type contactsUpsertWithoutUnsubscribeInput = {
    update: XOR<contactsUpdateWithoutUnsubscribeInput, contactsUncheckedUpdateWithoutUnsubscribeInput>
    create: XOR<contactsCreateWithoutUnsubscribeInput, contactsUncheckedCreateWithoutUnsubscribeInput>
    where?: contactsWhereInput
  }

  export type contactsUpdateToOneWithWhereWithoutUnsubscribeInput = {
    where?: contactsWhereInput
    data: XOR<contactsUpdateWithoutUnsubscribeInput, contactsUncheckedUpdateWithoutUnsubscribeInput>
  }

  export type contactsUpdateWithoutUnsubscribeInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
    SubscriberListContacts?: subscriber_list_contactsUpdateOneWithoutContactsNestedInput
    activity?: activitiesUpdateManyWithoutReceiverNestedInput
    bounce?: bouncesUpdateManyWithoutContactNestedInput
    subscriber?: subscribersUpdateManyWithoutContactNestedInput
  }

  export type contactsUncheckedUpdateWithoutUnsubscribeInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriber_list_contacts_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
    activity?: activitiesUncheckedUpdateManyWithoutReceiverNestedInput
    bounce?: bouncesUncheckedUpdateManyWithoutContactNestedInput
    subscriber?: subscribersUncheckedUpdateManyWithoutContactNestedInput
  }

  export type templatesCreateWithoutPropertiesInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    content: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type templatesUncheckedCreateWithoutPropertiesInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    content: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type templatesCreateOrConnectWithoutPropertiesInput = {
    where: templatesWhereUniqueInput
    create: XOR<templatesCreateWithoutPropertiesInput, templatesUncheckedCreateWithoutPropertiesInput>
  }

  export type templatesUpsertWithoutPropertiesInput = {
    update: XOR<templatesUpdateWithoutPropertiesInput, templatesUncheckedUpdateWithoutPropertiesInput>
    create: XOR<templatesCreateWithoutPropertiesInput, templatesUncheckedCreateWithoutPropertiesInput>
    where?: templatesWhereInput
  }

  export type templatesUpdateToOneWithWhereWithoutPropertiesInput = {
    where?: templatesWhereInput
    data: XOR<templatesUpdateWithoutPropertiesInput, templatesUncheckedUpdateWithoutPropertiesInput>
  }

  export type templatesUpdateWithoutPropertiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type templatesUncheckedUpdateWithoutPropertiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type template_propertiesCreateWithoutTemplatesInput = {
    id?: string
    tenant_id: string
    name: string
    type: string
    default_value: JsonNullValueInput | InputJsonValue
  }

  export type template_propertiesUncheckedCreateWithoutTemplatesInput = {
    id?: string
    tenant_id: string
    name: string
    type: string
    default_value: JsonNullValueInput | InputJsonValue
  }

  export type template_propertiesCreateOrConnectWithoutTemplatesInput = {
    where: template_propertiesWhereUniqueInput
    create: XOR<template_propertiesCreateWithoutTemplatesInput, template_propertiesUncheckedCreateWithoutTemplatesInput>
  }

  export type template_propertiesCreateManyTemplatesInputEnvelope = {
    data: template_propertiesCreateManyTemplatesInput | template_propertiesCreateManyTemplatesInput[]
    skipDuplicates?: boolean
  }

  export type template_propertiesUpsertWithWhereUniqueWithoutTemplatesInput = {
    where: template_propertiesWhereUniqueInput
    update: XOR<template_propertiesUpdateWithoutTemplatesInput, template_propertiesUncheckedUpdateWithoutTemplatesInput>
    create: XOR<template_propertiesCreateWithoutTemplatesInput, template_propertiesUncheckedCreateWithoutTemplatesInput>
  }

  export type template_propertiesUpdateWithWhereUniqueWithoutTemplatesInput = {
    where: template_propertiesWhereUniqueInput
    data: XOR<template_propertiesUpdateWithoutTemplatesInput, template_propertiesUncheckedUpdateWithoutTemplatesInput>
  }

  export type template_propertiesUpdateManyWithWhereWithoutTemplatesInput = {
    where: template_propertiesScalarWhereInput
    data: XOR<template_propertiesUpdateManyMutationInput, template_propertiesUncheckedUpdateManyWithoutTemplatesInput>
  }

  export type template_propertiesScalarWhereInput = {
    AND?: template_propertiesScalarWhereInput | template_propertiesScalarWhereInput[]
    OR?: template_propertiesScalarWhereInput[]
    NOT?: template_propertiesScalarWhereInput | template_propertiesScalarWhereInput[]
    id?: UuidFilter<"template_properties"> | string
    tenant_id?: UuidFilter<"template_properties"> | string
    templates_id?: UuidNullableFilter<"template_properties"> | string | null
    name?: StringFilter<"template_properties"> | string
    type?: StringFilter<"template_properties"> | string
    default_value?: JsonFilter<"template_properties">
  }

  export type activitiesCreateManyReceiverInput = {
    id?: string
    tenant_id: string
    send_name: string
    subject: string
    status: $Enums.activity_status
    sent_at: Date | string
    last_event_received_at: Date | string
    last_event_type: $Enums.event_type
    opens: number
    clicks: number
    campaign_id?: string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type bouncesCreateManyContactInput = {
    id?: string
    tenant_id: string
    bounced_at: Date | string
    reason: string
    bounce_type: $Enums.bounce_type
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type subscribersCreateManyContactInput = {
    id?: string
    tenant_id: string
    status: $Enums.subscriber_status
    subscribed_at: Date | string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type unsubscribesCreateManyContactInput = {
    id?: string
    tenant_id: string
    source: $Enums.unsubscribe_source
    unsubscribed_at: Date | string
    global: boolean
    list_ids?: unsubscribesCreatelist_idsInput | string[]
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type activitiesUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    send_name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: Enumactivity_statusFieldUpdateOperationsInput | $Enums.activity_status
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_type?: Enumevent_typeFieldUpdateOperationsInput | $Enums.event_type
    opens?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    campaign?: campaignsUpdateOneWithoutActivityNestedInput
  }

  export type activitiesUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    send_name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: Enumactivity_statusFieldUpdateOperationsInput | $Enums.activity_status
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_type?: Enumevent_typeFieldUpdateOperationsInput | $Enums.event_type
    opens?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    campaign_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activitiesUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    send_name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: Enumactivity_statusFieldUpdateOperationsInput | $Enums.activity_status
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_type?: Enumevent_typeFieldUpdateOperationsInput | $Enums.event_type
    opens?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    campaign_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bouncesUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    bounced_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bounce_type?: Enumbounce_typeFieldUpdateOperationsInput | $Enums.bounce_type
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bouncesUncheckedUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    bounced_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bounce_type?: Enumbounce_typeFieldUpdateOperationsInput | $Enums.bounce_type
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bouncesUncheckedUpdateManyWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    bounced_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bounce_type?: Enumbounce_typeFieldUpdateOperationsInput | $Enums.bounce_type
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscribersUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    status?: Enumsubscriber_statusFieldUpdateOperationsInput | $Enums.subscriber_status
    subscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscribersUncheckedUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    status?: Enumsubscriber_statusFieldUpdateOperationsInput | $Enums.subscriber_status
    subscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscribersUncheckedUpdateManyWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    status?: Enumsubscriber_statusFieldUpdateOperationsInput | $Enums.subscriber_status
    subscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type unsubscribesUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    source?: Enumunsubscribe_sourceFieldUpdateOperationsInput | $Enums.unsubscribe_source
    unsubscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    global?: BoolFieldUpdateOperationsInput | boolean
    list_ids?: unsubscribesUpdatelist_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type unsubscribesUncheckedUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    source?: Enumunsubscribe_sourceFieldUpdateOperationsInput | $Enums.unsubscribe_source
    unsubscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    global?: BoolFieldUpdateOperationsInput | boolean
    list_ids?: unsubscribesUpdatelist_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type unsubscribesUncheckedUpdateManyWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    source?: Enumunsubscribe_sourceFieldUpdateOperationsInput | $Enums.unsubscribe_source
    unsubscribed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    global?: BoolFieldUpdateOperationsInput | boolean
    list_ids?: unsubscribesUpdatelist_idsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activitiesCreateManyCampaignInput = {
    id?: string
    tenant_id: string
    send_name: string
    subject: string
    status: $Enums.activity_status
    sent_at: Date | string
    last_event_received_at: Date | string
    last_event_type: $Enums.event_type
    opens: number
    clicks: number
    contact_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type activitiesUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    send_name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: Enumactivity_statusFieldUpdateOperationsInput | $Enums.activity_status
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_type?: Enumevent_typeFieldUpdateOperationsInput | $Enums.event_type
    opens?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    receiver?: contactsUpdateOneRequiredWithoutActivityNestedInput
  }

  export type activitiesUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    send_name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: Enumactivity_statusFieldUpdateOperationsInput | $Enums.activity_status
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_type?: Enumevent_typeFieldUpdateOperationsInput | $Enums.event_type
    opens?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    contact_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activitiesUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    send_name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: Enumactivity_statusFieldUpdateOperationsInput | $Enums.activity_status
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_received_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_event_type?: Enumevent_typeFieldUpdateOperationsInput | $Enums.event_type
    opens?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    contact_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscriber_list_contactsCreateManySubscriberListInput = {
    id?: string
    tenant_id: string
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type subscriber_list_contactsUpdateWithoutSubscriberListInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: contactsUpdateManyWithoutSubscriberListContactsNestedInput
  }

  export type subscriber_list_contactsUncheckedUpdateWithoutSubscriberListInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: contactsUncheckedUpdateManyWithoutSubscriberListContactsNestedInput
  }

  export type subscriber_list_contactsUncheckedUpdateManyWithoutSubscriberListInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type contactsCreateManySubscriberListContactsInput = {
    id?: string
    tenant_id: string
    email: string
    first_name?: string | null
    last_name?: string | null
    last_activity_at?: Date | string | null
    created_at: Date | string
    created_by: string
    updated_at?: Date | string | null
    updated_by?: string | null
    list_ids?: contactsCreatelist_idsInput | string[]
  }

  export type contactsUpdateWithoutSubscriberListContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
    activity?: activitiesUpdateManyWithoutReceiverNestedInput
    bounce?: bouncesUpdateManyWithoutContactNestedInput
    subscriber?: subscribersUpdateManyWithoutContactNestedInput
    unsubscribe?: unsubscribesUpdateManyWithoutContactNestedInput
  }

  export type contactsUncheckedUpdateWithoutSubscriberListContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
    activity?: activitiesUncheckedUpdateManyWithoutReceiverNestedInput
    bounce?: bouncesUncheckedUpdateManyWithoutContactNestedInput
    subscriber?: subscribersUncheckedUpdateManyWithoutContactNestedInput
    unsubscribe?: unsubscribesUncheckedUpdateManyWithoutContactNestedInput
  }

  export type contactsUncheckedUpdateManyWithoutSubscriberListContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    list_ids?: contactsUpdatelist_idsInput | string[]
  }

  export type template_propertiesCreateManyTemplatesInput = {
    id?: string
    tenant_id: string
    name: string
    type: string
    default_value: JsonNullValueInput | InputJsonValue
  }

  export type template_propertiesUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    default_value?: JsonNullValueInput | InputJsonValue
  }

  export type template_propertiesUncheckedUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    default_value?: JsonNullValueInput | InputJsonValue
  }

  export type template_propertiesUncheckedUpdateManyWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    default_value?: JsonNullValueInput | InputJsonValue
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}