import { data_structure } from "./interface"

export function c(from: string, status: string, message: string) {
	status = status.toLowerCase()
	let color = 36;
	status = status[0].toLowerCase();
	switch (status) {
		case "w":
			color = 33;
			status = "WARN";
			break;
		case "e":
			color = 31;
			status = "ERROR";
			break;
		case "s":
			color = 32;
			status = "SUCCESS";
			break;
		default:
			color = 36;
			status = "INFO";
	}
	if (typeof message === "object") {
		message = JSON.stringify(message, null, 2);
	}
	console.log(
		`\x1b[${color}m${status} [${from
			.replace(/\W/gi, " ")
			.trim()
			.toUpperCase()}]:\t\x1b[37m${message}`,
	);
}

export function idGenerator(length: number = 12) {
	const limit = length
	const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	let code = ""
	for (let i = 0; i < limit; i++) {
		const p = Math.floor(Math.random() * chars.length)
		const c = chars[p]
		code += c
	}
	return code
}

export function toLowerCaseKeys(data: data_structure) {
	return Object.fromEntries(
		Object.entries(data).map(([key, value]) => [key.toLowerCase(), value])
	);
}

export function parseValue(raw: string): string | number | boolean | undefined | null {
	const value = raw.trim();
	if (value === undefined) return null
	if (value === null) return null
	if (value === "") return ""

	if (value === "true") return true;
	if (value === "false") return false;

	const num = Number(value);
	if (!isNaN(num)) return num;

	return raw;
}

export function stringToJson(data: string) {
	const pattern = /([\s\w]+)\s*=\s*(?:'([^']*)'|"([^"]*)"|([^,]*))/gi
	const temp: data_structure = {}
	let match;

	while ((match = pattern.exec(data)) !== null) {
		const key = match[1].replace(/\s/gi, "").trim();
		const valueRaw = match[2] ?? match[3] ?? match[4];
		temp[key] = parseValue(valueRaw) ?? null;
	}

	return temp
}
