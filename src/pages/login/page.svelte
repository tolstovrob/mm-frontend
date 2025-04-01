<script lang="ts">
	import { LoginForm } from '$widgets/LoginForm';
	import { GitPullRequest } from 'lucide-svelte';
</script>

<div class="fixed left-0 top-0 z-20 grid min-h-svh w-full bg-background xl:grid-cols-3">
	<div class="col-span-2 flex flex-col gap-4 p-6 md:p-10">
		<div class="flex justify-center gap-2 md:justify-start">
			<a
				title="MergeMinds"
				href="/"
				class="flex select-none items-center gap-2 font-medium">
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
	<div class="relative hidden overflow-hidden bg-muted xl:block">
		<GitPullRequest class="absolute -left-1/2 -top-1/2 z-0 h-full w-full -rotate-45 opacity-10" />
		<GitPullRequest class="absolute -left-1/2 top-1/2 h-full w-full -rotate-45 opacity-10" />
		<GitPullRequest class="absolute left-1/4 top-0 h-full w-full -rotate-45 opacity-10" />

		<div
			class="absolute left-0 top-0 z-10 flex h-full w-full flex-col gap-6 p-16 pt-32 text-lg dark:bg-black dark:bg-opacity-50 2xl:text-xl">
			<p><strong>MergeMinds</strong> &mdash; это как moodle. Только лучше.</p>
			<div>
				<strong>MergeMinds</strong> &mdash; с фичами Git:
				<ul class="ml-8 mt-4 list-disc">
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
