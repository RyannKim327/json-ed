/* NOTE: This file controls to filter data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { data_structure, filterOptions, main_structure, table_struct } from "../interface";
import { read } from "../middlewares/data_control";
import { isForbiddenKey, parseValue, whereClause } from "../utils";

export default function filter_data(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}

	return (table: string, opts: filterOptions) => {
		let all = true
		table = table.toLowerCase();
		if (isForbiddenKey(table)) {
			throw new Error("Cannot use forbidden key as table name");
		}

		if (opts === undefined) {
			opts = {
				limit: 10,
				start: 0,
			}
		}

		// TODO: This function is good for paginator
		// To Prevent long load time
		if (opts?.limit === undefined) {
			opts.limit = 10
		}

		// TODO: To initially starts with the first index
		if (opts?.start === undefined) {
			opts.start = 0
		}

		let filteredData: data_structure[] = []
		const values = Object.values(cache[table])

		// TODO: Setup defaults if negative
		if (opts.start <= 0) {
			opts.start = 0
		}

		if (opts.limit <= 0) {
			opts.limit = 10
		}

		// TODO: To setup defaults if the number is greater than the total of data
		if (opts.start >= values.length) {
			opts.start = values.length
		}

		if (opts.limit >= values.length) {
			opts.limit = values.length
		}

		console.log(opts.where)

		if (opts.where !== undefined && opts.where !== "") {
			// TODO: To search with specific data
			const data: string[] = whereClause(cache[table], opts.where) as string[]

			for (const item of values) {
				let result = true;
				if (data.length > 0) {
					result = evaluateCondition(item, data[0]);

					for (let i = 1; i < data.length; i += 2) {
						const operator = data[i].toUpperCase();
						const nextCondition = data[i + 1];
						if (!nextCondition) break;

						const nextResult = evaluateCondition(item, nextCondition);

						if (operator === "AND" || operator === "&&" || operator === "&") {
							result = result && nextResult;
						} else if (operator === "OR" || operator === "||" || operator === "|") {
							result = result || nextResult;
						}
					}
				}

				if (result) {
					filteredData.push(item);
				}
			}

			filteredData = filteredData.slice(opts.start, opts.start + opts.limit);
		} else {
			// TODO: Select All
			for (let i = opts.start; i < opts.start + opts.limit && i < values.length; i++) {
				filteredData.push(values[i])
			}
		}

		return filteredData
	}
}


function evaluateCondition(item: data_structure, condition: string): boolean {
	const pattern = /(\w+)\s*(=|<|>|<=|>=|!=|\sin\s)\s*("[^"]*"|'[^']*'|\S+)/i;
	const parts = condition.match(pattern);
	if (!parts) return false;

	const column = parts[1].toLowerCase();
	const operator = parts[2].toLowerCase();
	let valueRaw = parts[3].trim();

	if ((valueRaw.startsWith('"') && valueRaw.endsWith('"')) ||
		(valueRaw.startsWith("'") && valueRaw.endsWith("'"))) {
		valueRaw = valueRaw.substring(1, valueRaw.length - 1);
	}

	const itemValue = item[column];
	const targetValue = parseValue(valueRaw);

	switch (operator) {
		case "=": return itemValue === targetValue;
		case "!=": return itemValue !== targetValue;
		case ">": return (itemValue as any) > (targetValue as any);
		case "<": return (itemValue as any) < (targetValue as any);
		case ">=": return (itemValue as any) >= (targetValue as any);
		case "<=": return (itemValue as any) <= (targetValue as any);
		case " in ":
			return String(itemValue).includes(String(targetValue));
		default: return false;
	}
}
