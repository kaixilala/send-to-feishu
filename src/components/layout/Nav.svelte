<script lang="ts">
	import { CircleChevronLeft, CircleChevronDown, Settings2 } from 'lucide-svelte';
	import { getCurrentPath, getPagePath } from '@/lib/utils';
	const currentPath = getCurrentPath();
</script>

<nav class="fixed top-0 flex w-full flex-row items-center justify-between bg-base-300 p-2">
	{#if currentPath === getPagePath('index')}
		<div class="dropdown dropdown-start">
			<div tabindex="0" role="button" class="btn btn-circle btn-ghost btn-neutral">
				<CircleChevronDown />
			</div>
			<ul
				tabindex="-1"
				class="dropdown-content menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm"
			>
				<li><a href={getPagePath('formList')} class="btn w-full btn-neutral">配置方案</a></li>
			</ul>
		</div>
	{:else}
		<a href={getPagePath('index')} target="_self" class="btn btn-circle btn-ghost btn-neutral">
			<CircleChevronLeft />
		</a>
	{/if}

	<h1 class="h-fit text-center text-lg font-black"><span>Send To Feishu</span></h1>
	<a href={getPagePath('settings')} target="_self" class="btn btn-circle btn-ghost btn-neutral">
		<Settings2 />
	</a>
</nav>
<div class="h-14"></div>
