export type CatalogItem = {
    id: string,
    titulo: string,
    descricao?: string | null,
    tags?: string[] | null,
    rustdesk_id?: string | null,
    anydesk_id?: string | null,
};