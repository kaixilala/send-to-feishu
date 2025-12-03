<script lang="ts">
	import NextStepButton from '../../NextStepButton.svelte';
	import Step from './Step.svelte';
	let { form = $bindable() }: { form: SheetFormType } = $props();
</script>

<div class="flex flex-col items-center justify-center">
	<Step currentStep="起个名字" />
	<div class="my-4 flex flex-col items-center justify-center gap-2">
		<p>最后，给配置起个名称吧</p>
		<input
			required
			id="name"
			type="text"
			class="input"
			placeholder="配置名称"
			bind:value={form.name}
		/>
	</div>
	<NextStepButton isDisable={!form.name} />
</div>
