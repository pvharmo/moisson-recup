<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import PrintReadyReport from '$lib/components/PrintReadyReport.svelte';

	let recup: {category: string, provider: string, amount: number, reception_date: Date}[] = []

	const now = new Date();
	const ayearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

	pb.collection('recup').getFullList({filter: `reception_date > "${ayearAgo.toISOString().slice(0, 10)} 00:00:00"`, expand: "category, provider"}).then((res) => {
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


<PrintReadyReport data={recup} title="Récupérations des 12 derniers mois" />
