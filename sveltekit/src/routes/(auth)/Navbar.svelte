<script>
	// import Notifications from './utils/dashboard/NotificationList.svelte';
	import AppsMenu from '$lib/widgets/AppsMenu.svelte';
	import UserMenu from '$lib/widgets/UserMenu.svelte';
	import {
		DarkMode,
		NavBrand,
		NavHamburger,
		Navbar,
	} from 'flowbite-svelte';
    import { user } from '$lib/pocketbase';

	export let fluid = true;
	export let drawerHidden = false;
	export let list = true;
</script>

<Navbar {fluid} class="text-black" color="default" let:NavContainer>
	<NavContainer class="mb-px mt-px px-1" {fluid}>
		<NavHamburger
			onClick={() => (drawerHidden = !drawerHidden)}
			class="m-0 me-3 md:block lg:hidden"
		/>
		<NavBrand href="/" class={list ? 'w-40' : 'lg:w-60'}>
			<span
				class="ml-px self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl"
			>
            Récupérations
			</span>
		</NavBrand>
        <div class="ms-auto flex">
            <!-- <img
				src="/images/flowbite-svelte-icon-logo.svg"
				class="me-2.5 h-6 sm:h-8"
				alt="Logo"
			/> -->
            <span class="text-xl">
                Moisson Mitis
            </span>
        </div>
		<div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
			<!-- <Notifications /> -->
			<AppsMenu />
			<DarkMode />
			<UserMenu name={$user?.name} email={$user?.email} />
		</div>
	</NavContainer>
</Navbar>