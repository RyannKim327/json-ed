/* NOTE: This file controls the entering from data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { data_structure, insertOptions, main_structure } from "../interface";
import { read, save } from "../middlewares/data_control";
import { idGenerator, stringToJson, toLowerCaseKeys } from "../utils";

export default function insert_data(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}

	return (table: string, data: string | data_structure, opts?: insertOptions) => {
		let incremental = true
		let limit = 12

		table = table.toLowerCase()
		// TODO: To prevent reserved table to access
		if (table === "table_struct") {
			throw new Error("Cannot access reserved table: table_struct");
		}

		// TODO: To question the existence of table
		// This error must create a table first for the list of columns
		// It is very important to create first rather than automatically create
		// to prevent some non-sql injection
		if (cache[table] === undefined) {
			throw new Error("Please create a table first before you add data on this table")
		}

		if (typeof (data) === "string") {
			data = stringToJson(data)
		}

		data = toLowerCaseKeys(data)

		// TODO: For string testing
		// console.log(data)
		// return {}

		if (opts !== undefined) {
			if (opts?.increment !== undefined) {
				incremental = opts.increment
			}

			if (opts?.idLength !== undefined) {
				if (opts?.idLength > 5) {
					limit = opts.idLength
				}
			}
		}

		let id: string | number = 1

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
			id = idGenerator(limit)
			while (keys.includes(id)) {
				id = idGenerator(limit)
			}
		} else if (!incremental) {
			id = idGenerator(limit)
		}

		cache[table][id] = {
			...data,
			id: id
		}

		save(filename, key, cache)
		return cache[table][id]
	}

}
