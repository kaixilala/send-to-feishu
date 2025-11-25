class Credentials {
	/**
	 * 飞书应用的 App ID。
	 */
	feishuAppId: string | undefined = $state();
	/**
	 * 飞书应用的 App Secret。
	 */
	feishuAppSecret: string | undefined = $state();

	constructor() {
		this.get();
	}

	async set(feishuAppId: string, feishuAppSecret: string) {
		this.feishuAppId = feishuAppId;
		this.feishuAppSecret = feishuAppSecret;
		await chrome.storage.local.set({
			feishuAppId,
			feishuAppSecret
		});
	}

	async get() {
		const result = await chrome.storage.local.get(['feishuAppId', 'feishuAppSecret']);
		this.feishuAppId = (result.feishuAppId as string) || undefined;
		this.feishuAppSecret = (result.feishuAppSecret as string) || undefined;
	}
}

export const credentials = new Credentials();

export class SheetForm {
	/**
	 * 配置名称
	 */
	name: string = $state('');
	/**
	 * 电子表格的 token。
	 */
	sheetToken: string = $state('');
	/**
	 * 电子表格工作表的 ID。
	 */
	sheetId: string = $state('');
	/**
	 * 电子表格工作表的范围索引。
	 */
	rangeIndex: SheetRangeIndex = $state({
		startIndex: undefined,
		endIndex: undefined
	});

	constructor(name: string, sheetToken: string, sheetId: string, rangeIndex: SheetRangeIndex) {
		this.name = name;
		this.sheetToken = sheetToken;
		this.sheetId = sheetId;
		this.rangeIndex = rangeIndex;
	}

	async save() {
		const name = this.name?.trim();
		if (!name) throw new Error('配置名称不能为空');
		const result = (await chrome.storage.local.get(['sheetForms'])) as Forms;
		const sheetForms = result.sheetForms;
		sheetForms[name] = {
			sheetToken: this.sheetToken,
			sheetId: this.sheetId,
			rangeIndex: this.rangeIndex || undefined
		};
		await chrome.storage.local.set({ sheetForms });
	}

	async set(sheetToken: string, sheetId: string, rangeIndex: SheetRangeIndex) {
		this.sheetToken = sheetToken;
		this.sheetId = sheetId;
		this.rangeIndex = rangeIndex;
		await this.save();
	}
}

export class BitableForm {
	/**
	 * 配置名称
	 */
	name: string = $state('');
	/**
	 * 多维表格的 token。
	 */
	appToken: string = $state('');
	/**
	 * 多维表格的数据表的 ID。
	 */
	tableId: string = $state('');

	constructor(name: string, appToken: string, tableId: string) {
		this.name = name;
		this.appToken = appToken;
		this.tableId = tableId;
	}

	async save() {
		const name = this.name?.trim();
		if (!name) throw new Error('配置名称不能为空');
		const result = (await chrome.storage.local.get(['bitableForms'])) as Forms;
		const bitableForms = result.bitableForms;
		bitableForms[name] = {
			appToken: this.appToken,
			tableId: this.tableId
		};
		await chrome.storage.local.set({ bitableForms });
	}

	async set(appToken: string, tableId: string) {
		this.appToken = appToken;
		this.tableId = tableId;
		await this.save();
	}
}

export class DocForm {
	/**
	 * 配置名称
	 */
	name: string = $state('');
	/**
	 * 指定飞书文件夹的 token。
	 */
	folderToken: string = $state('');

	constructor(name: string, folderToken: string) {
		this.name = name;
		this.folderToken = folderToken;
	}

	async save() {
		const name = this.name?.trim();
		if (!name) throw new Error('配置名称不能为空');
		const result = (await chrome.storage.local.get(['docForms'])) as Forms;
		const docForms = result.docForms;
		if (!this.folderToken) throw new Error('folderToken 不能为空');
		docForms[name] = {
			folderToken: this.folderToken
		};
		await chrome.storage.local.set({ docForms });
	}

	async set(folderToken: string) {
		this.folderToken = folderToken;
		await this.save();
	}
}

export class FormsManager {
	async getAllSheetForms() {
		const lcoals = (await chrome.storage.local.get(['sheetForms'])) as Forms;

		const sheetForms = lcoals.sheetForms || {};

		const forms: SheetForm[] = [];

		Object.entries(sheetForms).forEach(([name, form]) => {
			forms.push(
				new SheetForm(name, form.sheetToken as string, form.sheetId as string, form.rangeIndex)
			);
		});

		return forms;
	}

	async getAllBitableForms() {
		const result = (await chrome.storage.local.get(['bitableForms'])) as Forms;

		const bitableForms = result.bitableForms || {};

		const forms: BitableForm[] = [];

		Object.entries(bitableForms).forEach(([name, form]) => {
			forms.push(new BitableForm(name, form.appToken as string, form.tableId as string));
		});

		return forms;
	}

	async getAllDocForms() {
		const result = (await chrome.storage.local.get(['docForms'])) as Forms;

		const docForms = result.docForms || {};

		const forms: DocForm[] = [];

		Object.entries(docForms).forEach(([name, form]) => {
			forms.push(new DocForm(name, form.folderToken as string));
		});

		return forms;
	}

	async getAllForms(): Promise<Array<SheetForm | BitableForm | DocForm>> {
		const sheetForms = await this.getAllSheetForms();
		const bitableForms = await this.getAllBitableForms();
		const docForms = await this.getAllDocForms();

		return [...sheetForms, ...bitableForms, ...docForms];
	}
}
