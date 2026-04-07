/* NOTE: This file controls the updating the data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { data_structure, main_structure } from "../interface";
import { read, save } from "../middlewares/data_control";
import sanitizingData from "../middlewares/sanitize";
import { c, stringToJson, toLowerCaseKeys } from "../utils";

export default function update_data(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}

	return (table: string, id: string | number, data: string | data_structure) => {
		table = table.toLowerCase()

		// TODO: To prevent reserved table to access
		if (table === "table_struct") {
			throw new Error("Cannot access reserved table: table_struct");
		}

		if (cache[table] === undefined) {
			throw new Error("No Table Found")
		}

		if (typeof (data) === "string") {
			data = stringToJson(data)
		}

		if (cache[table][id] === undefined) {
			c("Update Data", "e", `Data with id: ${id} is undefined`)
			return
		}

		data = toLowerCaseKeys(data)
		data = sanitizingData(table, data, cache)

		// TODO: This function is to force to use only allowed keys
		if (!cache[table][id]) {
			cache[table][id] = {}
		}

		Object.keys(data).forEach((key) => {
			// TODO: To filter only allowed columns
			const keys = Object.keys(cache["table_struct"][table])
			if (keys.includes(key)) {
				if (!Array.isArray(cache[table][id])) {
					cache[table][id][key] = data[key]
				}
			}
		})

		save(filename, key, cache)
		return cache[table][id]
	}
}
