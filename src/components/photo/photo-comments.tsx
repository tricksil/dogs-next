'use client';

import React from 'react';
import styles from './photo-comments.module.css';
import { Comment } from '@/actions/photo-get';
import { useUser } from '@/context/user-context';
import PhotoCommentsForm from './photo-comments-form';

export default function PhotoComments(props: {
  id: number;
  comments: Comment[];
  single: boolean;
}) {
  const [comments, setComments] = React.useState<Comment[]>(
    () => props.comments,
  );
  const commentsSection = React.useRef<HTMLUListElement>(null);
  const { user } = useUser();

  React.useEffect(() => {
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${props.single ? styles.single : ''}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {user && (
        <PhotoCommentsForm
          id={props.id}
          setComments={setComments}
          single={props.single}
        />
      )}
    </>
  );
}
