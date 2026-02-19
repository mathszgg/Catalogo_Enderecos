// +page.server.ts

import type { PageServerLoad } from './$types';
import { databaseAdmin } from '$lib/database/dbServer';

export const load: PageServerLoad = async () => {
  const { data, error } = await databaseAdmin
    .from('catalogo_enderecos')
    .select('id, titulo, descricao, tags, rustdesk_id, anydesk_id')
    .order('titulo', { ascending: true });

  if (error) {
    // você pode logar e devolver fallback
    console.error(error);
    return { itens: [] };
  }

  return {
    itens: (data ?? []).map((i) => ({
      ...i,
      tags:
        Array.isArray(i.tags)
          ? i.tags
          : typeof i.tags === 'string' && i.tags.length
            ? i.tags.split(',').map((t) => t.trim())
            : []
    }))
  };
};