<script lang="ts">
	import { BitableForm } from '@/components/settings/settings.svelte';
	let { name, appToken, tableId }: BitableFormType & { name: string } = $props();
	let isCreateMode = $derived(!name || name.trim() === '');
	let isComplete = $derived(!!appToken && !!tableId && !!name);

	async function handleSave() {
		if (!isComplete) {
			alert('请填写完整的配置信息');
			return;
		}

		const form = new BitableForm(name.trim(), appToken.trim(), tableId.trim());
		await form.save();
		alert('保存成功');
	}

	async function handleDelete() {
		const confirmed = confirm('确定要删除此配置吗？此操作不可撤销。');
		if (!confirmed) {
			return;
		}

		const form = new BitableForm(name.trim(), appToken.trim(), tableId.trim());
		await form.delete();
		alert('删除成功');
	}
</script>

<div class="container mx-auto p-2">
	<fieldset class="mx-auto fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4">
		<legend class="fieldset-legend">
			{#if isCreateMode}
				<span>新建<span class="badge">多维表格</span>配置</span>
			{:else}
				<span
					>修改<span class="badge">多维表格</span>配置：<span class="badge badge-primary"
						>{name}</span
					></span
				>
			{/if}
		</legend>
		<p class="label text-wrap">
			如有疑问，请<a
				target="_blank"
				class="link link-neutral"
				href="https://dkphhh.me/tools/send-to-feishu/">查看教程</a
			>
		</p>

		<!-- 配置名称 -->
		<label for="name" class="label">配置名称</label>
		<input required id="name" type="text" class="input" placeholder="配置名称" bind:value={name} />

		<!-- App Token -->
		<label for="appToken" class="label">App Token</label>
		<input
			required
			id="appToken"
			type="text"
			class="input"
			placeholder="App Token"
			bind:value={appToken}
		/>

		<!-- Table ID -->
		<label for="tableId" class="label">Table ID</label>
		<input
			required
			id="tableId"
			type="text"
			class="input"
			placeholder="Table ID"
			bind:value={tableId}
		/>

		<button disabled={!isComplete} onclick={handleSave} class="btn mt-4 btn-neutral"
			>{isCreateMode ? '新建配置' : '保存配置'}</button
		>
		<div class="divider"></div>

		<button disabled={!isComplete} onclick={handleDelete} class="btn mt-4 btn-warning"
			>删除配置</button
		>
	</fieldset>
</div>
