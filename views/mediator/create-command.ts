export type Handler<T, R> = (
  ...args: T extends null ? [undefined?] : [T]
) => Promise<R>;

export type Callback<T, R> = (data: T) => R | Promise<R>;

export type CreateCommandResult<T, R> = {
  execute: Handler<T, R>;
};

export function createCommand<T, R>(
  callback: Callback<T, R>,
): () => CreateCommandResult<T, R> {
  const execute: Handler<T, R> = async (...[data]: [undefined?] | [T]) =>
    (await callback(data)) as R;

  return () => ({
    execute,
  });
}
