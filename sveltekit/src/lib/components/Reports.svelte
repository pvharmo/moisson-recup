<script lang="ts">
	import { Card, type SizeType } from 'flowbite-svelte';
	import { darkMode } from '$lib/stores';

	import ReportPerProvider from '$lib/components/ReportPerProvider.svelte';
	import ReportPerCategory from '$lib/components/ReportPerCategory.svelte';
	import ReportPerYear from '$lib/components/ReportPerYear.svelte';
	import ReportPerMonth from '$lib/components/ReportPerMonth.svelte';
	import ReportPerWeekDay from '$lib/components/ReportPerWeekDay.svelte';

	export let data: {category: string, provider: string, amount: number, reception_date: Date}[] = []
    export let title: string
	export let showPerYear: boolean = false
	export let startMonth: number = 0
	
	// @ts-ignore
	let size: SizeType = "xxl"
</script>

<div class="space-y-4 m-4">
	<!-- <div class="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
		<ChartWidget {chartOptions} title="$45,385" subtitle="Sales this week" />

		<Stats />
	</div>
	<div class="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
		<Card horizontal class="items-center justify-between" size="xl">
			<div class="w-full">
				<p>New products</p>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
					2,340
				</p>
				<Change size="sm" value={12.5} since="Since last month" />
			</div>
			<Chart options={thickbars} class="w-full" />
		</Card>
		<Card horizontal class="items-center justify-between" size="xl">
			<div class="w-full">
				<p>Users</p>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
					4,420
				</p>
				<Change size="sm" value={-3.4} since="Since last month" />
			</div>
		</Card>
		<Card horizontal class="items-center justify-between" size="xl">
			<div class="w-full">
				<p>Users</p>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
					4,420
				</p>
				<Change size="sm" value={-3.4} since="Since last month" class="w-full" />
			</div>
		</Card>
	</div> -->
	<div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
		<Card horizontal class="items-center justify-between col-span-2" {size}>
			<div class="w-full">
				<ReportPerProvider {title} dark={$darkMode} data={data} />
			</div>
		</Card>
		<Card horizontal class="items-center justify-between" size="xl">
			<div class="w-full">
				<ReportPerCategory {title} dark={$darkMode} data={data} />
			</div>
		</Card>
		{#if showPerYear}
		<Card horizontal class="items-center justify-between" size="xl">
			<div class="w-full">
				<ReportPerYear {title} dark={$darkMode} data={data} />
			</div>
		</Card>
		{/if}
		<Card horizontal class="items-center justify-between" size="xl">
			<div class="w-full">
				<ReportPerMonth {startMonth} {title} dark={$darkMode} data={data} />
			</div>
		</Card>
		<Card horizontal class="items-center justify-between" size="xl">
			<div class="w-full">
				<ReportPerWeekDay {title} dark={$darkMode} data={data} />
			</div>
		</Card>
	</div>
	<!-- <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
		<ActivityList />
	</div> -->
</div>