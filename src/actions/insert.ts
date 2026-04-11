/* NOTE: This file controls the entering from data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { data_structure, insertOptions, main_structure } from "../interface";
import { read, save } from "../middlewares/data_control";
import { dataFilter, idGenerator, isForbiddenKey, stringToJson, toLowerCaseKeys } from "../utils";
import { RESERVED_TABLE } from "../reserved";

export default function insert_data(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}

	return (table: string, data: string | data_structure, opts?: insertOptions) => {
		let limit = 12

		table = table.toLowerCase()

		if (isForbiddenKey(table)) {
			throw new Error("Cannot use forbidden key as table name");
		}

		// TODO: To prevent reserved table to access
		if (table === RESERVED_TABLE) {
			throw new Error(`Cannot access reserved table: ${RESERVED_TABLE}`);
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
			if (opts?.idLength !== undefined) {
				if (opts?.idLength > 5) {
					limit = opts.idLength
				}
			}
		}

		data = dataFilter(table, data, cache)

		let id: string | number = 1
		if (cache[RESERVED_TABLE][table]["id"] === "number") {
			const keys = Object.keys(cache[table])
			if (keys.length > 0) {
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
			}
		} else {
			// TODO: This is to make the id auto generate if it is not number in type
			id = idGenerator(limit)
			const ids = Object.keys(cache[table])

			// TODO: To prevent ID Duplication
			while (ids.includes(id)) {
				id = idGenerator(limit)
			}
		}

		cache[table][id] = {
			...data,
			id: id
		}

		save(filename, key, cache)
		return cache[table][id]
	}

}
