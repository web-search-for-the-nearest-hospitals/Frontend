export function addQueryParams(filters: Record<string, string>) {
  return Object.keys(filters)
    .filter((key) => filters[key])
    .map((key) => `${key}=${filters[key]}`)
    .join('&');
}
