<script lang="ts">
	import { Chart } from 'flowbite-svelte';
	import type { ApexOptions } from 'apexcharts';
	import More from '$lib/widgets/More.svelte';
	import { page } from '$app/stores';

	export let data: {amount: number, provider: string}[];
	export let title: string
	export let isPrinting: boolean = false
	export let dark: boolean = false

	let options: ApexOptions = {
		colors: [ "#FF5722", "#673AB7", "#009688", "#4CAF50", "#FFC107", "#CDDC39", "#3F51B5", "#E91E63", "#00BCD4", "#03A9F4", "#FF9800", "#FFEB3B", "#F44336", "#795548", "#9C27B0", "#8BC34A", "#2196F3"],
		series: [],
		chart: {
			type: "bar",
			height: 420,
			fontFamily: "Inter, sans-serif",
			toolbar: { show: !isPrinting }
		},
		plotOptions: {
			bar: {
				columnWidth: "90%",
				borderRadius: 2,
				distributed: true
			}
		},
		tooltip: {
			style: {
				fontSize: "14px",
				fontFamily: "Inter, sans-serif"
			}
		},
		states: {
			hover: {
				filter: {
					type: "darken",
					value: 1
				}
			}
		},
		stroke: {
			show: true,
			width: 5,
			colors: dark ? [{ strokeColor: '#f1f5f9' }] : undefined
		},
		dataLabels: { enabled: isPrinting, offsetX: 2, },
		legend: { show: false },
		xaxis: {
			labels: {
				style: {
					colors: dark ? "#ffffff" : "#000000"
				}
			}
		},
		yaxis: {
			labels: {
				style: {
					colors: dark ? "#ffffff" : "#000000"
				}
			}
		},
		fill: {
			opacity: 1
		}
	};

	$: options.series = refreshData(data)

	const refreshData = (data: {amount: number, provider: string}[]) => {
		let perProvider: any = {}
		for (const item of data) {
			perProvider[item.provider] = (perProvider[item.provider] || 0) + item.amount
		}
		return [{
			name: "total",
			data: Object.entries(perProvider).map(([k, v]) => {
				return {x: k, y: v}
			})
		}]
	}

</script>

<div
	class="items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700 sm:flex"
>
	<div class="mb-4 w-full sm:mb-0">
		<h3 class="text-base font-normal text-gray-500 dark:text-gray-400">{title}</h3>
		<span class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl"
			>Récupérations par fournisseur</span
		>
		<!-- <Change value={2.5} since="Since last month" size="sm" /> -->
	</div>
	{#if !isPrinting}
		<More title="Imprimer" href={$page.url.href + "/imprimer"} />
	{/if}
</div>
<Chart {options}></Chart>
