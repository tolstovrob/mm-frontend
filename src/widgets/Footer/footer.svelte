<script>
	import { GitPullRequest } from 'lucide-svelte';
	import * as User from '$features/User';

	const session = User.session();
	let stringifiedSession = $derived(
		$session.isPending
			? 'загрузка...'
			: $session.data && 'firstName' in $session.data
				? $session.data.firstName + ' ' + $session.data.lastName
				: 'отсутствует',
	);
</script>

<footer class="w-full border-y-[1px] border-border">
	<div
		class="container flex flex-row justify-between items-center border-x-[1px] py-6 border-border">
		<div class="flex flex-col gap-4">
			<a
				title="MergeMinds"
				href="/"
				class="flex items-center gap-2 font-bold select-none text-xl">
				<div
					class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
					<GitPullRequest class="size-4" />
				</div>
				MergeMinds
			</a>
			<p class="text-muted-foreground">
				MergeMinds 2024&mdash;{new Date(Date.now()).getFullYear()}. Все права защищены
			</p>
		</div>

		Текущая сессия: {stringifiedSession}
	</div>
</footer>
