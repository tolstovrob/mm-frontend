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
		lastName: '',
		firstName: '',
		patronymic: '',
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
	class="mx-auto my-8 w-full max-w-screen-md p-6"
	method="post"
	onsubmit={handleSubmit}>
	<FieldSet.Root>
		<FieldSet.Title class="p-6 pt-10">Создать аккаунт</FieldSet.Title>
		<FieldSet.Content>
			<div class="grid gap-6">
				<div class="flex gap-6">
					<div class="flex w-full max-w-72 flex-col justify-start gap-2">
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
					<div class="flex w-full max-w-72 flex-col justify-start gap-2">
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
					<div class="flex w-full max-w-72 flex-col justify-start gap-2">
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
					<div class="flex w-full max-w-72 flex-col justify-start gap-2">
						<Label for="patronymic">Отчество (при наличии)</Label>
						<Input
							id="patronymic"
							type="text"
							bind:value={formState.patronymic}
							placeholder="Sergeevich" />
						{#if $sender.data && 'patronymic' in $sender.data}
							<p class="text-sm text-red-600">{$sender.data.patronymic}</p>
						{/if}
					</div>
				</div>
				<div class="flex gap-6">
					<div class="flex w-full max-w-72 flex-col justify-start gap-2">
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
					<div class="flex w-full max-w-72 flex-col justify-start gap-2">
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
				<p class="mt-4 text-sm text-red-600">{$sender.data.global}</p>
			{/if}
			{#if $sender.error}
				<p class="mt-4 text-sm text-red-600">{$sender.error}</p>
			{/if}
		</FieldSet.Content>
		<FieldSet.Footer>
			<div
				class="flex w-full flex-col items-stretch justify-between gap-2 md:flex-row md:items-center">
				<span class="text-sm text-muted-foreground">
					Продолжая, вы соглашаетесь с
					<a
						title="Пользовательское соглашение"
						href="/user-agreement"
						class="underline underline-offset-4">пользовательским соглашением</a>
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
	<div class="mt-8 text-center text-sm">
		Уже есть аккаунт?{' '}
		<a
			href="/login"
			class="underline underline-offset-4">
			Войти
		</a>
	</div>
</form>
