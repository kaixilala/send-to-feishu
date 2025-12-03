<script lang="ts">
	import NextStepButton from '../../NextStepButton.svelte';
	import Step from './Step.svelte';
	import { FeishuSheetManager } from '@/lib/feishu/sheet';
	let { form = $bindable() }: { form: SheetFormType } = $props();
	let url = $state('');
	async function parseSheetUrl() {
		try {
			form.sheetToken = await FeishuSheetManager.parseSheetUrl(url);
		} catch (e) {
			alert(`解析链接失败。${(e as Error).message}`);
		}
	}
</script>

<div class="flex flex-col items-center justify-center">
	<Step currentStep="填写表格链接" />
	<div class="my-4 flex flex-col items-center justify-center gap-2">
		<p>要把网页内容保存到哪个表格？把它的 Url 链接放到这里吧 ⬇️</p>
		<input
			required
			id="sheetUrl"
			type="text"
			class="input"
			bind:value={url}
			placeholder="https://example.feishu.cn/sheets/xxxxxxxxxxxx"
		/>
		<button type="button" class="btn rounded-2xl btn-sm" onclick={parseSheetUrl}>解析链接</button>
	</div>
	<NextStepButton isDisable={!form.sheetToken} />
</div>
