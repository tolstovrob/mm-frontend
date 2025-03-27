<script lang="ts">
	import { queryClient } from '$shared/api';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.css';
	let { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
	{@render children()}
</QueryClientProvider>
