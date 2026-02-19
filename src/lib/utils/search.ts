import type { CatalogItem } from "$lib/types/catalog";

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

export function filtrarCatalogo(itens: CatalogItem[], termo: string) {
  const q = norm(termo);
  if (!q) return itens;

  return itens.filter((item) => {
    const haystack = norm(
      [
        item.id,
        item.titulo,
        item.descricao ?? "",
        item.rustdesk_id ?? "",
        item.anydesk_id ?? "",
        ...(item.tags ?? [])
      ].join(" ")
    );

    return haystack.includes(q);
  });
}