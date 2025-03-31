<script lang="ts">
	import { Button } from '$shared/components/ui/button';
	import { Input } from '$shared/components/ui/input';
	import { Search } from 'lucide-svelte';

	type Props = {
		filter: string;
		handleSubmit: () => void;
	};

	let { filter = $bindable(), handleSubmit }: Props = $props();
</script>

<form
	onsubmit={handleSubmit}
	class="flex flex-row items-center gap-1">
	<Input
		type="text"
		placeholder="Найти нужный курс..."
		class="h-12"
		bind:value={filter} />
	<Button
		type="submit"
		variant="secondary"
		class="h-12">
		<Search />
	</Button>
</form>
