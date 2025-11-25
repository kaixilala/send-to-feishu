<script lang="ts">
	import { SheetForm } from './settings.svelte';
	let { name, sheetToken, sheetId, rangeIndex }: SheetFormType & { name: string } = $props();
	let isCreateMode = $derived(!name || name.trim() === '');
	let isComplete = $derived(!!sheetToken && !!sheetId && !!name);
</script>

<div class="container mx-auto p-2">
	<fieldset class="mx-auto fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4">
		<legend class="fieldset-legend">
			{#if isCreateMode}
				<span>新建<span class="badge">飞书表格</span>配置</span>
			{:else}
				<span
					>修改<span class="badge">飞书表格</span>配置：<span class="badge badge-primary"
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

		<!-- Sheet Token -->
		<label for="sheetToken" class="label">Sheet Token</label>
		<input
			required
			id="sheetToken"
			type="text"
			class="input"
			placeholder="Sheet Token"
			bind:value={sheetToken}
		/>

		<!-- Sheet ID -->
		<label for="sheetId" class="label">Sheet ID</label>
		<input
			required
			id="sheetId"
			type="text"
			class="input"
			placeholder="Sheet ID"
			bind:value={sheetId}
		/>

		<!-- 开始索引 -->
		<label for="startIndex" class="label">开始索引</label>
		<input
			id="startIndex"
			type="text"
			class="input"
			placeholder="开始索引"
			bind:value={rangeIndex.startIndex}
		/>

		<!-- 结束索引 -->
		<label for="endIndex" class="label">结束索引</label>
		<input
			id="endIndex"
			type="text"
			class="input"
			placeholder="结束索引"
			bind:value={rangeIndex.endIndex}
		/>
		<button
			disabled={!isComplete}
			onclick={async () => {
				if (!isComplete) {
					alert('请填写完整的配置信息');
					return;
				}

				const form = new SheetForm(name.trim(), sheetToken.trim(), sheetId.trim(), {
					startIndex: rangeIndex.startIndex?.trim() || '',
					endIndex: rangeIndex.endIndex?.trim() || ''
				});

				await form.save();
				alert('保存成功');
			}}
			class="btn mt-4 btn-neutral">{isCreateMode ? '新建配置' : '保存配置'}</button
		>
	</fieldset>
</div>
