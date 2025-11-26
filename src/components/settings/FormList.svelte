<script lang="ts">
	import { allForms, DocForm, SheetForm, BitableForm } from './settings.svelte';
	
	const 
	
</script>

{#snippet listItem(form: SheetForm | BitableForm | DocForm)}
	<li class="list-row">
		<div>
			<div>{form.name}</div>
			<div class="text-xs font-semibold uppercase opacity-60">
				保存到 <span class="badge badge-neutral">{form.formType}</span>
			</div>
		</div>
		<button class="btn btn-square btn-ghost">编辑</button>
	</li>
{/snippet}

<ul class="list rounded-box bg-base-100 shadow-md">
	<li class="p-4 pb-2 text-xs tracking-wide opacity-60">Most played songs this week</li>
</ul>
