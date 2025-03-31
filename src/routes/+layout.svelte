<script lang="ts">
	import { queryClient } from '$shared/api';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { ModeWatcher } from 'mode-watcher';
	import { Navbar } from '$widgets/Navbar';
	import { Footer } from '$widgets/Footer';
	import '../app.css';

	let { children } = $props();
</script>

<ModeWatcher />
<QueryClientProvider client={queryClient}>
	<Navbar />
	<main class="container py-8 border-x-[1px] border-border h-full">
		{@render children()}
	</main>
	<Footer />
</QueryClientProvider>
