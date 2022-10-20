import { createSignal } from 'solid-js';
import {
  ExampleNotification,
  useExampleNotification,
} from '../notifications/example.notification';

export const ExampleSubscribe = () => {
  const { listen } = useExampleNotification();
  const [name, setName] = createSignal('');

  listen((notify: ExampleNotification) => {
    setName(notify.name);
  });

  return <div>Hello {name()}!</div>;
};
