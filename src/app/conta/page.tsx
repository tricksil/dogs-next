import photosGet from '@/actions/photos-get';
import userGet from '@/actions/user-get';
import Feed from '@/components/feed/feed';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Minha conta',
};

export default async function ContaPage() {
  const { data: user } = await userGet();
  const { data } = await photosGet({ user: user?.username });

  return (
    <section>
      {data?.length ? (
        <Feed photos={data} />
      ) : (
        <div>
          <p
            style={{ color: '#444', fontSize: '1.25rem', marginBottom: '1rem' }}
          >
            Nenhuma foto encontrda.
          </p>
          <Link
            href="/conta/postar"
            className="button"
            style={{ display: 'inline-block' }}
          >
            Postar Foto
          </Link>
        </div>
      )}
    </section>
  );
}
