<script lang="ts">
	import LastRange from '$lib/widgets/LastRange.svelte';
	import {
		Button,
		Card,
		Checkbox,
		Dropdown,
		Heading,
		Pagination,
		Table,
		TableBody,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import {
		CalendarMonthOutline,
		ChevronDownOutline,
		ChevronLeftOutline,
		ChevronRightOutline
	} from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	export let headers: string[]

	export let header: string = ""
	export let subheader: string = ""
	export let pagination: {start: number, end: number, total: number} | undefined = undefined

	let dispatch = createEventDispatcher()

	let next = () => {
		dispatch('next')
	}	

	let previous = () => {
		dispatch('previous')
	}	

</script>

<Card size="xl" class="shadow-sm max-w-none">
	<div class="items-center justify-between lg:flex">
		<div class="mb-4 mt-px lg:mb-0">
			<Heading tag="h3" class="-ml-0.25 mb-2 text-xl font-semibold dark:text-white">
				{header}
			</Heading>
			<span class="text-base font-normal text-gray-500 dark:text-gray-400">
				{subheader}
			</span>
		</div>
		<div class="items-center justify-between gap-3 space-y-4 sm:flex sm:space-y-0">
			<slot name="filters"/>
		</div>
	</div>
	<Table
		hoverable={true}
		noborder
		striped
		class="mt-6 min-w-full divide-y divide-gray-200 dark:divide-gray-600"
	>
		<TableHead class="bg-gray-50 dark:bg-gray-700">
			{#each headers as header}
			<TableHeadCell class="whitespace-nowrap p-4 font-normal">{header}</TableHeadCell>
			{/each}
			<slot name="headers"/>
		</TableHead>
		<TableBody>
			<slot />
		</TableBody>
	</Table>
	<div class="-mb-1 flex items-center justify-between pt-3 sm:pt-6">
		<!-- <LastRange /> -->
		<div></div>
		{#if pagination}
		<div class="flex items-center justify-center gap-2">
			<div class="text-sm text-gray-700 dark:text-gray-400">
				Récupérations de <span class="font-semibold text-gray-900 dark:text-white">{pagination.start}</span>
				a
				<span class="font-semibold text-gray-900 dark:text-white">{pagination.end}</span>
				d'un total de
				<span class="font-semibold text-gray-900 dark:text-white">{pagination.total}</span>
				
			</div>
			<Pagination table large on:previous={previous} on:next={next} icon>
				<svelte:fragment slot="prev">
					<span class="sr-only">Previous</span>
					<ChevronLeftOutline class="w-6 h-6" />
				</svelte:fragment>
				<svelte:fragment slot="next">
					<span class="sr-only">Next</span>
					<ChevronRightOutline class="w-6 h-6" />
				</svelte:fragment>
			</Pagination>
		</div>
		{/if}
	</div>
</Card>