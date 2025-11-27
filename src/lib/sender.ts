import { getForm } from '../components/forms/forms.svelte';
import { credentials } from '../components/settings/settings.svelte';
import { FeishuBitableManager, type BitablePayload } from '@/lib/feishu/feishu-bitable';

import { FeishuDocManager, type DocPayload } from '@/lib/feishu/feishu-doc';

import { FeishuSheetManager, type SheetPayload } from '@/lib/feishu/feishu-sheet';

export async function sendToFeishuSheet(formId: string, payload: SheetPayload) {
	if (!credentials.tokenManager) {
		// TODO:能否自定义错误类型？通过特定的错误类型，让用户自动跳转到授权页面
		throw new Error('未找到有效的凭据');
	}
	const form = getForm(formId);

	if (!form) {
		throw new Error('表单配置未找到');
	}

	if (form.formType !== '飞书表格') {
		throw new Error('表单配置类型错误');
	}

	const sheetManager = new FeishuSheetManager(
		credentials.tokenManager,
		form.sheetToken,
		form.sheetId,
		form.rangeIndex
	);

	await sheetManager.insertRowToFeishuSheet(payload);
}

export async function sendToFeishuBitable(formId: string, payload: BitablePayload) {
	if (!credentials.tokenManager) {
		// TODO:能否自定义错误类型？通过特定的错误类型，让用户自动跳转到授权页面
		throw new Error('未找到有效的凭据');
	}
	const form = getForm(formId);

	if (!form) {
		throw new Error('表单配置未找到');
	}

	if (form.formType !== '多维表格') {
		throw new Error('表单配置类型错误');
	}

	const bitableManager = new FeishuBitableManager(
		credentials.tokenManager,
		form.appToken,
		form.tableId
	);

	await bitableManager.createRecord(payload);
}

export async function sendToFeishuDoc(formId: string, payload: DocPayload) {
	if (!credentials.tokenManager) {
		// TODO:能否自定义错误类型？通过特定的错误类型，让用户自动跳转到授权页面
		throw new Error('未找到有效的凭据');
	}

	const form = getForm(formId);

	if (!form) {
		throw new Error('表单配置未找到');
	}

	if (form.formType !== '飞书文档') {
		throw new Error('表单配置类型错误');
	}

	const docManager = new FeishuDocManager(credentials.tokenManager, form.folderToken);

	await docManager.writeDocContent(payload);
}
