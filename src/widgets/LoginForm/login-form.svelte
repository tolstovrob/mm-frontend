<script lang="ts">
	import { Input } from '$shared/components/ui/input';
	import { Label } from '$shared/components/ui/label';
	import { Button } from '$shared/components/ui/button';
	import { PasswordInput } from '$shared/components/ui/password-input';
	import * as Auth from '$features/Auth';
	import { Loader2 } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	type Props = {
		formState: Auth.LoginEmailRequest;
	};

	let showPassword: boolean = $state(false);
	let { formState = $bindable() }: Props = $props();
	const sender = Auth.login(formState);

	$effect(() => {
		if ($sender.data?.status === 200) {
			goto('/');
		}
	});

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		await $sender.mutateAsync(formState);
	};
</script>

<form
	class="flex flex-col gap-6"
	method="post"
	onsubmit={handleSubmit}>
	<div class="flex flex-col items-center gap-2 text-center">
		<h1 class="text-2xl font-bold">Войдите в аккаунт</h1>
		<p class="text-balance text-sm text-muted-foreground">Для полного доступа к платформе</p>
	</div>
	<div class="grid gap-6">
		<div class="grid gap-2">
			<Label for="email">Адрес электронной почты</Label>
			<Input
				id="email"
				type="email"
				bind:value={formState.email}
				placeholder="mm@alivetech.org" />
			{#if $sender.data && 'email' in $sender.data}
				<p class="text-sm text-red-600">{$sender.data.email}</p>
			{/if}
		</div>
		<div class="grid gap-2">
			<div class="flex items-center">
				<Label for="password">Пароль</Label>
				<a
					href="/login#"
					class="ml-auto text-sm underline-offset-4 hover:underline">
					Забыли пароль?
				</a>
			</div>
			<PasswordInput
				id="password"
				type="password"
				bind:value={formState.password}
				{showPassword}
				toggleShowPassword={(event) => {
					event.preventDefault();
					showPassword = !showPassword;
				}} />
			{#if $sender.data && 'password' in $sender.data}
				<p class="text-sm text-red-600">{$sender.data.password}</p>
			{/if}
		</div>
		<Button
			type="submit"
			disabled={$sender.isPending}
			class="w-full">
			{#if $sender.isPending}
				<Loader2 class="animate-spin" />
			{:else}
				Войти
			{/if}
		</Button>
		<div
			class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
			<span class="relative z-10 bg-background px-2 text-muted-foreground">
				Другие способы входа
			</span>
		</div>
		<Button
			variant="outline"
			type="submit"
			class="w-full">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24">
				<path
					d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
					fill="currentColor" />
			</svg>
			Войти через Github
		</Button>
	</div>
	<div class="text-center text-sm">
		Ещё нет аккаунта?{' '}
		<a
			href="/register"
			class="underline underline-offset-4">
			Регистрация
		</a>
	</div>
</form>
