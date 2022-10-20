import { createNotification } from '../mediator/create-notification';

export interface ExampleNotification {
  name: string;
  date: Date;
}

export const useExampleNotification = createNotification<ExampleNotification>();
