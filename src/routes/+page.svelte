<script>
	import * as Example from '$features/Example';
	import { Button } from '$shared/components/ui/button';

	const sender = Example.checkHealth();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Button>Aboba</Button>

<pre>
	{JSON.stringify($sender.isPending)}
	{JSON.stringify($sender.error) ?? 'no error'}
	{JSON.stringify($sender.data) ?? 'no data'}
</pre>
