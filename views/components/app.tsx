import { Example } from './example';
import { createEffect } from 'solid-js';
import { HelloWorld } from './hello-world';
import { useExampleCommand } from '../commands/example.command';
import { useExampleNotification } from '../notifications/example.notification';

export const App = (props) => {
  const { execute } = useExampleCommand();
  const { listen } = useExampleNotification();

  listen((data) => {
    console.log(data);
  });

  createEffect(async () => {
    const res = await execute({ name: 'teste' });
    console.log(res);
  });

  return (
    <div>
      <p>{props.message}</p>
      <HelloWorld />
      <Example />
    </div>
  );
};
