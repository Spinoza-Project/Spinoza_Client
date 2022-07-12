import { NextPage } from 'next';
import { useRef, useState } from 'react';
import { getSignin } from './api';

const SignIn: NextPage = () => {
  const [formStatus, setFormStatus] = useState<string>('');

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!emailInputRef.current || !passwordInputRef.current) {
      return;
    }
    getSignin(emailInputRef.current?.value, passwordInputRef.current?.value);
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            placeholder='Email'
            required
            ref={emailInputRef}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            required
            ref={passwordInputRef}
          />
          <p>
            {/* Please choose a password. */}
            {formStatus}
          </p>
        </div>
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
};

export default SignIn;
