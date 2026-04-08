import { data_structure, main_structure, table_struct } from "./interface"

export function c(from: string, status: string, message: string) {
	status = status.toLowerCase()
	let color = 36;
	if (status === "") {
		status = "l"
	}
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

export function parseValue(raw: string): string | number | boolean | null {
	const value = raw.trim();
	if (value === undefined) return null
	if (value.toLowerCase() == null) return null
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
		const key = match[1].replace(/\s/gi, "").trim().toLowerCase();
		const valueRaw = match[2] ?? match[3] ?? match[4];
		temp[key] = parseValue(valueRaw) ?? null;
	}

	return temp
}

export function dataFilter(
	table: string,
	data: data_structure,
	cache: main_structure
) {
	const tbls = cache["table_struct"][table];
	const keys = Object.keys(tbls);

	const result: data_structure = {};

	keys.forEach((key) => {
		const value = data[key];
		if (data[key]) {
			if (typeof value === tbls[key]) {
				result[key] = value ?? null;
			} else {
				result[key] = null
			}
		} else {
			result[key] = null
		}
	});

	return result;
}

export function tableValidator(data: string) {
	const pattern = /([\s\w]+)\s*=\s*(?:'([^']*)'|"([^"]*)"|([^,]*))/gi
	const temp: table_struct = {}
	let match;

	const types = ["string", "number", "boolean", "null", "int"]

	while ((match = pattern.exec(data)) !== null) {
		const key = match[1].replace(/\s/gi, "").trim().toLowerCase();
		let valueRaw = match[2] ?? match[3] ?? match[4];
		if (valueRaw !== null) {
			if (types.includes(valueRaw)) {
				if (valueRaw === "int") {
					valueRaw = "number"
				}
				if (typeof valueRaw === "string") {
					temp[key] = valueRaw;
				}
			}
		}
	}

	return temp
}
