<script lang="ts">
	import StepButton from '@/components/layout/StepButton.svelte';
	import StepLayout from './DocStepLayout.svelte';
	import { FeishuDocManager } from '@/lib/feishu/doc';
	let {
		form = $bindable(),
		onNext,
		onPre
	}: { form: DocFromType; onNext: () => void; onPre: () => void } = $props();
	let url = $state('');
	function parseFolderUrl() {
		try {
			const token = FeishuDocManager.parseFolderUrl(url);
			if (token) {
				form.folderToken = token;
			}
		} catch (e) {
			alert(`解析链接失败。${(e as Error).message}`);
		}
	}
</script>

<StepLayout
	currentStep="填写文件夹链接"
	description="要把文章保存到哪个文件夹？把它的 Url 链接放到这里吧 ⬇️ 留空表示保存到根目录。"
>
	<div class="flex flex-col items-start">
		<div class="join">
			<input
				required
				id="folderUrl"
				type="text"
				class="input join-item w-70 text-sm"
				bind:value={url}
				placeholder="https://xxx.feishu.cn/drive/folder/xxxxxx"
			/>
			<button type="button" class="btn join-item" onclick={parseFolderUrl}>解析链接</button>
		</div>

		<p class="label mt-2">解析出的 token 为 {form.folderToken}</p>
	</div>

	{#snippet footer()}
		<div class=" flex flex-row gap-4">
			<StepButton isDisable={false} onclick={onPre} description="上一步" />
			<StepButton
				isDisable={!form.folderToken}
				onclick={() => {
					onNext();
				}}
				description="下一步"
			/>
		</div>
	{/snippet}
</StepLayout>
