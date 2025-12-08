<script lang="ts">
	import Layout from '@/components/layout/Layout.svelte';
	import { FORM_ICONS } from '@/lib/const';
	import { sendToFeishu } from '@/lib/sender';
	import { getCurrentTabContent } from '@/lib/utils';
	import { allForms } from '@/components/forms/forms.svelte';
	import { extractWebArticle } from '@/lib/extract';
	import { stringifyDate } from '@/lib/utils';

	const searchParams = new URL(window.location.toString()).searchParams;
	const formId = searchParams.get('formId') as string;

	const form = $derived.by(() => allForms.find((f) => f.id === formId)!);

	let isLoading: boolean = $state(false);

	let currentTabContent = $derived.by(async () => {
		const { html, url } = await getCurrentTabContent();
		return await extractWebArticle(html, url);
	});
	let sendingModal: HTMLDialogElement;
	let result = $state<{
		type: 'success' | 'error';
		url?: string;
		errorMessage?: string;
	}>();
</script>

<Layout>
	<div class="flex flex-col items-center gap-4">
		{#await currentTabContent}
			<div class="container mx-auto my-auto h-full">
				<span class="loading loading-sm loading-spinner"></span>
			</div>
		{:then content}
			<fieldset class="fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4">
				<legend class="fieldset-legend"
					>保存到：{FORM_ICONS[form.formType] + ' ' + form.name}</legend
				>

				<label for="articleTitle" class="label">标题</label>
				<input
					id="articleTitle"
					type="text"
					class="input"
					bind:value={content.title}
					placeholder="文章标题"
				/>

				<label for="articleAuthor" class="label">作者</label>
				<input
					id="articleAuthor"
					type="text"
					class="input"
					bind:value={content.author}
					placeholder="文章作者"
				/>

				<label for="articleDescription" class="label">描述</label>
				<input
					id="articleDescription"
					type="text"
					class="input"
					bind:value={content.description}
					placeholder="文章描述"
				/>

				<label for="articleDatetime" class="label">发布时间</label>
				<input
					id="articleDatetime"
					type="datetime-local"
					class="input"
					value={new Date(content.published)}
					onchange={(event) => {
						const date = new Date((event.currentTarget as HTMLInputElement).value);
						content.published = stringifyDate(date);
					}}
					placeholder="文章发布时间"
				/>

				<label for="articleSource" class="label">来源</label>
				<input
					id="articleSource"
					type="text"
					class="input"
					bind:value={content.source}
					placeholder="文章来源"
				/>

				<label for="articleUrl" class="label">链接</label>
				<input
					id="articleUrl"
					type="text"
					class="input"
					bind:value={content.url}
					placeholder="文章链接"
				/>

				<button
					class="btn mt-4 btn-primary"
					disabled={isLoading}
					onclick={async () => {
						isLoading = true;
						sendingModal.showModal();
						try {
							result = {
								type: 'success',
								url: await sendToFeishu(formId, content)
							};
						} catch (e) {
							result = {
								type: 'error',
								errorMessage: `发送文章失败：${(e as Error).message}`
							};
						} finally {
							isLoading = false;
						}
					}}>发送</button
				>
			</fieldset>
		{:catch error}
			{@const normalErrorMessage = error instanceof Error ? error.message : String(error)}
			{@const freshPageMessage =
				normalErrorMessage.includes('Receiving end does not exist') ||
				normalErrorMessage.includes('Could not establish connection')
					? '无法连接到当前页面，请刷新页面后重试，或检查当前页面是否支持该扩展。'
					: ''}
			{@const errorMessage = freshPageMessage || normalErrorMessage}
			<div class="container mx-auto my-auto h-full text-center text-sm font-semibold opacity-60">
				<p class="text-pretty">获取文章失败：{errorMessage}</p>
			</div>
		{/await}
	</div>
</Layout>

<dialog id="sendingModal" class="modal" bind:this={sendingModal}>
	{#if isLoading}
		<div class="modal-box">
			<h3 class="text-lg font-bold">正在发送中……</h3>
			<p class="py-2">
				正在发送中，请勿关闭插件 <span class="loading loading-sm loading-dots"></span>
			</p>
			<div class="modal-action">
				<form method="dialog">
					<button class="btn" disabled>关闭</button>
				</form>
			</div>
		</div>
	{:else if result?.type === 'success'}
		<div class="modal-box">
			<h3 class="text-lg font-bold">发送成功</h3>
			<p class="py-2">
				点击<a target="_blank" href={result.url} class="link-success">链接</a> 查看结果
			</p>
			<div class="modal-action">
				<form method="dialog">
					<button class="btn" >关闭</button>
				</form>
			</div>
		</div>
	{:else if result?.type === 'error'}
		<div class="modal-box">
			<h3 class="text-lg font-bold">发送失败</h3>
			<p class="py-2">发送失败，{result.errorMessage}</p>
			<div class="modal-action">
				<form method="dialog">
					<button class="btn">关闭</button>
				</form>
			</div>
		</div>
	{:else}
		<div class="modal-box">
			<h3 class="text-lg font-bold">未知状态</h3>
			<p class="py-2">发生未知错误，请关闭后重试。</p>
			<div class="modal-action">
				<form method="dialog">
					<button class="btn">关闭</button>
				</form>
			</div>
		</div>
	{/if}
</dialog>
