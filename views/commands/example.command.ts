import { createCommand } from '../mediator/create-command';
import {
  ExampleNotification,
  useExampleNotification,
} from '../notifications/example.notification';

export interface ExampleCommand {
  name: string;
}

export const useExampleCommand = createCommand<
  ExampleCommand,
  ExampleNotification
>((payload: ExampleCommand) => {
  const { publish } = useExampleNotification();
  return publish({ ...payload, date: new Date() });
});
