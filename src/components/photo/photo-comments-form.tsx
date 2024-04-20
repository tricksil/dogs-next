'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import styles from './photo-comments-form.module.css';
import { Comment } from '@/actions/photo-get';
import EnviarIcon from '@/icons/enviar-icon';
import ErrorMessage from '../helper/error-message';
import commentPost from '@/actions/comment-post';

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className={styles.button}>
      <EnviarIcon />
    </button>
  );
}

type PhotoCommentsForm = {
  single: boolean;
  id: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export default function PhotoCommentsForm({
  single,
  id,
  setComments,
}: PhotoCommentsForm) {
  const [state, action] = useFormState(commentPost, {
    ok: false,
    data: null,
    error: '',
  });
  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    if (state.ok && state.data) {
      setComments((comments) => [...comments, state.data]);
      setComment('');
    }
  }, [state, setComments]);

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ''}`}
      action={action}
    >
      <input type="hidden" name="id" id="id" value={id} />
      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></textarea>
      <FormButton />
      <ErrorMessage error={state.error} />
    </form>
  );
}
