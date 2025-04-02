<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as Course from '$features/Course';
	import * as User from '$features/User';
	import * as Card from '$shared/components/ui/card';
	import { UserCard } from '$shared/components/ui/user-card';
	import { Skeleton } from '$shared/components/ui/skeleton';
	import { Button } from '$shared/components/ui/button';
	import * as icons from 'lucide-svelte';
	import type { SvelteComponent } from 'svelte';

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
	const Icon = $derived(
		($courseQuery.data && $courseQuery.data.icon in icons
			? icons[$courseQuery.data.icon as keyof typeof icons]
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
	{#each $courseQuery.data.groups as courseGroup (courseGroup.id)}
		<Card.Root
			class={`group relative mt-8 ${!courseGroup.isAllowed && 'cursor-not-allowed select-none'}`}>
			<Card.Header class={`${!courseGroup.isAllowed && 'blur-sm'}`}>
				<Card.Title>{courseGroup.title}</Card.Title>
			</Card.Header>
			<Card.Content class={`${!courseGroup.isAllowed && 'blur-sm'}`}>
				<ul class="flex flex-col gap-4">
					{#snippet item(courseId: number, courseItem: Course.ICourseItemCredentials)}
						<a
							href={`/courses/${courseId}/${courseItem.id}`}
							class="flex max-w-max items-center gap-4 underline-offset-4 hover:underline">
							{#if courseItem.type === 'info'}
								<icons.Clipboard
									size={20}
									class="text-muted-foreground" />
							{:else if courseItem.type === 'select'}
								<icons.CircleCheckBig
									size={20}
									class="text-muted-foreground" />
							{:else if courseItem.type === 'quiz'}
								<icons.ListTodo
									size={20}
									class="text-muted-foreground" />
							{:else if courseItem.type === 'upload'}
								<icons.Upload
									size={20}
									class="text-muted-foreground" />
							{:else if courseItem.type === 'file'}
								<icons.Paperclip
									size={20}
									class="text-muted-foreground" />
							{/if}
							{#if ['upload', 'quiz'].includes(courseItem.type)}
								<b>{courseItem.title}</b>
							{:else}
								{courseItem.title}
							{/if}
						</a>
					{/snippet}
					{#each courseGroup.items as courseItem (courseItem.id)}
						{@render item($courseQuery.data.id, courseItem)}
					{/each}
				</ul>
			</Card.Content>
			<div
				class={`absolute top-0 z-10 h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-background bg-opacity-50 ${courseGroup.isAllowed ? 'hidden' : 'flex'}`}>
				<icons.LockKeyhole size={64} />
				<div class="max-w-96 text-center">
					Данный раздел пока что не доступен, обратитесь к преподавателю
				</div>
			</div>
		</Card.Root>
	{/each}
{/if}
