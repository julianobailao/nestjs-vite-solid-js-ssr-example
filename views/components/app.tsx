import { HelloWorld } from './hello-world';
import { Example } from './example';

export const App = (props) => {
  return (
    <div>
      <p>{props.message}</p>
      <HelloWorld />
      <Example />
    </div>
  );
};
