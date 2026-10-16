import { useState } from 'react';
import { Button } from '../../../components/ui/Button.jsx';
import { TextField } from '../../../components/ui/TextField.jsx';

export function SignInForm({ onSubmit }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const errors = {};
  const [forgotMessage, setForgotMessage] = useState('');

  function change(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function submit(event) {
    event.preventDefault();
    onSubmit(values);
  }

  return (
    <form className="sign-in-form" onSubmit={submit} noValidate>
      <TextField id="email" name="email" type="email" label="Email address" placeholder="name@179fc.com" value={values.email} onChange={change} error={errors.email} autoComplete="email" />
      <TextField id="password" name="password" type="password" label="Password" placeholder="••••••••••••" value={values.password} onChange={change} error={errors.password} autoComplete="current-password" />
      <button className="forgot-link" type="button" onClick={() => setForgotMessage('Please contact your club administrator to reset your password.')}>Forgot password?</button>
      {forgotMessage ? <p className="form-notice" role="status">{forgotMessage}</p> : null}
      <Button className="button--primary button--full" type="submit">Sign in to 179FC</Button>
    </form>
  );
}
