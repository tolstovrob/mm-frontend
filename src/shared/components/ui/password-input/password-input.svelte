<script lang="ts">
	import { Input } from '$shared/components/ui/input';
	import type { WithElementRef } from 'bits-ui';
	import { Eye, EyeOff } from 'lucide-svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLInputAttributes> & {
		showPassword: boolean;
		toggleShowPassword: (event: MouseEvent) => void;
	};

	let { showPassword, toggleShowPassword, ...restProps }: Props = $props();
</script>

<div class="relative">
	<Input
		{...restProps}
		type={showPassword ? 'text' : 'password'} />
	<button
		class="absolute right-3 top-3"
		onclick={toggleShowPassword}>
		{#if showPassword}
			<Eye size="16" />
		{:else}
			<EyeOff size="16" />
		{/if}
	</button>
</div>
