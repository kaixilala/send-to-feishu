<script lang="ts">
	import StepButton from '@/components/layout/StepButton.svelte';
	import StepLayout from './BitableStepLayout.svelte';
	import { FeishuBitableManager } from '@/lib/feishu/bitable';
	let {
		form = $bindable(),
		onNext,
		onPre
	}: { form: BitableFormType; onNext: () => void; onPre: () => void } = $props();
	let url = $state('');
	async function parseBitableUrl() {
		try {
			form.appToken = await FeishuBitableManager.parseBitableUrl(url);
		} catch (e) {
			alert(`解析链接失败。${(e as Error).message}`);
		}
	}
</script>

<StepLayout
	currentStep="填写多维表格链接"
	description="要把网页内容保存到哪个多维表格？把它的 Url 链接放到这里吧 ⬇️"
>
	<div class="flex flex-col items-start">
		<div class="join">
			<input
				required
				id="sheetUrl"
				type="text"
				class="input join-item w-70 text-sm"
				bind:value={url}
				placeholder="https://xxx.feishu.cn/sheets/xxxxxx"
			/>
			<button type="button" class="btn join-item" onclick={parseBitableUrl}>解析链接</button>
		</div>

		<p class="label mt-2">解析出的 token 为 {form.appToken}</p>
	</div>

	{#snippet footer()}
		<div class=" flex flex-row gap-4">
			<StepButton isDisable={false} onclick={onPre} description="上一步" />
			<StepButton
				isDisable={!form.appToken}
				onclick={() => {
					onNext();
				}}
				description="下一步"
			/>
		</div>
	{/snippet}
</StepLayout>
