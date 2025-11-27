// API 参考文档 https://open.feishu.cn/document/server-docs/docs/sheets-v3/data-operation/append-data
import { FeishuToken } from './feishu-token-manager';
export type SheetPayload = Array<Array<string | { text: string; link: string; type: 'url' }>>;

export class FeishuSheetManager {
	constructor(
		/**
		 * 用于飞书验证的 token 管理器。
		 */
		private tokenManager: FeishuToken,
		/**
		 * 电子表格的 token。
		 */
		private sheetToken: string,
		/**
		 * 电子表格工作表的 ID。
		 */
		private sheetId: string,

		/**
		 * 电子表格工作表的范围索引。
		 */
		private rangeIndex: SheetRangeIndex
	) {}

	/**
	 *  获取电子表格的范围字符串。如果用户指定了范围就返回指定范围，如果没有就将访问指定为整个工作表
	 * @returns
	 */
	private getRange(): string {
		if (this.rangeIndex.endIndex === '' || this.rangeIndex.startIndex === '') {
			return this.sheetId;
		}
		return `${this.sheetId}!${this.rangeIndex.startIndex}:${this.rangeIndex.endIndex}`;
	}

	/**
	 *  向飞书表格中插入行数据
	 * @param payload - 要插入的数据，二维数组形式表示多行多列
	 */
	async insertRowToFeishuSheet(payload: SheetPayload) {
		const url = `https://open.feishu.cn/open-apis/sheets/v2/spreadsheets/${this.sheetToken}/values_append?insertDataOption=INSERT_ROWS`;

		const headers = {
			Authorization: `Bearer ${await this.tokenManager.getToken()}`,
			'Content-Type': 'application/json; charset=utf-8'
		};
		const body = JSON.stringify({
			range: this.getRange(),
			values: payload
		});

		const res = await fetch(url, {
			method: 'POST',
			headers,
			body
		});

		if (!res.ok) {
			throw new Error(`请求飞书表格接口失败，${await res.text()}`);
		}

		const resData: FeishuApiResponse = await res.json();

		if (resData.code !== 0) {
			throw new Error(`飞书表格接口报错：${resData.msg}`);
		}
	}

	// TODO: 读取飞书表格字段，增加可视化的索引范围选择
}
