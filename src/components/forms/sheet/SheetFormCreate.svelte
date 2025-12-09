<script lang="ts">
	import SheetSaveArticleStep from './step/SheetSaveArticleStep.svelte';
	import SheetName from './step/SheetName.svelte';
	import FieldSelectorStep from '@/components/forms/sheet/step/FieldSelectorStep.svelte';
	import ParseUrl from './step/ParseUrl.svelte';
	import SetStartIndex from './step/SetStartIndex.svelte';
	import WorkSheetSelector from './step/WorkSheetSelector.svelte';
	import { gotoPage } from '@/lib/utils';

	let form: SheetFormType = $state({
		id: crypto.randomUUID(),
		icon: '📊',
		formType: '电子表格',
		name: '',
		sheetToken: '',
		sheetId: '',
		rangeIndex: {
			startIndex: '',
			endIndex: ''
		},
		fields: ['title', 'url']
	});

	let currentStepIndex = $state(0);

	const stepsComponents = [
		SheetSaveArticleStep,
		ParseUrl,
		WorkSheetSelector,
		FieldSelectorStep,
		SetStartIndex,
		SheetName
	];

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
