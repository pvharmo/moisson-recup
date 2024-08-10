<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import Reports from '$lib/components/Reports.svelte';

	let recup: {category: string, provider: string, amount: number, reception_date: Date}[] = []

	pb.collection('recup').getFullList({expand: "category, provider"}).then((res) => {
		recup = res.map((r) => {
			return {
				category: r.expand?.category.name,
				provider: r.expand?.provider.name,
				amount: r.amount,
				reception_date: new Date(r.reception_date)
			}
		});
	});
</script>

<Reports data={recup} title="Toutes les récupérations" showPerYear />