<script lang="ts">
	import { LoginForm } from '$widgets/LoginForm';
	import { GitPullRequest } from 'lucide-svelte';
</script>

<div class="grid min-h-svh xl:grid-cols-3 fixed top-0 left-0 w-full bg-background">
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
				<LoginForm />
			</div>
		</div>
	</div>
	<div class="relative overflow-hidden hidden bg-muted xl:block">
		<GitPullRequest class="absolute -top-1/2 -left-1/2 -rotate-45 w-full h-full opacity-10 z-0" />
		<GitPullRequest class="absolute top-1/2 -left-1/2 -rotate-45 w-full h-full opacity-10" />
		<GitPullRequest class="absolute top-0 left-1/4 -rotate-45 w-full h-full opacity-10" />

		<div
			class="w-full h-full absolute top-0 left-0 z-10 p-16 pt-32 text-lg 2xl:text-xl dark:bg-black dark:bg-opacity-50 flex flex-col gap-6">
			<p><strong>MergeMinds</strong> &mdash; это как moodle. Только лучше.</p>
			<div>
				<strong>MergeMinds</strong> &mdash; с фичами Git:
				<ul class="list-disc mt-4 ml-8">
					<li>История попыток</li>
					<li>Сравнение решений</li>
					<li>Групповые проекты</li>
				</ul>
			</div>
			<p><strong>MergeMinds</strong> &mdash; то, что нужно любому преподавателю.</p>
			<p>
				Больше информации
				<a
					href="/register"
					class="underline underline-offset-4">
					тут
				</a>. Присоединяйтесь!
			</p>
		</div>
	</div>
</div>
