import { Photo } from '@/actions/photos-get';
import Image from 'next/image';
import Link from 'next/link';
import styles from './feed-photos.module.css';

export default function FeedPhotos({ photos }: { photos: Photo[] }) {
  return (
    <ul className={`${styles.feed} animeLeft`}>
      {photos.map((photo, i) => (
        <li className={styles.photo} key={photo.id + i + Math.random()}>
          <Link href={`/foto/${photo.id}`} scroll={false}>
            <Image
              src={photo.src}
              width={1500}
              height={1500}
              alt={photo.title}
              sizes="80vw"
            />
            <span className={styles.view}>{photo.acessos}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
