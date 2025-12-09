<script lang="ts">
	import FormSettingLayout from '@/components/layout/FormSettingLayout.svelte';
	import BitableArticleFieldMatch from './step/BitableArticleFieldMatch.svelte';
	import BitableSaveArticle from './step/BitableSaveArticle.svelte';
	let { form }: { form: BitableFormType } = $props();
	let isComplete = $derived(!!form.appToken && !!form.tableId && !!form.name);
</script>

<FormSettingLayout {form} {isComplete}>
	<!-- 配置名称和图标 -->
	<div class="flex w-full flex-row gap-2">
		<div class="flex-1">
			<label for="icon" class="label">配置图标</label>
			<input
				required
				id="icon"
				type="text"
				class="input"
				placeholder="配置图标"
				bind:value={form.icon}
			/>
			<p class="label">建议使用 emoji</p>
		</div>
		<div class="flex-2">
			<label for="name" class="label">配置名称</label>
			<input
				required
				id="name"
				type="text"
				class="input"
				placeholder="配置名称"
				bind:value={form.name}
			/>
		</div>
	</div>

	<!-- 是否和飞书文档关联 -->
	<div>
		<label for="linkDocForm" class="label">App Token</label>
		<BitableSaveArticle bind:form />
	</div>

	<!-- App Token -->
	<div>
		<label for="appToken" class="label">App Token</label>
		<input
			required
			id="appToken"
			type="text"
			class="input"
			placeholder="App Token"
			bind:value={form.appToken}
		/>
	</div>
	<!-- Table ID -->
	<div>
		<label for="tableId" class="label">Table ID</label>
		<input
			required
			id="tableId"
			type="text"
			class="input"
			placeholder="Table ID"
			bind:value={form.tableId}
		/>
	</div>
	<!-- fieldMap -->
	<div>
		<BitableArticleFieldMatch {form} />
	</div>
</FormSettingLayout>
