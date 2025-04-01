<script lang="ts">
	import {
		BookMarked,
		ChartPie,
		ChevronDown,
		GitPullRequest,
		KeyRound,
		LogOut,
		MessageSquare,
		NotebookText,
		Settings,
	} from 'lucide-svelte';
	import * as User from '$features/User';
	import * as DropdownMenu from '$shared/components/ui/dropdown-menu';
	import * as Avatar from '$shared/components/ui/avatar';
	import { LightSwitch } from '$shared/components/ui/light-switch';
	import { Button } from '$shared/components/ui/button';
	import { Skeleton } from '$shared/components/ui/skeleton';
	import { staticfile } from '$shared/api';

	const session = User.session();
	let dropdowns: Record<string, boolean> = $state({
		user: false,
		auth: false,
	});
</script>

<nav
	class="sticky top-0 z-10 w-full border-b-[1px] border-border bg-background bg-opacity-75 backdrop-blur-sm">
	<div
		class="container flex flex-row items-center justify-between border-x-[1px] border-border py-3">
		<a
			title="MergeMinds"
			href="/"
			class="flex select-none items-center gap-2 text-xl font-bold">
			<div
				class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
				<GitPullRequest class="size-4" />
			</div>
			MergeMinds
		</a>

		<div class="flex flex-row items-center gap-2">
			<LightSwitch />

			{#if !$session.isPending && !($session.data && 'id' in $session.data)}
				<DropdownMenu.Root bind:open={dropdowns.auth}>
					<DropdownMenu.Trigger>
						<Button variant="outline">
							<KeyRound class="h-[1.2rem] w-[1.2rem]" />
							<ChevronDown
								class={`transition-all ${dropdowns.auth ? '-rotate-180' : 'rotate-0'}`} />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						align="end"
						class="w-36">
						<DropdownMenu.Group>
							<a href="/login">
								<DropdownMenu.Item>Вход</DropdownMenu.Item>
							</a>
							<a href="/register">
								<DropdownMenu.Item>Регистрация</DropdownMenu.Item>
							</a>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button
					href="/courses"
					variant="outline"
					class="hidden lg:flex">
					<BookMarked class="h-5" />
					Обзор
				</Button>

				<DropdownMenu.Root bind:open={dropdowns.user}>
					<DropdownMenu.Trigger disabled={$session.isPending}>
						<Button
							variant="outline"
							disabled={$session.isPending}
							class="line-clamp-1 flex max-w-56 flex-row gap-2 overflow-hidden text-ellipsis lg:min-w-36">
							{#if $session.isPending}
								<Skeleton class="h-5 w-12 lg:w-36" />
							{:else if $session.data && 'id' in $session.data}
								<Avatar.Root class="h-6 w-6 text-xs">
									<Avatar.Image
										src={staticfile($session.data.avatarURL)}
										alt={$session.data.email} />
									<Avatar.Fallback>
										{$session.data.firstName[0].toUpperCase()}{$session.data.lastName[0].toUpperCase()}
									</Avatar.Fallback>
								</Avatar.Root>
								<span class="hidden lg:flex"
									>{$session.data.firstName} {$session.data.lastName}</span>
								<ChevronDown
									class={`transition-all ${dropdowns.user ? '-rotate-180' : 'rotate-0'}`} />
							{/if}
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						align="end"
						class="w-56">
						<DropdownMenu.Group class="block lg:hidden">
							<a href="/courses">
								<DropdownMenu.Item class="gap-2">
									<BookMarked size="16" />
									Все курсы
								</DropdownMenu.Item>
							</a>
						</DropdownMenu.Group>
						<DropdownMenu.Separator class="flex lg:hidden" />
						<DropdownMenu.Group>
							<a href="/profile">
								<DropdownMenu.Item class="gap-2">
									<Settings size="16" />
									Профиль
									<DropdownMenu.Shortcut>⌘P</DropdownMenu.Shortcut>
								</DropdownMenu.Item>
							</a>
							<a href="/profile/courses">
								<DropdownMenu.Item class="gap-2">
									<NotebookText size="16" />
									Мои курсы
									<DropdownMenu.Shortcut>⌘C</DropdownMenu.Shortcut>
								</DropdownMenu.Item>
							</a>
							<a href="/chat">
								<DropdownMenu.Item class="gap-2">
									<MessageSquare size="16" />
									Чат
									<DropdownMenu.Shortcut>⌘M</DropdownMenu.Shortcut>
								</DropdownMenu.Item>
							</a>
							<a href="/profile/statistics">
								<DropdownMenu.Item class="gap-2">
									<ChartPie size="16" />
									Статистика
									<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
								</DropdownMenu.Item>
							</a>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<a href="/logout">
								<DropdownMenu.Item class="gap-2">
									<LogOut size="16" />
									Выход
								</DropdownMenu.Item>
							</a>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</div>
	</div>
</nav>
