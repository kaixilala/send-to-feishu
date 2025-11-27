<script lang="ts">
	import { getPagePath } from '@/lib/utils';
	import { allForms } from '@/components/forms/forms.svelte';
	import { ListPlus } from 'lucide-svelte';
</script>

{#snippet listItem(form: FormType)}
	<li class="list-row">
		<div class="">
			<div class="text-xl">{form.name}</div>
			<div class="text-xs font-semibold opacity-60">
				保存到 <span class="badge badge-sm badge-neutral">{form.formType}</span>
			</div>
		</div>
		<button class="btn btn-square btn-ghost">选择</button>
		<button class="btn btn-square btn-ghost">编辑</button>
	</li>
{/snippet}

<div class="flex flex-col items-center gap-8">
	<ul class="list w-full rounded-box bg-base-100 shadow-md">
		<li class="p-4 pb-2 text-xs tracking-wide opacity-60">配置列表</li>
		{#each allForms as form (form.id)}
			{@render listItem(form)}
		{/each}
	</ul>

	<div class="dropdown dropdown-center">
		<div tabindex="0" role="button" class="btn m-1 btn-neutral">
			<ListPlus />
			新建配置
		</div>
		<ul
			tabindex="-1"
			class="dropdown-content menu z-1 w-52 gap-2 rounded-box bg-base-100 p-2 shadow-sm"
		>
			<li>
				<a
					href={getPagePath('formEdit', { type: 'sheet', mode: 'create' })}
					class="btn w-full btn-ghost">飞书表格</a
				>
			</li>
			<li>
				<a
					href={getPagePath('formEdit', { type: 'bitable', mode: 'create' })}
					class="btn w-full btn-ghost">多维表格</a
				>
			</li>
			<li>
				<a
					href={getPagePath('formEdit', { type: 'doc', mode: 'create' })}
					class="btn w-full btn-ghost">飞书文档</a
				>
			</li>
		</ul>
	</div>
</div>
