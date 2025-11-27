<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
	import Nav from '@/components/layout/Nav.svelte';
</script>

<Nav />
<main class="container mx-auto min-h-screen p-2">
	{@render children()}
</main>
