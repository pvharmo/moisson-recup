<script lang="ts">
	import { Chart } from 'flowbite-svelte';
	import type { ApexOptions } from 'apexcharts';
	import SmallPanel from './SmallPanel.svelte';

	export let dark: boolean = false
	export let title: string
	export let isPrinting: boolean = false

	export let data: {amount: number, category: string}[];

	let options: ApexOptions = {
		labels: [],
		series: [],
		colors: ['#FF5722', '#673AB7', '#009688', '#4CAF50', '#FFC107', '#CDDC39', '#3F51B5', '#E91E63', '#00BCD4', '#03A9F4', '#FF9800', '#FFEB3B', '#F44336', '#795548', '#9C27B0', '#8BC34A', '#2196F3'],
		chart: {
			type: 'donut',
			height: 400,
			fontFamily: 'Inter, sans-serif',
			toolbar: { show: !isPrinting }
		},
		responsive: [
			{
				breakpoint: 430,
				options: { chart: { height: 300 } }
			}
		],
		stroke: {
			colors: [{ strokeColor: dark ? '#1f2937' : '#ffffff' }]
		},
		states: {
			hover: {
				filter: {
					type: 'darken',
					value: 0.9
				}
			}
		},
		tooltip: {
			shared: true,
			followCursor: false,
			fillSeriesColor: false,
			inverseOrder: true,
			style: {
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif'
			},
			x: {
				show: true,
				formatter: function (_: any, { seriesIndex, w }: { seriesIndex: number; w: any }) {
					const label = w.config.labels[seriesIndex];
					return label;
				}
			},
			y: {
				formatter: function (value: number) {
					return value + 'kg ou L';
				}
			}
		},
		grid: {
			show: false
		},
		dataLabels: {
			enabled: false
		}
	};

	$: refreshData(data)

	let tops: [string, number][] = []

	const refreshData = (data: {amount: number, category: string}[]) => {
		let perCategory: {[key: string]: number} = {}
		for (const item of data) {
			perCategory[item.category] = (perCategory[item.category] || 0) + item.amount
		}

		const series = []
		const labels = []

		tops = Object.entries(perCategory).sort((a, b) => b[1] - a[1]).slice(0, 3)
		
		for (const key in perCategory) {
			series.push(perCategory[key])
			labels.push(key)
		}

		options.labels = labels
		options.series = series
	}
</script>

<div
	class="mb-4 items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700 sm:flex"
>
	<div class="mb-4 w-full sm:mb-0">
		<h3 class="text-base font-normal text-gray-500 dark:text-gray-400">{title}</h3>
		<span class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl"
			>Récupérations par catégorie</span
		>
	</div>
</div>
<Chart {options}></Chart>
<div class="mb-4 flex items-center justify-between pt-4 sm:pt-6 lg:justify-evenly">
	{#each tops as [top, amount], i}
		<SmallPanel title={top} subtitle={amount + "kg ou L"} change={0}>
			<span slot="icon">#{i + 1}</span>
		</SmallPanel>
	{/each}
</div>