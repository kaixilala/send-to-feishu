declare global {
	type FeishuApiResponse<T = Record<string, unknown>> = {
		/**
		 * 飞书返回的状态码，0 代表成功
		 */
		code: number;
		/**
		 * 飞书返回的错误信息
		 */
		msg: string;
		/**
		 * 飞书返回的数据，具体结构根据不同接口有所不同
		 */
		data: T;
	};

	type SheetRangeIndex = { startIndex: string; endIndex: string };

	type SheetFormType = {
		/**
		 *  配置id
		 */
		id: string;
		/**
		 *  配置名称
		 */
		name: string;
		/**
		 * 表单类型名称
		 */
		formType: '飞书表格';
		/**
		 * 电子表格的 token。
		 */
		sheetToken: string;
		/**
		 * 电子表格工作表的 ID。
		 */
		sheetId: string;
		/**
		 * 电子表格工作表的范围索引。
		 */
		rangeIndex: SheetRangeIndex;
	};

	type BitableFormType = {
		/**
		 *  配置id
		 */
		id: string;
		/**
		 *  配置名称
		 */
		name: string;
		/**
		 * 表单类型名称
		 */
		formType: '多维表格';
		/**
		 * 多维表格的 token。
		 */
		appToken: string;
		/**
		 * 多维表格的数据表的 ID。
		 */
		tableId: string;
	};

	type DocFrommType = {
		/**
		 *  配置id
		 */
		id: string;
		/**
		 *  配置名称
		 */
		name: string;
		/**
		 * 表单类型名称
		 */
		formType: '飞书文档';
		/**
		 * 指定飞书文件夹的 token。
		 */
		folderToken: string;
	};

	type FormType = SheetFormType | BitableFormType | DocFrommType;

	type Forms = FormType[];

	type FormTypeName = '飞书表格' | '多维表格' | '飞书文档';
}

export {};
