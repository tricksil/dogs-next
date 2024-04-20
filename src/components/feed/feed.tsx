'use client';

import photosGet, { Photo } from '@/actions/photos-get';
import FeedPhotos from './feed-photos';
import React from 'react';
let time: string | number | NodeJS.Timeout | undefined;
export default function Feed({
  photos,
  user,
}: {
  photos: Photo[];
  user?: 0 | string;
}) {
  const [photosFeed, setPhotosFeed] = React.useState<Photo[]>(photos);
  const [page, setPage] = React.useState(1);
  const fetching = React.useRef(false);
  const [loading, setLoading] = React.useState(false);
  const [infinite, setInfinite] = React.useState(
    photos.length < 6 ? false : true,
  );

  function infiniteScroll() {
    if (fetching.current) return;
    fetching.current = true;
    setLoading(true);
    time = setTimeout(() => {
      setPage((currentPage) => currentPage + 1);
      fetching.current = false;
      setLoading(false);
    }, 1000);
  }

  React.useEffect(() => {
    if (page === 1) return;
    async function getPagePhotos(page: number, user?: 0 | string) {
      const actionData = await photosGet(
        { page, total: 3, user },
        {
          cache: 'no-store',
        },
      );
      if (actionData && actionData.data != null) {
        const { data } = actionData;
        setPhotosFeed((currentPhotos) => [...currentPhotos, ...data]);
        if (data.length < 6) setInfinite(false);
      }
    }

    getPagePhotos(page, user);
  }, [page, user]);

  React.useEffect(() => {
    if (infinite) {
      window.addEventListener('scroll', infiniteScroll);
      window.addEventListener('wheel', infiniteScroll);
    } else {
      window.removeEventListener('scroll', infiniteScroll);
      window.removeEventListener('wheel', infiniteScroll);
    }
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
      window.removeEventListener('wheel', infiniteScroll);
      clearTimeout(time);
    };
  }, [infinite]);

  return (
    <div>
      <FeedPhotos photos={photosFeed} />
      {loading && <p>Carregando...</p>}
    </div>
  );
}
