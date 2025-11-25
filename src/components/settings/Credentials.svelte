<script lang="ts">
	import { credentials } from './settings.svelte.js';
	let feishuAppId = $derived(credentials.feishuAppId);
	let feishuAppSecret = $derived(credentials.feishuAppSecret);
</script>

<div class="container mx-auto p-2">
	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs mx-auto border p-4">
		<legend class="fieldset-legend">配置飞书访问凭证</legend>
		<p class="label text-wrap">
			如有疑问，请<a
				target="_blank"
				class="link link-neutral"
				href="https://dkphhh.me/tools/send-to-feishu/">查看教程</a
			>
		</p>
		<label for="FeishuAppId" class="label">App ID</label>
		<input
			id="FeishuAppId"
			type="text"
			class="input"
			placeholder="应用ID"
			bind:value={feishuAppId}
		/>

		<label for="FeishuAppSecret" class="label">App Secret </label>
		<input
			id="FeishuAppSecret"
			type="text"
			class="input"
			placeholder="应用秘钥"
			bind:value={feishuAppSecret}
		/>

		<button
			onclick={async () => {
				if (!feishuAppId || !feishuAppSecret) {
					alert('请填写完整的 App ID 和 App Secret');
					return;
				}
				await credentials.set(feishuAppId, feishuAppSecret);
			}}
			class="btn btn-neutral mt-4">保存</button
		>
	</fieldset>
</div>
