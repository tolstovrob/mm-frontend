<script lang="ts">
	import { Input } from '$shared/components/ui/input';
	import { Label } from '$shared/components/ui/label';
	import { Button } from '$shared/components/ui/button';
	import { PasswordInput } from '$shared/components/ui/password-input';
	import * as Auth from '$features/Auth';
	import { goto } from '$app/navigation';
	import * as FieldSet from '$shared/components/ui/field-set';
	import { Loader2 } from 'lucide-svelte';

	let showPassword: boolean = $state(false);
	let formState: Auth.IRegisterForm = $state({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
	});

	const sender = Auth.register(formState);

	$effect(() => {
		if ($sender.data?.status === 200) {
			goto('/login');
		}
	});

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		await $sender.mutateAsync(formState);
	};
</script>

<form
	class="w-full max-w-screen-md mx-auto my-8 p-6"
	method="post"
	onsubmit={handleSubmit}>
	<FieldSet.Root>
		<FieldSet.Title class="p-6 pt-10">Создать аккаунт</FieldSet.Title>
		<FieldSet.Content>
			<div class="grid gap-6">
				<div class="grid gap-2 w-full max-w-72">
					<Label for="email">Адрес электронной почты</Label>
					<Input
						id="email"
						type="text"
						bind:value={formState.email}
						placeholder="aboba@example.org" />
					{#if $sender.data && 'email' in $sender.data}
						<p class="text-sm text-red-600">{$sender.data.email}</p>
					{/if}
				</div>
				<div class="flex gap-6">
					<div class="grid gap-2 w-full max-w-72">
						<Label for="firstName">Имя</Label>
						<Input
							id="firstName"
							type="text"
							bind:value={formState.firstName}
							placeholder="Albert" />
						{#if $sender.data && 'firstName' in $sender.data}
							<p class="text-sm text-red-600">{$sender.data.firstName}</p>
						{/if}
					</div>
					<div class="grid gap-2 w-full max-w-72">
						<Label for="lastName">Фамилия</Label>
						<Input
							id="lastName"
							type="text"
							bind:value={formState.lastName}
							placeholder="Einstein" />
						{#if $sender.data && 'lastName' in $sender.data}
							<p class="text-sm text-red-600">{$sender.data.lastName}</p>
						{/if}
					</div>
				</div>
				<div class="flex gap-6">
					<div class="grid gap-2 w-full max-w-72">
						<Label for="password">Пароль</Label>
						<PasswordInput
							id="password"
							type="password"
							{showPassword}
							toggleShowPassword={() => (showPassword = !showPassword)}
							bind:value={formState.password} />
						{#if $sender.data && 'password' in $sender.data}
							<p class="text-sm text-red-600">{$sender.data.password}</p>
						{/if}
					</div>
					<div class="grid gap-2 w-full max-w-72">
						<Label for="confirmPassword">Повтор пароля</Label>
						<PasswordInput
							id="confirmPassword"
							type="password"
							{showPassword}
							toggleShowPassword={() => (showPassword = !showPassword)}
							bind:value={formState.confirmPassword} />
						{#if $sender.data && 'confirmPassword' in $sender.data}
							<p class="text-sm text-red-600">{$sender.data.confirmPassword}</p>
						{/if}
					</div>
				</div>
			</div>
			{#if $sender.data && 'global' in $sender.data}
				<p class="text-sm mt-4 text-red-600">{$sender.data.global}</p>
			{/if}
		</FieldSet.Content>
		<FieldSet.Footer>
			<div
				class="flex w-full justify-between flex-col gap-2 items-stretch md:flex-row md:items-center">
				<span class="text-sm text-muted-foreground">
					Продолжая, вы соглашаетесь с
					<a
						title="Пользовательское соглашение"
						href="/user-agreement"
						class="underline-offset-4 underline">пользовательским соглашением</a>
				</span>
				<Button
					type="submit"
					class="w-36"
					disabled={$sender.isPending}>
					{#if $sender.isPending}
						<Loader2 class="animate-spin" />
					{:else}
						Регистрация
					{/if}
				</Button>
			</div>
		</FieldSet.Footer>
	</FieldSet.Root>
	<div class="text-center text-sm mt-8">
		Уже есть аккаунт?{' '}
		<a
			href="/login"
			class="underline underline-offset-4">
			Войти
		</a>
	</div>
</form>
