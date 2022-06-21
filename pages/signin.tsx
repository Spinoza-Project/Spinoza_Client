import { NextPage } from 'next';
import { useRef, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Authenticated from '../components/authenticated';

const SignIn: NextPage = () => {
  const [formStatus, setFormStatus] = useState<string>('');

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    const result = await signIn('credentials', {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (!result.error) {
      setFormStatus(`Log in Success!`);
      router.replace('/home');
    } else {
      setFormStatus(`Error Occured : ${result.error}`);
    }
  };

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    router.replace('/home');
    return <Authenticated />;
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
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
