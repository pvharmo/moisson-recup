<script lang="ts">
	import { Input, Label, Select, TableBodyCell, TableBodyRow, Button, TableHeadCell } from 'flowbite-svelte';
	import type { FrameColor } from "flowbite-svelte/Frame.svelte";
	import { TrashBinOutline, EditOutline } from 'flowbite-svelte-icons';

	import Alert from '$lib/widgets/Alert.svelte';

	import FullTable from '$lib/widgets/FullTable.svelte';
	import { pb } from '$lib/pocketbase';
	import { fade } from 'svelte/transition';

	type AlertType = "success" | "error" | "warning" | FrameColor

	let alerts: {id: string, type: AlertType, message: string}[] = []


	let categories: {id: string, name: string}[] = []
	pb.collection('categories').getFullList().then((res) => {
		categories = res.map((c) => {
			return {
				id: c.id,
				name: c.name
			}
		});
	});

	let providers: {id: string, name: string}[] = []
	pb.collection('providers').getFullList().then((res) => {
		providers = res.map((c) => {
			return {
				id: c.id,
				name: c.name
			}
		});
	});
	
	let recup: {id: string, category: string, provider: string, amount: number, reception_date: Date}[] = []
	let currentPage = 1;
	let pagination = {start: 1, end: 10, total: 0}

	let categoryFilter = "";
	let providerFilter = "";

	const fetchRecup = async (page: number) => {
		let res = await pb.collection('recup').getList(page, 10, {
			expand: "category, provider",
			filter: categoryFilter ? "category = '" + categoryFilter + "'" : "" +  providerFilter ? "provider = '" + providerFilter + "'" : "",
			sort: "-reception_date, provider, category"
		})
		pagination = {
			start: (res.page - 1) * res.perPage + 1,
			end: Math.min(res.page * res.perPage, res.totalItems),
			total: res.totalItems
		}
		recup = res.items.map((r) => {
			let reception_date = new Date(r.reception_date)
			reception_date.setUTCHours(12)
			return {
				id: r.id,
				category: r.expand?.category.name,
				provider: r.expand?.provider.name,
				amount: r.amount,
				reception_date
			}
		});

		currentPage = res.page;
	}

	fetchRecup(currentPage);

	let createAlert = (type: AlertType, message: string) => {
		const id = self.crypto.randomUUID()
		alerts = [ ...alerts, { id, type, message } ]
		setTimeout(() => {
			const this_id = id;
			alerts = alerts.filter(x => x.id !== this_id)
		}, 15 * 1000);
	}

	let addRecup = async (e: any) => {
		e.preventDefault();
		let form = e.target;
		let amount = form.amount.value;
		let category = form.category.value;
		let provider = form.provider.value;
		let reception_date = new Date(form.reception_date.value);
		reception_date.setUTCHours(12)
		let res = await pb.collection('recup').create({ amount, category, provider, reception_date })

		if (res.error) {
			createAlert('error', res.error)
			return;
		}
		createAlert('success', amount + '(kg ou L) de ' + categories?.find((c) => c.id == category)?.name.toLowerCase() + ' ajouté avec succès pour ' + providers?.find((c) => c.id == provider)?.name)

		fetchRecup(currentPage);
		
		form.reset();
		form.category.value = ""
		form.provider.value = ""
	}

	let canDelete = false;

	let deleteRecup = async (id: string) => {
		let res = await pb.collection('recup').delete(id).catch((e) => {
			return false;
		});
		if (!res) {
			createAlert('error', 'Erreur lors de la suppression')
			return;
		}
		createAlert('success', 'Récupération supprimée avec succès')
		fetchRecup(currentPage);
	}
</script>

<div style="position: fixed; top: 60px; right: 20px; z-index: 1000;">
	{#each alerts as alert (alert.id)}
	<div class="mb-4" transition:fade={{ delay: 250, duration: 300 }}>
		<Alert type={alert.type} >
			{alert.message}
		</Alert>
	</div>
	{/each}
</div>

<div class="mt-px space-y-4">
	<div class="grid grid-cols-1 gap-4 xl:grid-cols-5 m-4">
		<form class="m-8 col-span-2" on:submit={addRecup}>
			<div class="space-y-4">
				<Label class="space-y-2">
					<span>Date de réception</span>
					<Input name="reception_date" type="date" class="border font-normal outline-none" required />
				</Label>
				<Label class="space-y-2">
					<span>Quantité (kg ou L)</span>
					<Input name="amount" type="number" class="border font-normal outline-none" required />
				</Label>
				<Label class="space-y-2">
					<span>Catégorie</span>
					<Select name="category" class="border-gray-300 font-normal outline-none" required placeholder="Choisir une catégorie">
						{#each categories as {id, name}}
							<option value={id}>{name}</option>
						{/each}
					</Select>
				</Label>
				<Label class="space-y-2">
					<span>Fournisseur</span>
					<Select name="provider" class="border-gray-300 font-normal outline-none" required placeholder="Choisir un fournisseur">
						{#each providers as {id, name}}
							<option value={id}>{name}</option>
						{/each}
					</Select>
				</Label>
				<div class="py-1">
					<Input type="submit" value="Ajouter" class="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
				</div>
			</div>
		</form>
		<div class="col-span-3">
			<FullTable
				headers={['Date', 'Quantité (kg ou L)', 'Catégorie', 'Fournisseur']}
				header="Récupérations"
				{pagination}
				on:next={() => fetchRecup(currentPage + 1)}
				on:previous={() => fetchRecup(currentPage - 1)}
			>
				<svelte:fragment slot="filters">
					<div class="flex items-center">
						<Select
							name="category-filter"
							bind:value={categoryFilter}
							class="border-gray-300 font-normal outline-none"
							required
							placeholder="Filtrer par catégorie"
							on:change={() => fetchRecup(1)}
						>
							<option value={""}>Aucune</option>
							{#each categories as {id, name}}
								<option value={id}>{name}</option>
							{/each}
						</Select>
					</div>
					<div class="flex items-center">
						<Select
							name="provider-filter"
							bind:value={providerFilter}
							class="border-gray-300 font-normal outline-none"
							required
							placeholder="Filtrer par fournisseur"
							on:change={() => fetchRecup(1)}
						>
							<option value={""}>Aucun</option>
							{#each providers as {id, name}}
								<option value={id}>{name}</option>
							{/each}
						</Select>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="headers">
					<TableHeadCell class="whitespace-nowrap p-4 font-normal">
						<Button size="xs" color={canDelete ? "red" : "alternative"} on:click={() => canDelete = !canDelete}><EditOutline /></Button>
					</TableHeadCell>
				</svelte:fragment>
				{#each recup as {id, reception_date, amount, provider, category}}
				<TableBodyRow>
					<TableBodyCell class="px-4 font-normal text-gray-500 dark:text-gray-400">
						{reception_date.toLocaleDateString()}
					</TableBodyCell>
					<TableBodyCell class="px-4">{amount}</TableBodyCell>
					<TableBodyCell class="px-4 font-normal">{category}</TableBodyCell>
					<TableBodyCell class="px-4 font-normal text-gray-500 dark:text-gray-400">
						{provider}
					</TableBodyCell>
					<TableBodyCell class="px-4 font-normal">
						<Button color="red" size="xs" disabled={!canDelete} outline on:click={() => deleteRecup(id)}><TrashBinOutline /></Button>
					</TableBodyCell>
				</TableBodyRow>
				{/each}
			</FullTable>
		</div>
	</div>
</div>