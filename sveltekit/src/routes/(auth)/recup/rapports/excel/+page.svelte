<script lang="ts">
	import { Button, Select, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import { pb } from "$lib/pocketbase"

    let providers: {id: string, name: string}[] = []
	pb.collection('providers').getFullList().then((res) => {
		providers = res.map((c) => {
			return {
				id: c.id,
				name: c.name
			}
		});
	});

    const now = new Date();
    
    let currentYear = now.getFullYear();
	if (now.getMonth() < 3) currentYear--;
    
    let providerFilter = "";
    let yearFilter = currentYear;

    let recup: {category: string, provider: string, total_amount: number, reception_date: Date}[] = []

    $: fetchData(yearFilter, providerFilter);

    let data: { [key: string]: { [key: number]: number } } = {
        Viandes: {},
        Boulangerie: {},
        "Fruits/Légumes": {},
        "Produits variés": {},
        "Produits variés congelés": {},
        "Produits laitiers": {},
    }

    let categories_matches = {
        Viande: "Viandes",
        Charcuterie: "Viandes",
        "Viande de chasse": "Viandes",
        Boulangerie: "Boulangerie",
        "Fruits/Légumes": "Fruits/Légumes",
        "Denrée": "Produits variés",
        "Mets préparés": "Produits variés",
        "Pr. variés congelés": "Produits variés congelés",
        Lait: "Produits laitiers",
        Oeufs: "Produits laitiers",
        Beurre: "Produits laitiers",
        "Produits laitiers": "Produits laitiers",
    }

    const fetchData = (yearFilter: number, providerFilter: string) => {
        console.log(`reception_date > "${yearFilter - 1}-01-04 00:00:00" && reception_date < "${yearFilter}-01-04 00:00:00" && provider = "${providerFilter}"`);
        pb.collection('excel').getFullList({filter: `reception_date > "${yearFilter - 1}-04-01 00:00:00" && reception_date < "${yearFilter}-04-01 00:00:00" && provider="${providerFilter}"`, expand: "category,provider"}).then((res) => {
            const raw_data = res.map((r) => {
                return {
                    category: r.expand?.category.name,
                    provider: r.expand?.provider.name,
                    total_amount: r.total_amount as number,
                    reception_date: new Date(r.reception_date)
                }
            });

            for (const r of raw_data) {
                // @ts-ignore
                const category = categories_matches[r.category]
                data[category][r.reception_date.getMonth() + 1] = r.total_amount
            }
        });

    }

    const generateCSV = () => {
        // Sample data - replace with your own
        let csvContent = Object.entries(data).map(([key, value]) => {
            console.log(key, value);
            return `${key},${value[3] || 0},${value[4] || 0},${value[5] || 0},${value[6] || 0},${value[7] || 0},${value[8] || 0},${value[9] || 0},${value[10] || 0},${value[11] || 0},${value[0] || 0},${value[1] || 0},${value[2] || 0}`;
        }).join('\n');

        csvContent = "Catégorie,Avril,Mai,Juin,Juillet,Août,Septembre,Octobre,Novembre,Décembre,Janvier,Février,Mars\n" + csvContent;

        // Create a Blob with the CSV data
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        // Create a download link
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `${providers.find(x => x.id == providerFilter)?.name}_${yearFilter - 1}-${yearFilter}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    let years = Array.from({ length: currentYear - 2016 }, (value, index) => index + 2018);

    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
</script>

<div class="flex m-10 space-x-4 justify-center">
    <Select bind:value={providerFilter} placeholder="Fournisseur" class="w-64">
        {#each providers as provider}
            <option value={provider.id}>{provider.name}</option>
        {/each}
    </Select>
    
    <Select bind:value={yearFilter} placeholder="Année" class="w-64">
        {#each years as year}
            <option value={year}>{year - 1} - {year}</option>
        {/each}
    </Select>
    
    <Button on:click={generateCSV} class="w-48">Download CSV</Button>
</div>

<Table>
    <TableHead>
        <TableHeadCell>Catégories</TableHeadCell>
        {#each Array.from({ length: 12 }, (value, index) => index + 3) as month}
            <TableHeadCell>
                {months[month % 12]} {yearFilter - 1 + Math.floor((month) / 12)}
            </TableHeadCell>
        {/each}
    </TableHead>
    <TableBody>
        <TableBodyRow>
            <TableBodyCell>Viande</TableBodyCell>
            {#each Array.from({ length: 12 }, (value, index) => index + 4) as month}
                <TableBodyCell>{data.Viandes[month] || 0}</TableBodyCell>
            {/each}
        </TableBodyRow>
        <TableBodyRow>
            <TableBodyCell>Boulangerie</TableBodyCell>
            {#each Array.from({ length: 12 }, (value, index) => index + 4) as month}
                <TableBodyCell>{data.Boulangerie[month] || 0}</TableBodyCell>
            {/each}
        </TableBodyRow>
        <TableBodyRow>
            <TableBodyCell>Fruits/Légumes</TableBodyCell>
            {#each Array.from({ length: 12 }, (value, index) => index + 4) as month}
                <TableBodyCell>{data["Fruits/Légumes"][month] || 0}</TableBodyCell>
            {/each}
        </TableBodyRow>
        <TableBodyRow>
            <TableBodyCell>Produits variés</TableBodyCell>
            {#each Array.from({ length: 12 }, (value, index) => index + 4) as month}
                <TableBodyCell>{data["Produits variés"][month] || 0}</TableBodyCell>
            {/each}
        </TableBodyRow>
        <TableBodyRow>
            <TableBodyCell>Produits variés congelés</TableBodyCell>
            {#each Array.from({ length: 12 }, (value, index) => index + 4) as month}
                <TableBodyCell>{data["Produits variés congelés"][month] || 0}</TableBodyCell>
            {/each}
        </TableBodyRow>
        <TableBodyRow>
            <TableBodyCell>Produits laitiers</TableBodyCell>
            {#each Array.from({ length: 12 }, (value, index) => index + 4) as month}
                <TableBodyCell>{data["Produits laitiers"][month] || 0}</TableBodyCell>
            {/each}
        </TableBodyRow>
    </TableBody>
</Table>