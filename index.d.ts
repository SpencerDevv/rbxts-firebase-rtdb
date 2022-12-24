interface RTDBInstance {
  /**
   * Gets the value of the database at key
   * @param {string} key
   * @return value
   */
  GetAsync(key: string): unknown | void;

  /**
   * Set the value of the database at key
   * @returns [success, responseInfo]
   */
  SetAsync(
    key: string,
    value: unknown | void,
    method?: string
  ): LuaTuple<[true, RequestAsyncResponse]> | LuaTuple<[false, void]>;

  /**
   * Deletes key in database
   * @return [success, responseInfo]
   */
  DeleteAsync(key: string): LuaTuple<[true, RequestAsyncResponse]> | LuaTuple<[false, void]>;

  /**
   * Increments the value at key by delta
   * @returns [success, responseInfo]
   */
  IncrementAsync(key: string, delta: number): LuaTuple<[true, RequestAsyncResponse]> | LuaTuple<[false, void]>;

  /**
  * Updates the value at key by the result of the callback
  * @param {string} key
  * @returns [success, responseInfo]
  */
  UpdateAsync(
    key: string,
    callback: (old: unknown) => unknown,
    snapshot?: unknown
  ): LuaTuple<[true, RequestAsyncResponse]> | LuaTuple<[false, void]>;

  /**
   * Updates multiple values at different keys by the result of the callback
   * @return [success, responseInfo]
   */
  BatchUpdateAsync(
    baseKey: string,
    keyValues: Map<string, unknown>,
    callbacks: Map<string, (old: unknown) => unknown>,
    snapshot?: unknown
  ): LuaTuple<[true, RequestAsyncResponse]> | LuaTuple<[false, void]>;
}

interface FireBase {
  /*
   * Gets the RTDB Firebase
   * @return RTDBInstance
   */
  GetFirebase(name: string, scope?: string): RTDBInstance;
}

interface FireBaseConstructor {
  /*
   * Gets the FireBase RTDB using the dbURL and auth token
   * @return FireBase
   */
  (dbUrl: string, authToken: string): FireBase;
}

declare const FireBase: FireBaseConstructor;
export = FireBase;
