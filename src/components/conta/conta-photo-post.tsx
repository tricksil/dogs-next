'use client';

import photoPost from '@/actions/photo-post';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Button from '../forms/button';
import Input from '../forms/input';
import ErrorMessage from '../helper/error-message';
import styles from './conta-photo-post.module.css';

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled={pending}>Enviando...</Button>
      ) : (
        <Button>Enviar</Button>
      )}
    </>
  );
}

export default function ContaPhotoPost() {
  const [state, action] = useFormState(photoPost, {
    ok: false,
    error: '',
    data: null,
  });
  const [img, setImg] = React.useState('');

  function handleImgChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files) setImg(URL.createObjectURL(target.files[0]));
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form action={action}>
        <Input label="Nome" type="text" name="nome" />
        <Input label="Peso" type="number" name="peso" />
        <Input label="Idade" type="number" name="idade" />
        <input
          onChange={handleImgChange}
          className={styles.file}
          type="file"
          name="img"
          id="img"
        />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <div>
        <div
          className={styles.preview}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
    </section>
  );
}
