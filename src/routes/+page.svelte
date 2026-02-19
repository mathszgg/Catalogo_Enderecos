<script lang="ts">
	import type { PageData } from './$types';
	import { filtrarCatalogo } from '$lib/utils/search';

	export let data: PageData;

	let termo = '';
	$: resultados = filtrarCatalogo(data.itens ?? [], termo);
</script>

<div
	class="flex h-dvh w-screen items-center justify-center bg-linear-to-r from-green-500 to-green-700"
>
	<main
		class="mx-auto flex h-4/5 w-11/12 flex-col gap-3 rounded-lg bg-white/85 p-6 shadow-xl shadow-black/30 sm:w-4/5"
	>
		<h1 class="text-3xl font-bold">Catálogo</h1>

		<input
			class="w-full rounded-xl border border-gray-400 p-3 outline-none"
			bind:value={termo}
			placeholder="Pesquisar por nome, ID, rustdesk, anydesk..."
		/>

		<div
			class="grid gap-4 overflow-x-hidden overflow-y-auto px-2 py-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
		>
			{#each resultados as item (item.id)}
				<div
					class="rounded-2xl border border-gray-400 bg-gray-300 p-4 shadow-md transition-all hover:ring-1 hover:ring-green-500"
				>
					<div class="flex items-center gap-2">
						<h2 class="text-lg font-semibold">{item.titulo}</h2>
						<div class="flex gap-2 overflow-x-hidden text-sm">
							{#each item.tags ?? [] as tag}
								<span class="rounded-md border border-gray-400/80 bg-black/10 px-1">{tag}</span>
							{/each}
						</div>
					</div>

					{#if item.descricao}
						<div class="text-sm opacity-80">{item.descricao}</div>
					{/if}

					<div class="text-md mt-3">
						{#if item.rustdesk_id}<div class="text-sky-700">
								<b>RustDesk:</b>
								{item.rustdesk_id}
							</div>{/if}
						{#if item.anydesk_id}<div class="text-red-700">
								<b>AnyDesk:</b>
								{item.anydesk_id}
							</div>{/if}
					</div>
				</div>
			{/each}
		</div>

		{#if resultados.length === 0}
			<div class="mt-6 opacity-70">Nada encontrado.</div>
		{/if}
	</main>
</div>
