import { App } from '../components/app';

export const Index = (props) => {
  return (
    <>
      <App {...props} />
      <script type="module" src="views/components/app.hydrate.tsx"></script>
    </>
  );
};
