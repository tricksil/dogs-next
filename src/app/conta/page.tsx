'use client';
import { useUser } from '@/context/user-context';

export default function ContaPage() {
  const { user } = useUser();
  return (
    <section>
      <h1>Conta: {user?.username}</h1>
    </section>
  );
}
