<script lang="ts">
	import ReportPerProvider from '$lib/components/ReportPerProvider.svelte';
	import ReportPerCategory from '$lib/components/ReportPerCategory.svelte';
	import ReportPerYear from '$lib/components/ReportPerYear.svelte';
	import ReportPerMonth from '$lib/components/ReportPerMonth.svelte';
	import ReportPerWeekDay from '$lib/components/ReportPerWeekDay.svelte';
    import html2pdf from 'html2pdf.js';
	import { Button } from 'flowbite-svelte';
	
	export let data: {category: string, provider: string, amount: number, reception_date: Date}[] = []
    export let title: string
	export let showPerYear: boolean = false
	export let startMonth: number = 0

    document.documentElement.classList.toggle('dark');

    const print = () => {
		let element = document.getElementById('to-print');
		const opt = {
			margin: 0.5,
			filename: 'rapport.pdf',
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
		}
		html2pdf().set(opt).from(element).save();
	}
</script>

<div style="width: 100vw; display:flex; flex-direction: column; align-items:center; margin-bottom: 15px;">
    <div style="width: 185mm; display: flex;" class="my-8">
        <div>
            <Button on:click={() => print()} color="blue">Imprimer</Button>
        </div>
        <div style="flex-grow: 1;"></div>
        <div>
            <a href="."><Button color="red">Retour</Button></a>
        </div>
    </div>
    <div style="width: calc(185mm + 60px); margin: auto; border: 2px solid #777777; padding: 30px; border-radius: 8px;">
        <div id="to-print" style="width: 185mm;">
            <ReportPerProvider {title} {data} dark={false} isPrinting={true} />
            <div style="page-break-before: always;">
                <ReportPerCategory {title} dark={false} {data} isPrinting={false} />
            </div>
            {#if showPerYear}
            <div style="page-break-before: always;">
                <ReportPerYear {title} dark={false} {data} isPrinting={true} />
            </div>
            {/if}
            <div style="page-break-before: always;">
                <ReportPerMonth {startMonth} {title} dark={false} {data} isPrinting={true} />
            </div>
            <div style="page-break-before: always;">
                <ReportPerWeekDay {title} dark={false} {data} isPrinting={true}/>
            </div>
        </div>
    </div>
</div>