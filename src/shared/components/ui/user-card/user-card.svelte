<script lang="ts">
	import * as HoverCard from '$shared/components/ui/hover-card';
	import * as Avatar from '$shared/components/ui/avatar';
	import * as User from '$features/User';
	import { staticfile } from '$shared/api';
	import type { Snippet } from 'svelte';

	type Props = {
		user: User.IUserCredentials;
		children: Snippet;
	};

	let { user, children }: Props = $props();
</script>

<HoverCard.Root>
	<HoverCard.Trigger>
		{@render children()}
	</HoverCard.Trigger>
	<HoverCard.Content class="w-80">
		<div class="flex items-center justify-between gap-4">
			<Avatar.Root>
				<Avatar.Image src={staticfile(user.avatarURL)} />
				<Avatar.Fallback>
					{user.firstName && user.firstName[0]}{user.lastName && user.lastName[0]}
				</Avatar.Fallback>
			</Avatar.Root>
			<div class="space-y-1">
				<a
					href={`/users/${user.id}`}
					class="text-sm font-semibold hover:underline hover:underline-offset-4">
					{user.lastName}
					{user.firstName}
					{user.patronymic}
				</a>
				<a
					href={`mailto:${user.email}`}
					class="text-muted-foreground hover:underline hover:underline-offset-4">
					{user.email}
				</a>
			</div>
		</div>
	</HoverCard.Content>
</HoverCard.Root>
