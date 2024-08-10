<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import Reports from '$lib/components/Reports.svelte';

	let recup: {category: string, provider: string, amount: number, reception_date: Date}[] = []

	const now = new Date();

	let year = now.getFullYear();
	if (now.getMonth() < 3) year--;

	pb.collection('recup').getFullList({filter: `reception_date > "${year - 1}-01-04 00:00:00" && reception_date < "${year}-01-04 00:00:00"`, expand: "category, provider"}).then((res) => {
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

<Reports data={recup} title="Année fiscale précédente" startMonth={3} />