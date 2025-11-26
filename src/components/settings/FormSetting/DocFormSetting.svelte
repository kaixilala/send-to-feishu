<script lang="ts">
	import { DocForm } from '@/components/settings/settings.svelte';
	let { name, folderToken }: DocFrommType & { name: string } = $props();
	let isCreateMode = $derived(!name || name.trim() === '');
	let isComplete = $derived(!!folderToken && !!name);

	async function handleSave() {
		if (!isComplete) {
			alert('请填写完整的配置信息');
			return;
		}

		const form = new DocForm(name.trim(), folderToken.trim());

		await form.save();
		alert('保存成功');
	}

	async function handleDelete() {
		const confirmed = confirm('确定要删除此配置吗？此操作不可撤销。');
		if (!confirmed) {
			return;
		}

		const form = new DocForm(name.trim(), folderToken.trim());
		await form.delete();
		alert('删除成功');
	}
</script>

<div class="container mx-auto p-2">
	<fieldset class="mx-auto fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4">
		<legend class="fieldset-legend">
			{#if isCreateMode}
				<span>新建<span class="badge">飞书文档</span>配置</span>
			{:else}
				<span
					>修改<span class="badge">飞书文档</span>配置：<span class="badge badge-primary"
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

		<!-- Folder Token -->
		<label for="folderToken" class="label">Folder Token</label>
		<input
			required
			id="folderToken"
			type="text"
			class="input"
			placeholder="Folder Token"
			bind:value={folderToken}
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
