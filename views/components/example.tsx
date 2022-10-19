import { createSignal, onCleanup } from 'solid-js';

export const Example = () => {
  const [count, setCount] = createSignal(0);
  const timer = setInterval(() => setCount(count() + 1), 1500);
  onCleanup(() => clearInterval(timer));

  return (
    <div>
      <div>${count}</div>
    </div>
  );
};
