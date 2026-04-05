/* NOTE: This file controls the entering from data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { data_structure, json_data, main_structure } from "../interface";
import { read, save } from "../middlewares/data_control";
import { idGenerator, parseValue, stringToJson } from "../utils";

export default function insert_data(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		cache = read(filename, key)
	}

	return (table: string, data: string | data_structure, incremental?: boolean) => {
		if (typeof (data) === "string") {
			data = stringToJson(data)
		}

		// TODO: For string testing
		// console.log(data)
		// return {}

		if (incremental === undefined) {
			incremental = true
		}

		let id: string | number = 1
		if (cache[table] === undefined) {
			cache[table] = {}
		}

		// TODO: For ID auto generator
		const keys = Object.keys(cache[table])
		if (incremental && keys.length > 0) {
			const keys = Object.keys(cache[table])
			id = keys[keys.length - 1]
			if (typeof (id) === "number") {
				id++
			} else {
				try {
					id = parseInt(id)
					id++
				} catch (e) {
					throw new Error("ID can't be parse to numbers")
				}
			}
		} else if (!incremental && cache[table] !== undefined) {
			const keys = Object.keys(cache[table])
			id = idGenerator()
			while (keys.includes(id)) {
				id = idGenerator()
			}
		} else if (!incremental) {
			id = idGenerator()
		}

		cache[table][id] = data
		save(filename, key, cache)
		return cache
	}

}
