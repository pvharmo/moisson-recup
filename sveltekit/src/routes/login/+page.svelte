<!-- <script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { LoginAction } from '$lib/pocketbase';
</script> -->

<!-- <div class="page page-center">
    <div class="container container-tight py-4">
        <div class="text-center mb-4">
            <a href="." class="navbar-brand navbar-brand-autodark">Moisson Mitis</a>
        </div>
        <div class="card card-md">
            <div class="card-body">
                <h2 class="h2 text-center mb-4">Connexion</h2>
                <form method="POST" use:enhance={LoginAction}>
                    <div class="mb-3">
                        <label for="email" class="form-label">Adresse courriel</label>
                        <input name="email" type="email" class="form-control" placeholder="Adresse courriel" autocomplete="off" />
                    </div>
                    <div class="mb-2">
                        <label class="form-label" for="password">
                            Mot de passe
                            <span class="form-label-description">
                                <a href="./forgot-password.html">Mot de passe oublié</a>
                            </span>
                        </label>
                        <div class="input-group input-group-flat">
                            <input name="password" type="password" class="form-control"  placeholder="Mot de passe"  autocomplete="off">
                            <span class="input-group-text">
                            </span>
                        </div>
                    </div>
                    <div class="form-footer">
                        <button type="submit" class="btn btn-primary w-100">Se connecter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> -->
<!-- <script src="./dist/js/tabler.min.js?1692870487" defer></script>
    <script src="./dist/js/demo.min.js?1692870487" defer></script> -->

<script lang="ts">
    import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { LoginAction } from '$lib/pocketbase';
    import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
</script>

<Section name="login">
    <Register href="/">
        <svelte:fragment slot="top">
            <!-- <img class="w-8 h-8 mr-2" src="/images/logo.svg" alt="logo" /> -->
            Moisson Mitis
        </svelte:fragment>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="flex flex-col space-y-6" method="POST" use:enhance={LoginAction}>
                <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Connexion</h3>
                <Label class="space-y-2">
                    <span>Adresse courriel</span>
                    <Input type="email" name="email" placeholder="adresse@courriel.com" required />
                </Label>
                <Label class="space-y-2">
                    <div class="flex items-start">
                        <span>Mot de passe</span>
                        <!-- <div style="flex:1"></div>
                        <span class="form-label-description">
                            <a href="./forgot-password.html" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Mot de passe oublié?</a>
                        </span> -->
                    </div>
                    <Input type="password" name="password" placeholder="•••••" required />
                </Label>
                <div class="mb-2">
                    {#if $page.form}
                        <span style="color: red;">{$page.form.message}</span>
                    {/if}
                </div>
                <Button type="submit" class="w-full1">Connexion</Button>
            </form>
        </div>
    </Register>
</Section>
      
      