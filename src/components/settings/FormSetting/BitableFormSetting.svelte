<script lang="ts">
	import { BitableForm } from '@/components/settings/settings.svelte';
	import FormSettingLayout from '@/components/layout/FormSettingLayout.svelte';

	let { form }: { form: BitableForm } = $props();
	let isComplete = $derived(!!form.appToken && !!form.tableId && !!form.name);
</script>

<FormSettingLayout {form} {isComplete}>
	{#snippet title()}
		<span class="mx-1 badge badge-sm badge-neutral">多维表格</span>
	{/snippet}

	<!-- App Token -->
	<label for="appToken" class="label">App Token</label>
	<input
		required
		id="appToken"
		type="text"
		class="input"
		placeholder="App Token"
		bind:value={form.appToken}
	/>

	<!-- Table ID -->
	<label for="tableId" class="label">Table ID</label>
	<input
		required
		id="tableId"
		type="text"
		class="input"
		placeholder="Table ID"
		bind:value={form.tableId}
	/>
</FormSettingLayout>
