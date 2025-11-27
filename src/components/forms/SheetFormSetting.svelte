<script lang="ts">
	import FormSettingLayout from '@/components/layout/FormSettingLayout.svelte';

	let { form }: { form: SheetFormType } = $props();
	let isComplete = $derived(!!form.sheetToken && !!form.sheetId && !!form.name);
</script>

<FormSettingLayout {form} {isComplete}>
	{#snippet title()}
		<span class="mx-1 badge badge-sm badge-neutral">飞书表格</span>
	{/snippet}

	<!-- Sheet Token -->
	<label for="sheetToken" class="label">Sheet Token</label>
	<input
		required
		id="sheetToken"
		type="text"
		class="input"
		placeholder="Sheet Token"
		bind:value={form.sheetToken}
	/>

	<!-- Sheet ID -->
	<label for="sheetId" class="label">Sheet ID</label>
	<input
		required
		id="sheetId"
		type="text"
		class="input"
		placeholder="Sheet ID"
		bind:value={form.sheetId}
	/>

	<!-- 开始索引 -->
	<label for="startIndex" class="label">开始索引</label>
	<input
		id="startIndex"
		type="text"
		class="input"
		placeholder="开始索引"
		bind:value={form.rangeIndex.startIndex}
	/>

	<!-- 结束索引 -->
	<label for="endIndex" class="label">结束索引</label>
	<input
		id="endIndex"
		type="text"
		class="input"
		placeholder="结束索引"
		bind:value={form.rangeIndex.endIndex}
	/>
</FormSettingLayout>
