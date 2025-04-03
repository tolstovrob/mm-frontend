<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as Course from '$features/Course';
	import * as User from '$features/User';
	import * as Card from '$shared/components/ui/card';
	import * as Accordion from '$shared/components/ui/accordion';
	import { UserCard } from '$shared/components/ui/user-card';
	import { Skeleton } from '$shared/components/ui/skeleton';
	import { Button } from '$shared/components/ui/button';
	import * as icons from 'lucide-svelte';
	import type { SvelteComponent } from 'svelte';
	import { Badge } from '$shared/components/ui/badge';

	const courseId: number = page.params.groupId as unknown as number;

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
	<Accordion.Root
		type="multiple"
		class="m-4">
		{#each $courseQuery.data.groups as courseGroup (courseGroup.id)}
			<Accordion.Item value={courseGroup.id.toString()}>
				<Accordion.Trigger class="my-2 text-xl">{courseGroup.title}</Accordion.Trigger>
				<Accordion.Content>
					<ul class="flex flex-col gap-4">
						{#snippet item(courseId: number, courseItem: Course.ICourseItemCredentials)}
							<a
								href={courseItem.state === 'allowed'
									? `/courses/${courseId}/${courseItem.id}`
									: 'javascript:void()'}
								class={`flex max-w-max items-center gap-4 text-lg underline-offset-4 ${courseItem.state === 'allowed' && 'hover:underline'} ${courseItem.state === 'not-allowed' && 'cursor-not-allowed'} ${courseItem.state === 'hidden' && 'hidden'}`}>
								{#if courseItem.type === 'info'}
									<icons.Clipboard
										size={24}
										class="text-muted-foreground" />
								{:else if courseItem.type === 'select'}
									<icons.CircleCheckBig
										size={24}
										class="text-muted-foreground" />
								{:else if courseItem.type === 'quiz'}
									<icons.ListTodo
										size={24}
										class="text-muted-foreground" />
								{:else if courseItem.type === 'upload'}
									<icons.Upload
										size={24}
										class="text-muted-foreground" />
								{:else if courseItem.type === 'file'}
									<icons.Paperclip
										size={24}
										class="text-muted-foreground" />
								{/if}
								<span
									class={`${courseItem.state === 'not-allowed' ? 'text-muted-foreground' : ''}`}>
									{#if ['upload', 'quiz'].includes(courseItem.type)}
										<b>{courseItem.title}</b>
									{:else}
										{courseItem.title}
									{/if}
									{#if courseItem.state === 'not-allowed'}
										&mdash; <Badge
											variant="secondary"
											class="text-sm">ограничено</Badge>
									{/if}
								</span>
							</a>
						{/snippet}
						{#each courseGroup.items as courseItem (courseItem.id)}
							{@render item($courseQuery.data.id, courseItem)}
						{/each}
					</ul>
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
{/if}
