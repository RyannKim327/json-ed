/* NOTE: This file controls to rename a table inside of json file
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure } from "../../interface";
import { read, save } from "../../middlewares/data_control";
import { RESERVED_TABLE } from "../../reserved";

export default function renameTable(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}

	return (oldTable: string, newTable: string) => {
		const regex = /^[A-Za-z_]+$/
		if (!regex.test(newTable)) {
			throw new Error("Table name only accepts alphabet characters and underscore")
		}
		if (!regex.test(oldTable)) {
			throw new Error("Table name only accepts alphabet characters and underscore")
		}

		newTable = newTable.toLowerCase()
		oldTable = oldTable.toLowerCase()

		if (oldTable === newTable) {
			return {
				"message": "No changes applied since you use same table name"
			}
		}

		if (newTable === RESERVED_TABLE) {
			throw new Error("Cannot access reserved table: table_struct");
		}

		if (cache[RESERVED_TABLE][oldTable] === undefined) {
			throw new Error(`The table ${oldTable} is not found`)
		}

		if (cache[oldTable] === undefined) {
			throw new Error(`The table ${oldTable} is existed, but the data is not existing`)
		}

		if (cache[RESERVED_TABLE][oldTable] !== undefined && cache[oldTable] !== undefined) {
			cache[RESERVED_TABLE][newTable] = cache[RESERVED_TABLE][oldTable]
			cache[newTable] = cache[oldTable]

			delete cache[RESERVED_TABLE][oldTable]
			delete cache[oldTable]
			save(filename, key, cache)
			return {
				"message": `Table ${oldTable} is now renamed to ${newTable}`
			}
		}
		throw new Error(`The table ${oldTable} is not existing`)
	}
}
