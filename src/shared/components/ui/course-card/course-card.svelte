<script lang="ts">
	import type { ICourseCredentials } from '$features/Course/types';
	import * as Card from '$shared/components/ui/card';
	import * as AvatarGroup from '$shared/components/ui/avatar-group';
	import * as icons from 'lucide-svelte';
	import type { SvelteComponent } from 'svelte';
	import { UserCard } from '$shared/components/ui/user-card';
	import { staticfile } from '$shared/api';

	type Props = { course: ICourseCredentials };

	let { course }: Props = $props();
	const Icon = (
		course.icon in icons ? icons[course.icon as keyof typeof icons] : icons.Book
	) as typeof SvelteComponent<{
		size?: number;
		color?: string;
		class?: string;
	}>;
</script>

<a href={`/courses/${course.id}`}>
	<Card.Root
		class="group relative flex min-h-40 flex-col justify-between overflow-hidden transition-all hover:bg-accent">
		<div class="absolute -right-10 z-0 opacity-5 transition-all group-hover:-rotate-[15deg]">
			<Icon size={160} />
		</div>
		<Card.Header>
			<Card.Title class="line-clamp-2 text-2xl leading-tight">
				<span class="max-w-[75%]">{course.title}</span>
			</Card.Title>
		</Card.Header>
		<Card.Footer class="flex flex-wrap gap-2">
			<AvatarGroup.Root>
				{#each course.teachers.slice(0, 3) as teacher}
					<UserCard user={teacher}>
						<AvatarGroup.Member>
							{#if teacher.avatarURL}
								<AvatarGroup.MemberImage
									src={staticfile(teacher.avatarURL)}
									alt={teacher.email} />
							{:else}
								<AvatarGroup.MemberFallback>
									{teacher.firstName && teacher.firstName[0]}{teacher.lastName &&
										teacher.lastName[0]}
								</AvatarGroup.MemberFallback>
							{/if}
						</AvatarGroup.Member>
					</UserCard>
				{/each}
				{#if course.teachers.length - 3 > 0}
					<AvatarGroup.Etc plus={course.teachers.length - 3} />
				{/if}
			</AvatarGroup.Root>
		</Card.Footer>
	</Card.Root>
</a>
