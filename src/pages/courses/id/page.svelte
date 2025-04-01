<script lang="ts">
	import * as Card from '$shared/components/ui/card';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as Course from '$features/Course';
	import { UserCard } from '$shared/components/ui/user-card';
	import * as User from '$features/User';

	const courseId: number = page.params.id as unknown as number;

	$effect(() => {
		if (
			isNaN(parseInt(courseId as unknown as string)) ||
			!isFinite(courseId) ||
			courseId <= 0 ||
			parseInt(courseId as unknown as string) !== parseFloat(courseId as unknown as string)
		)
			goto('/courses');
	});

	const courseQuery = Course.fetchCourseById(courseId);
</script>

{#if $courseQuery.data}
	<Card.Root>
		<Card.Header class="flex w-full max-w-screen-md  flex-col gap-4">
			<Card.Title class="line-clamp-2 text-ellipsis text-3xl font-bold">
				{$courseQuery.data?.title}
			</Card.Title>
			<Card.Description>{$courseQuery.data?.description}</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-row flex-wrap gap-4">
				{#snippet teacherCardTrigger(teacher: User.IUserCredentials)}
					<a
						href={`/users/${teacher.id}`}
						class="underline-offset-4 hover:underline">
						{teacher.lastName}
						{teacher.firstName[0]}. {teacher.patronymic && teacher.patronymic[0] + '.'}
					</a>
				{/snippet}
				<strong>Преподаватели:</strong>
				{#each $courseQuery.data?.teachers as teacher (teacher.id)}
					<UserCard user={teacher}>
						{@render teacherCardTrigger(teacher)}
					</UserCard>
				{/each}
			</div>
		</Card.Content>
	</Card.Root>
{/if}
