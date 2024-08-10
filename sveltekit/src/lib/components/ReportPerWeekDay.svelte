<script lang="ts">
	import { Chart } from 'flowbite-svelte';
	import type { ApexOptions } from 'apexcharts';

	export let data: {amount: number, reception_date: Date}[];
	export let dark: boolean = false;
	export let title: string
	export let isPrinting: boolean = true
	
	let options: ApexOptions = {
		colors: [ "#43A047",],
		series: [],
		chart: {
			type: "area",
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
			width: 4,
		},
		dataLabels: { enabled: true, offsetX: 2, },
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
	
	const weekDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

	$: options.series = refreshData(data)

	const refreshData = (data: {amount: number, reception_date: Date}[]) => {
		let perWeekDay: {[key: number]: number} = {
			0: 0,
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0
		}
		for (const item of data) {
			const day = item.reception_date.getDay()
			perWeekDay[day] += item.amount
		}
		return [{
			name: "total",
			data: Object.entries(perWeekDay).map(([k, v]) => {
				return {x: weekDays[k as unknown as number], y: v}
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
			>Récupérations par jour de la semaine</span
		>
	</div>
</div>
<Chart {options}></Chart>