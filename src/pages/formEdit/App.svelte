<script lang="ts">
	import Layout from '@/components/layout/Layout.svelte';
	import {
		SheetForm,
		BitableForm,
		DocForm,
		getFormById
	} from '@/components/settings/settings.svelte';
	import SheetFormSetting from '@/components/forms/SheetFormSetting.svelte';
	import BitableFormSetting from '@/components/forms/BitableFormSetting.svelte';
	import DocFormSetting from '@/components/forms/DocFormSetting.svelte';

	const searchParams = new URL(window.location.toString()).searchParams;
	const mode = searchParams.get('mode') as EditMode;
	const formType = searchParams.get('type') as FormTypeName;
	const formId = searchParams.get('formId');
	const form = formId ? getFormById(formId) : null;
</script>

<Layout>
	{#if mode == 'create'}
		{#if formType == 'sheet'}
			<SheetFormSetting form={new SheetForm()} />
		{:else if formType == 'bitable'}
			<BitableFormSetting form={new BitableForm()} />
		{:else if formType == 'doc'}
			<DocFormSetting form={new DocForm()} />
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
