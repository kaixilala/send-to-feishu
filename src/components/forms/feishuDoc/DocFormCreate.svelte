<script lang="ts">
	import DocParseFolderUrl from './step/DocParseFolderUrl.svelte';
	import DocName from './step/DocName.svelte';
	import { gotoPage } from '@/lib/utils';

	let form: DocFromType = $state({
		id: crypto.randomUUID(),
		icon: '🗒️',
		formType: '飞书文档',
		name: '',
		folderToken: ''
	});

	let currentStepIndex = $state(0);

	const stepsComponents = [DocParseFolderUrl, DocName];

	function next() {
		if (currentStepIndex < stepsComponents.length - 1) {
			currentStepIndex++;
		}
	}

	function pre() {
		if (currentStepIndex === 0) {
			gotoPage('formList');
		}

		if (currentStepIndex > 0) {
			currentStepIndex--;
		}
	}
	let CurrentStepComponent = $derived(stepsComponents[currentStepIndex]);
</script>

<CurrentStepComponent bind:form onNext={next} onPre={pre} />
