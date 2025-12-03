<script lang="ts">
	import NextStepButton from '../../NextStepButton.svelte';
	import Step from './Step.svelte';
	let { form = $bindable() }: { form: SheetFormType } = $props();

	const LETTER_ONLY_REGEX = /[^a-zA-Z]/g;
	const MAX_START_INDEX_LENGTH = 1;

	function sanitizeStartIndexValue(value?: string) {
		return (value ?? '').replace(LETTER_ONLY_REGEX, '').slice(0, MAX_START_INDEX_LENGTH);
	}

	function handleStartIndexInput() {
		const sanitized = sanitizeStartIndexValue(form.rangeIndex.startIndex);
		if (form.rangeIndex.startIndex !== sanitized) {
			form.rangeIndex.startIndex = sanitized;
		}
	}
</script>

<div class="flex flex-col items-center justify-center">
	<Step currentStep="填写起始列" />
	<div class="my-4 flex flex-col items-center justify-center gap-2">
		<p>请填写开始的列索引。如 C 表示新增的记录会从 C 列开始填写。如果不填，默认从 A 开始</p>
		<input
			id="startIndex"
			type="text"
			class="input-bordered input"
			placeholder="起始列"
			inputmode="text"
			pattern="[A-Za-z]?"
			maxlength="1"
			bind:value={form.rangeIndex.startIndex}
			oninput={handleStartIndexInput}
		/>
	</div>
	<NextStepButton isDisable={false} />
</div>
