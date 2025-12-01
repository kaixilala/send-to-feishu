function parseSheetUrl(sheetUrl: string) {
	const sheetsUrl = 'https://yuanwang.feishu.cn/' + 'sheets/';
	const wikiUrl = 'https://yuanwang.feishu.cn/' + 'wiki/';

	if (!sheetUrl.startsWith(sheetsUrl) && !sheetUrl.startsWith(wikiUrl)) {
		throw new Error('多维表格链接不属于当前飞书域名，请检查链接是否正确');
	}

	const url = new URL(sheetUrl);
	const pathList = url.pathname.split('/');
	const sheetToken = pathList[pathList.length - 1];
	const sheetId = url.searchParams.get('sheet');
	if (!sheetToken) {
		alert('无法从链接中解析出 Sheet Token，请检查链接是否正确');
		return;
	}
	return { sheetToken, sheetId };
}

const b = parseSheetUrl('https://yuanwang.feishu.cn/sheets/HdQNsSKeWhyuLCtY2KYcad8fnvc');


const c = parseSheetUrl('https://yuanwang.feishu.cn/wiki/K9mZwnba5iztlEkmZQLcdZP1njd?sheet=rsqazt');

console.log(b);

console.log(c);