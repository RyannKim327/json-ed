/* NOTE: This file controls the entering from data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { data_structure, main_structure } from "../interface";
import { read, save } from "../middlewares/data_control";
import { stringToJson } from "../utils";

export default function update_data(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		cache = read(filename, key)
	}

	return (table: string, id: string | number, data: string | data_structure) => {
		if (cache[table] === undefined) {
			throw new Error("No Table Found")
		}

		if (typeof (data) === "string") {
			data = stringToJson(data)
		}

		if (cache[table][id] === undefined) {
			throw new Error(`Data with id: ${id} is undefined`)
		}

		const keys = Object.keys(data)

		keys.forEach(key => {
			if (data[key] && key) {
				cache[table][id][key] = data[key]
			}
		})

		save(filename, key, cache)
		return cache[table][id]
	}
}
