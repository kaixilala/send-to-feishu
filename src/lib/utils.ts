
export function getCurrentPath(): string {
	return window.location.pathname;
}

export function getPagePath(page: PageType, searchParams?: Record<string, string>): string {
	if (!searchParams) {
		return `/src/pages/${page}/index.html`;
	}

	const params = new URLSearchParams(searchParams);

	return `/src/pages/${page}/index.html?${params.toString()}`;
}

export function gotoPage(page: PageType) {
	window.location.href = getPagePath(page);
}
