import { ExampleSubscribe } from './example-subscribe';
import { useExampleCommand } from '../commands/example.command';

export const Example = () => {
  const { execute } = useExampleCommand();

  async function onChangeHandler() {
    await execute({ name: this.value });
  }

  return (
    <div>
      <input type="text" onchange={onChangeHandler} value="test" />
      <ExampleSubscribe />
    </div>
  );
};
