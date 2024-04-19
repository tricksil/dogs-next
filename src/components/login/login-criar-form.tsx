'use client';

import userPost from '@/actions/user-post';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Button from '../forms/button';
import Input from '../forms/input';
import ErrorMessage from '../helper/error-message';
import styles from './login.module.css';

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled={pending}>Cadastrando...</Button>
      ) : (
        <Button>Cadastrar</Button>
      )}
    </>
  );
}

export default function LoginCriarForm() {
  const [state, action] = useFormState(userPost, {
    ok: false,
    error: '',
    data: null,
  });

  React.useEffect(() => {
    if (state.ok) window.location.href = '/conta';
  }, [state.ok]);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Usuário" type="text" name="username" />
        <Input label="Email" type="email" name="email" />
        <Input label="Senha" type="password" name="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
    </>
  );
}
