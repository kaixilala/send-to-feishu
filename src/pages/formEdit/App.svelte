<script lang="ts">
	import Layout from '@/components/layout/Layout.svelte';
	import SheetFormSetting from '@/components/forms/SheetFormSetting.svelte';
	import BitableFormSetting from '@/components/forms/BitableFormSetting.svelte';
	import DocFormSetting from '@/components/forms/DocFormSetting.svelte';

	import { getForm } from '@/components/forms/forms.svelte';

	const searchParams = new URL(window.location.toString()).searchParams;
	const mode = searchParams.get('mode') as EditMode;
	const formType = searchParams.get('type') as FormTypeName;
	const formId = searchParams.get('formId');
	const form = formId ? getForm(formId) : null;
</script>

<Layout>
	{#if mode == 'create'}
		{#if formType == 'sheet'}
			<SheetFormSetting
				form={{
					formType: '飞书表格',
					id: '',
					name: '',
					rangeIndex: {
						endIndex: '',
						startIndex: ''
					},
					sheetId: '',
					sheetToken: ''
				}}
			/>
		{:else if formType == 'bitable'}
			<BitableFormSetting
				form={{
					formType: '多维表格',
					id: '',
					name: '',
					appToken: '',
					tableId: ''
				}}
			/>
		{:else if formType == 'doc'}
			<DocFormSetting
				form={{
					formType: '飞书文档',
					id: '',
					name: '',
					folderToken: ''
				}}
			/>
		{/if}
	{:else if mode == 'edit' && form}
		{#if form.formType == '飞书表格'}
			<SheetFormSetting {form} />
		{:else if form.formType == '多维表格'}
			<BitableFormSetting {form} />
		{:else if form.formType == '飞书文档'}
			<DocFormSetting {form} />
		{/if}
	{/if}
</Layout>
