export type HandlerCallback<T> = (data: T) => T;

export type ListenerCallback<T> = (data: T) => void | Promise<void>;

export type TNotification<T> = {
  publish: HandlerCallback<T>;
  listen: (callback: ListenerCallback<T>) => void;
  dismiss: (callback: ListenerCallback<T>) => void;
};

export function createNotification<T>(): () => TNotification<T> {
  const listeners: ListenerCallback<T>[] = [];

  const publish: HandlerCallback<T> = (data: T): T => {
    listeners.forEach((listener: ListenerCallback<T>) => listener(data));
    return data;
  };

  const listen = (listener: ListenerCallback<T>) => listeners.push(listener);

  const dismiss = (listener: ListenerCallback<T>) => {
    const index = listeners.findIndex(
      (item: ListenerCallback<T>) => item === listener,
    );

    if (index >= 0) listeners.splice(index, 1);
  };

  return () => ({
    publish,
    listen,
    dismiss,
  });
}
