<script>
	import { MegaMenu, ToolbarButton } from 'flowbite-svelte';
	import {
		GridSolid,
		InboxOutline,
		ShoppingBagSolid,
		UsersGroupSolid
	} from 'flowbite-svelte-icons';
	import { page } from '$app/stores';

	const menu = [
		{ name: 'Récupérations', href: '/recup', icon: ShoppingBagSolid },
		{ name: 'Fiches Familiales', href: '/ff', icon: UsersGroupSolid },
	];
	
</script>

<ToolbarButton size="lg" class="-mx-0.5 hover:text-gray-900 dark:hover:text-white">
	<GridSolid size="lg" />
</ToolbarButton>
<MegaMenu items={menu} let:item ulClass="auto-cols-fr">
	<a
		href={item.href}
		class={"flex rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600 text-wrap m-1 w-32 h-28 align-middle " + ($page.url.pathname.startsWith(item.href || ".") ? "bg-gray-100 dark:bg-gray-600": "")}
	>
		<div class="my-auto">
			<svelte:component
				this={item.icon}
				class="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-gray-400"
			/>
			<div class="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
		</div>
	</a>
</MegaMenu>