<script lang="ts">
	import type { LoginEmailRequest } from '$features/Auth';
	import { LoginForm } from '$widgets/LoginForm';
	import { GitPullRequest } from 'lucide-svelte';

	let formState: LoginEmailRequest = $state({
		email: '',
		password: '',
	});
</script>

<div class="grid min-h-svh xl:grid-cols-3 fixed top-0 left-0 w-full">
	<div class="flex flex-col gap-4 col-span-2 p-6 md:p-10">
		<div class="flex justify-center gap-2 md:justify-start">
			<a
				title="MergeMinds"
				href="/"
				class="flex items-center gap-2 font-medium select-none">
				<div
					class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
					<GitPullRequest class="size-4" />
				</div>
				MergeMinds
			</a>
		</div>
		<div class="flex flex-1 items-center justify-center">
			<div class="w-full max-w-xs">
				<LoginForm bind:formState />
			</div>
		</div>
	</div>
	<div class="relative overflow-hidden hidden bg-muted xl:block">
		<GitPullRequest class="absolute -top-1/2 -left-1/2 -rotate-45 w-full h-full opacity-10 z-0" />
		<GitPullRequest class="absolute top-1/2 -left-1/2 -rotate-45 w-full h-full opacity-10" />
		<GitPullRequest class="absolute top-0 left-1/4 -rotate-45 w-full h-full opacity-10" />

		<div
			class="w-full h-full absolute top-0 left-0 z-10 p-16 pt-32 text-lg 2xl:text-xl dark:bg-black dark:bg-opacity-50">
			<p>
				<strong>MergeMinds</strong> &mdash; это как
				<a
					title="Moodle"
					href="https://moodle.org"
					class="underline-offset-4 underline"
					rel="noreferrer noopener">
					Moodle
				</a>, только лучше.
			</p>
			<p class="mt-12">
				<strong>MergeMinds</strong> &mdash; с фичами Git. История попыток, сравнение решений и работа
				с проектами &mdash; мечта преподавателя в большой группе.
			</p>
			<p class="mt-12">
				Больше информации можно найти
				<a
					title="Дополнительная информация о платформе"
					href="/about"
					class="underline-offset-4 underline">
					тут
				</a>. Присоединяйтесь!
			</p>
		</div>
	</div>
</div>
