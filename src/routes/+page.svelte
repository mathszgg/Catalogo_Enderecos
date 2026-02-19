<script lang="ts">
	import type { PageData } from './$types';
	import { filtrarCatalogo } from '$lib/utils/search';
	import { Edit, Trash2 } from '@lucide/svelte'

	export let data: PageData;

	let termo = '';
	$: resultados = filtrarCatalogo(data.itens ?? [], termo);

	//modal
	let emEdicao = false;
	let selecionado: any = null;
	let idCopiado: string | null;

	function abrir(item: any) {
		selecionado = item;
		emEdicao = true;
	}

	function fechar() {
		emEdicao = false;
		selecionado = null;
	}

	function copiar(texto?: string) {
		if (!texto) return;
		navigator.clipboard.writeText(texto);
		idCopiado = texto;

		setTimeout(() => {
			idCopiado = '';
		}, 1500); // 1.5 segundos
	}
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
					class="relative group rounded-2xl border border-gray-400 bg-gray-300 p-4 shadow-md transition-all hover:ring-1 hover:ring-green-500"
				>

					<div class="hidden group-hover:flex bg-gray-200 border border-gray-300/80 rounded-md w-14 h-7 z-10 absolute top-3 right-2 items-center justify-center shadow-md">
						<button class="group/button1 rounded-full hover:bg-black/10 p-0.5 cursor-pointer">
							<Edit class="group-hover/button1:stroke-gray-500 stroke-gray-400" />
						</button>
						<button class="group/button2 rounded-full hover:bg-black/10 p-0.5 cursor-pointer">
							<Trash2 class="group-hover/button2:stroke-gray-500 stroke-gray-400" />
						</button>
					</div>

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
						{#if item.rustdesk_id}
							<button
								onclick={() => copiar(item.rustdesk_id ?? '')}
								class={idCopiado === item.rustdesk_id
									? 'cursor-text text-sky-600'
									: 'cursor-pointer text-sky-500'}
							>
								<b class="text-sky-500">RustDesk:</b>
								{idCopiado === item.rustdesk_id ? 'ID copiado' : item.rustdesk_id}
							</button>
						{/if}
						{#if item.anydesk_id}
							<button
								onclick={() => copiar(item.anydesk_id ?? '')}
								class={idCopiado === item.anydesk_id
									? 'cursor-text text-red-800'
									: 'cursor-pointer text-red-700'}
							>
								<b class="text-red-700">AnyDesk:</b>
								{idCopiado === item.anydesk_id ? 'ID copiado' : item.anydesk_id}
							</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		{#if resultados.length === 0}
			<div class="mt-6 opacity-70">Nada encontrado.</div>
		{/if}
	</main>
</div>
