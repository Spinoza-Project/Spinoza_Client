import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import useSWR, { mutate } from 'swr';
import fetcher from '../lib/fetcher';
import { getSignin } from './api';

const SignIn: NextPage = () => {
  const { data, error, mutate } = useSWR('/api/me', fetcher);
  const [formStatus, setFormStatus] = useState<string>('');
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!emailInputRef.current || !passwordInputRef.current) {
      return;
    }

    axios
      .post('/api/signin', {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      })
      .then(() => {
        mutate();
      })
      .catch((e) => {
        console.error(e);
      });
  };
  if (data) {
    router.replace('/home');
    return <div>로그인 성공</div>;
  }
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
