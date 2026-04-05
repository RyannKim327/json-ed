import { data_structure } from "./interface"

export function idGenerator() {
	const limit = 12
	const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	let code = ""
	for (let i = 0; i < limit; i++) {
		const p = Math.floor(Math.random() * chars.length)
		const c = chars[p]
		code += c
	}
	return code
}

export function stringToJson(data: string) {
	const pattern = /([\s\w]+)\s*=\s*(?:'([^']*)'|"([^"]*)"|([^,]*))/gi
	const temp: data_structure = {}
	let match;

	while ((match = pattern.exec(data)) !== null) {
		const key = match[1].replace(/\s/gi, "").trim();
		const valueRaw = match[2] ?? match[3] ?? match[4];
		temp[key] = parseValue(valueRaw);
	}

	return temp
}

export function parseValue(raw: string): string | number | boolean | undefined | null {
	const value = raw.trim();

	if (value === "true") return true;
	if (value === "false") return false;

	if (value === "") return ""
	if (value === undefined) return undefined
	if (value === null) return null

	const num = Number(value);
	if (!isNaN(num)) return num;

	// fallback string
	return value;
}
