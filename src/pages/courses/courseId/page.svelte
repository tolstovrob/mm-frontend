<script lang="ts">
	import { page } from '$app/state';
	import * as Course from '$features/Course';
	import * as User from '$entities/User';
	import * as Card from '$shared/components/ui/card';
	import { UserCard } from '$shared/components/ui/user-card';
	import { Skeleton } from '$shared/components/ui/skeleton';
	import { Button } from '$shared/components/ui/button';
	import * as icons from 'lucide-svelte';
	import type { SvelteComponent } from 'svelte';

	const courseId: string = page.params.courseId;

	const courseQuery = Course.fetchCourseById(courseId);
	const Icon = $derived(
		($courseQuery.data && $courseQuery.data.discipline.icon in icons
			? icons[$courseQuery.data.discipline.icon as keyof typeof icons]
			: icons.Book) as typeof SvelteComponent<{
			size?: number;
			color?: string;
			class?: string;
		}>,
	);
</script>

{#if $courseQuery.isPending}
	<Skeleton class="h-64 w-full" />
{:else if $courseQuery.error}
	<div class="col-span-1 flex flex-row items-center gap-4 md:col-span-2 lg:col-span-3">
		<span class="text-lg text-destructive">
			Не удалось загрузить курс. Ошибка: {$courseQuery.error}
		</span>
		<Button
			size="icon"
			variant="ghost"
			onclick={() => $courseQuery.refetch()}>
			<icons.RotateCcw />
		</Button>
	</div>
{:else if $courseQuery.data}
	<Card.Root class="relative overflow-hidden">
		<div class="absolute right-0 z-0 opacity-5 transition-all">
			<Icon size={324} />
		</div>
		<Card.Header class="flex w-full max-w-screen-md  flex-col gap-4">
			<Card.Title class="line-clamp-2 text-ellipsis text-3xl font-bold">
				{$courseQuery.data?.name}
			</Card.Title>
			<Card.Description>{$courseQuery.data?.description}</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-row flex-wrap gap-4">
				{#snippet teacherCardTrigger(teacher: User.IUser)}
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
	<!-- TODO(tolstovrob): add blocks -->
{/if}
