<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { LoginAction } from '$lib/pocketbase';
</script>

<div class="page page-center">
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
                    <div class="mb-2">
                        {#if $page.form}
                  		<span style="color: red;">{$page.form.message}</span>
                   	{/if}
                    </div>
                    <div class="form-footer">
                        <button type="submit" class="btn btn-primary w-100">Se connecter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- <script src="./dist/js/tabler.min.js?1692870487" defer></script>
    <script src="./dist/js/demo.min.js?1692870487" defer></script> -->
