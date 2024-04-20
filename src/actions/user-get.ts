'use server';

import { USER_GET } from '@/functions/api';
import apiError from '@/functions/api-error';
import { cookies } from 'next/headers';

export type User = {
  id: number;
  email: string;
  username: string;
  nome: string;
};

export default async function userGet() {
  try {
    const { url } = USER_GET();
    const token = cookies().get('token')?.value;
    if (!token) throw new Error('Token não encontrado.');
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) throw new Error('Erro ao pegar usuário.');
    const data = (await response.json()) as User;
    return {
      ok: true,
      error: '',
      data,
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
