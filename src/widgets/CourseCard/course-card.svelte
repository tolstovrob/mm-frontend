<script lang="ts">
	import type { ICourseCredentials } from '$features/Course/types';
	import * as Card from '$shared/components/ui/card';
	import * as Avatar from '$shared/components/ui/avatar';
	import * as AvatarGroup from '$shared/components/ui/avatar-group';
	import * as HoverCard from '$shared/components/ui/hover-card';
	import * as icons from 'lucide-svelte';
	import type { SvelteComponent } from 'svelte';
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
					<HoverCard.Root>
						<HoverCard.Trigger>
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
						</HoverCard.Trigger>
						<HoverCard.Content class="w-80">
							<div class="flex items-center justify-between gap-4">
								<Avatar.Root>
									<Avatar.Image src={staticfile(teacher.avatarURL)} />
									<Avatar.Fallback>
										{teacher.firstName && teacher.firstName[0]}{teacher.lastName &&
											teacher.lastName[0]}
									</Avatar.Fallback>
								</Avatar.Root>
								<div class="space-y-1">
									<a
										href={`/users/${teacher.id}`}
										class="text-sm font-semibold hover:underline hover:underline-offset-4">
										{teacher.lastName}
										{teacher.firstName}
										{teacher.patronymic}
									</a>
									<a
										href={`mailto:${teacher.email}`}
										class="text-muted-foreground hover:underline hover:underline-offset-4">
										{teacher.email}
									</a>
								</div>
							</div>
						</HoverCard.Content>
					</HoverCard.Root>
				{/each}
				{#if course.teachers.length - 3 > 0}
					<AvatarGroup.Etc plus={course.teachers.length - 3} />
				{/if}
			</AvatarGroup.Root>
		</Card.Footer>
	</Card.Root>
</a>
