<script lang="ts">
	import { allCourses } from '$features/Course/api';
	import { Button } from '$shared/components/ui/button';
	import { SearchBar } from '$shared/components/ui/search-bar';
	import { Skeleton } from '$shared/components/ui/skeleton';
	import { CourseCard } from '$widgets/CourseCard';
	import { RotateCcw } from 'lucide-svelte';

	const coursesQueue = allCourses();
	let filter: string = $state('');
</script>

<header class="mt-6 grid grid-cols-1 grid-rows-2 gap-8 lg:grid-cols-2 lg:grid-rows-1">
	<h1 class="text-3xl font-bold">Курсы</h1>
	<SearchBar
		bind:filter
		handleSubmit={() => {}} />
</header>

<div class="my-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#if $coursesQueue.isPending}
		<Skeleton class="min-h-40" />
		<Skeleton class="min-h-40" />
		<Skeleton class="min-h-40" />
		<Skeleton class="min-h-40" />
		<Skeleton class="min-h-40" />
		<Skeleton class="min-h-40" />
	{:else if $coursesQueue.error}
		<div class="col-span-1 flex flex-row items-center gap-4 md:col-span-2 lg:col-span-3">
			<span class="text-lg text-destructive">
				Не удалось загрузить курсы: {$coursesQueue.error}
			</span>
			<Button
				size="icon"
				variant="ghost"
				onclick={() => $coursesQueue.refetch()}>
				<RotateCcw />
			</Button>
		</div>
	{:else}
		{#each $coursesQueue.data as course}
			<CourseCard {course} />
		{:else}
			<div>
				Курсы не найдены. Попробуйте убрать фильтры
				<Button
					class="ml-2"
					size="icon"
					variant="ghost"
					onclick={() => $coursesQueue.refetch()}>
					<RotateCcw />
				</Button>
			</div>
		{/each}
	{/if}
</div>
