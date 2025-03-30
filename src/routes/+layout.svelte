<script lang="ts">
	import { queryClient } from '$shared/api';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { ModeWatcher } from 'mode-watcher';
	import { Navbar } from '$widgets/Navbar';
	import '../app.css';

	let { children } = $props();
</script>

<ModeWatcher />
<QueryClientProvider client={queryClient}>
	<Navbar />
	<main class="container py-8 border-x-[1px] border-border">
		{@render children()}
	</main>
</QueryClientProvider>
