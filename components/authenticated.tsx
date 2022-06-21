import { NextPage } from 'next';

const Authenticated: NextPage = () => {
  return (
    <div>
      <h1>Log in</h1>
      <div>You are already logged in.</div>
      <div>Now redirect to main page.</div>
    </div>
  );
};

export default Authenticated;
