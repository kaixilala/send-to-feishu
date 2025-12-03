<script lang="ts">
	const steps = [
		'保存文章吗？',
		'填写表格链接',
		'选择工作表',
		'选择字段',
		'填写起始列',
		'起个名字'
	] as const;
	type Step = (typeof steps)[number];
	let { currentStep }: { currentStep: Step } = $props();
	let stepIndex = $derived(steps.indexOf(currentStep));
</script>

<ul class="steps">
	{#each steps as s, i (i)}
		<li class="step {i <= stepIndex ? 'step-primary' : ''}">{s}</li>
	{/each}
</ul>
