<script lang="ts">
	import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-svelte';
	import { logout } from '$lib/pocketbase';

	export let name: string = ''; // "Neil Sims",
	export let avatar: string | undefined = undefined; // "neil-sims.png",
	export let email: string = ''; // "neil.sims@flowbite.com",
	
</script>

<button class="ms-3 rounded-full ring-gray-400 focus:ring-4 dark:ring-gray-600">
	<Avatar size="sm" src={avatar || "/images/avatar.png"} tabindex="0" />
</button>
<Dropdown placement="bottom-end">
	<DropdownHeader>
		<span class="block text-sm">{name}</span>
		<span class="block truncate text-sm font-medium">{email}</span>
	</DropdownHeader>
	<DropdownItem>Tableau de bord</DropdownItem>
	<DropdownItem>Documentation</DropdownItem>
	<DropdownDivider />
	<DropdownItem on:click={logout}>Déconnexion</DropdownItem>
</Dropdown>

<!--
@component
[Go to docs](https://flowbite-svelte-admin-dashboard.vercel.app/)
## Props
@prop export let id: number = 0;
@prop export let name: string = '';
@prop export let avatar: string = '';
@prop export let email: string = '';
@prop export let biography: string = '';
@prop export let position: string = '';
@prop export let country: string = '';
@prop export let status: string = '';
-->