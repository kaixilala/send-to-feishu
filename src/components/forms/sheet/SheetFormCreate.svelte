<script lang="ts">
	import { Stepper, makeStep } from '@efstajas/svelte-stepper';

	import SheetFieldSelector from '@/components/forms/sheet/step/FieldSelector.svelte';
	const form: SheetFormType = $state({
		id: crypto.randomUUID(),
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
	let isComplete = $derived(
		!!form.sheetToken && !!form.sheetId && !!form.name && form.fields.length > 0
	);
</script>
