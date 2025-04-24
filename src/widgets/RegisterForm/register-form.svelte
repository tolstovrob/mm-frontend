<script lang="ts">
	import { Input } from '$shared/components/ui/input';
	import { Label } from '$shared/components/ui/label';
	import { Button } from '$shared/components/ui/button';
	import { PasswordInput } from '$shared/components/ui/password-input';
	import * as Auth from '$features/Auth';
	import { goto } from '$app/navigation';
	import * as FieldSet from '$shared/components/ui/field-set';
	import { Loader2 } from 'lucide-svelte';
	import type { IValidationError } from '$shared/api';

	let showPassword: boolean = $state(false);
	let formState: Auth.IRegisterForm = $state({
		email: '',
		lastName: '',
		firstName: '',
		patronymic: '',
		password: '',
		confirmPassword: '',
	});

	let errorState: Auth.IRegisterForm & { global: string } = $state({
		email: '',
		lastName: '',
		firstName: '',
		patronymic: '',
		password: '',
		confirmPassword: '',
		global: '',
	});

	const sender = Auth.register(formState);

	$effect(() => {
		if ($sender.status === 'success') {
			goto('/login');
		}
	});

	$effect(() => {
		Object.keys(errorState).forEach((item) => (errorState[item as keyof typeof errorState] = ''));

		if ($sender.isError) {
			if ($sender.error.code === 'VALIDATION_ERROR') {
				($sender.error as IValidationError).issues.map((item) => {
					if (typeof item.path[0] === 'string' && item.path[0] in errorState) {
						errorState[item.path[0] as keyof typeof errorState] = item.message;
					}
				});
			} else {
				errorState.global = 'Внутренняя ошибка сервера. Попробуйте позднее';
			}
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
			<div class="flex flex-col gap-6">
				<div class="flex flex-col gap-6 lg:flex-row">
					<div class="flex w-full flex-col justify-start gap-2 lg:max-w-72">
						<Label for="email">Адрес электронной почты</Label>
						<Input
							id="email"
							type="text"
							bind:value={formState.email}
							placeholder="aboba@example.org" />
						{#if errorState.email}
							<p class="text-sm text-red-600">{errorState.email}</p>
						{/if}
					</div>
					<div class="flex w-full flex-col justify-start gap-2 lg:max-w-72">
						<Label for="lastName">Фамилия</Label>
						<Input
							id="lastName"
							type="text"
							bind:value={formState.lastName}
							placeholder="Einstein" />
						{#if errorState.lastName}
							<p class="text-sm text-red-600">{errorState.lastName}</p>
						{/if}
					</div>
				</div>

				<div class="flex flex-col gap-6 lg:flex-row">
					<div class="flex w-full flex-col justify-start gap-2 lg:max-w-72">
						<Label for="firstName">Имя</Label>
						<Input
							id="firstName"
							type="text"
							bind:value={formState.firstName}
							placeholder="Albert" />
						{#if errorState.firstName}
							<p class="text-sm text-red-600">{errorState.firstName}</p>
						{/if}
					</div>
					<div class="flex w-full flex-col justify-start gap-2 lg:max-w-72">
						<Label for="patronymic">Отчество (при наличии)</Label>
						<Input
							id="patronymic"
							type="text"
							bind:value={formState.patronymic}
							placeholder="Sergeevich" />
						{#if errorState.patronymic}
							<p class="text-sm text-red-600">{errorState.patronymic}</p>
						{/if}
					</div>
				</div>
				<div class="flex flex-col gap-6 lg:flex-row">
					<div class="flex w-full flex-col justify-start gap-2 lg:max-w-72">
						<Label for="password">Пароль</Label>
						<PasswordInput
							id="password"
							type="password"
							{showPassword}
							toggleShowPassword={() => (showPassword = !showPassword)}
							bind:value={formState.password} />
						{#if errorState.password}
							<p class="text-sm text-red-600">{errorState.password}</p>
						{/if}
					</div>
					<div class="flex w-full flex-col justify-start gap-2 lg:max-w-72">
						<Label for="confirmPassword">Повтор пароля</Label>
						<PasswordInput
							id="confirmPassword"
							type="password"
							{showPassword}
							toggleShowPassword={() => (showPassword = !showPassword)}
							bind:value={formState.confirmPassword} />
						{#if errorState.confirmPassword}
							<p class="text-sm text-red-600">{errorState.confirmPassword}</p>
						{/if}
					</div>
				</div>
			</div>
			{#if errorState.global}
				<p class="mt-4 text-sm text-red-600">{errorState.global}</p>
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
