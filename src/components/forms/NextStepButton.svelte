<script lang="ts">
	import { createStepController } from '@efstajas/svelte-stepper';
	const stepController = createStepController();
	let { isDisable }: { isDisable: boolean } = $props();
</script>

<button
	disabled={isDisable}
	type="button"
	class="btn rounded-2xl btn-primary"
	onclick={stepController.nextStep}>下一步</button
>
