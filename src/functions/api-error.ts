export default function apiError(error: unknown): {
  data: null;
  ok: false;
  error: string;
} {
  if (error instanceof Error) {
    return {
      ok: false,
      error: error.message,
      data: null,
    };
  } else {
    return {
      ok: false,
      error: 'Erro genérico',
      data: null,
    };
  }
}
