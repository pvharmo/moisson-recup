<script>
	import { user } from '$lib/pocketbase';
</script>

<h1>Welcome to SvelteKit, {$user?.username}</h1>
