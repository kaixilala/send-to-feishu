<script lang="ts">
	import FormSettingLayout from '@/components/layout/FormSettingLayout.svelte';

	let { form }: { form: DocFrommType } = $props();
	let isComplete = $derived(!!form.folderToken && !!form.name);
</script>

<FormSettingLayout {form} {isComplete}>
	{#snippet title()}
		<span class="mx-1 badge badge-sm badge-neutral">飞书文档</span>
	{/snippet}

	<!-- Folder Token -->
	<label for="folderToken" class="label">Folder Token</label>
	<input
		required
		id="folderToken"
		type="text"
		class="input"
		placeholder="Folder Token"
		bind:value={form.folderToken}
	/>
</FormSettingLayout>
