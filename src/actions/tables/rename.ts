/* NOTE: This file controls to rename a table inside of json file
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure } from "../../interface";
import { read, save } from "../../middlewares/data_control";
import { isForbiddenKey } from "../../utils";

export default function renameTable(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}

	return (oldTable: string, newTable: string) => {
		oldTable = oldTable.toLowerCase()
		newTable = newTable.toLowerCase()

		if (isForbiddenKey(oldTable) || isForbiddenKey(newTable)) {
			throw new Error("Cannot use forbidden key as table name");
		}

		const regex = /^[A-Za-z_]+$/
		if (!regex.test(newTable)) {
			throw new Error("Table name only accepts alphabet characters and underscore")
		}
		if (!regex.test(oldTable)) {
			throw new Error("Table name only accepts alphabet characters and underscore")
		}

		if (oldTable === newTable) {
			return {
				"message": "No changes applied since you use same table name"
			}
		}

		if (newTable === "table_struct") {
			throw new Error("Cannot access reserved table: table_struct");
		}

		if (cache["table_struct"][oldTable] === undefined) {
			throw new Error(`The table ${oldTable} is not found`)
		}

		if (cache[oldTable] === undefined) {
			throw new Error(`The table ${oldTable} is existed, but the data is not existing`)
		}

		if (cache["table_struct"][oldTable] !== undefined && cache[oldTable] !== undefined) {
			cache["table_struct"][newTable] = cache["table_struct"][oldTable]
			cache[newTable] = cache[oldTable]

			delete cache["table_struct"][oldTable]
			delete cache[oldTable]
			save(filename, key, cache)
			return {
				"message": `Table ${oldTable} is now renamed to ${newTable}`
			}
		}
		throw new Error(`The table ${oldTable} is not existing`)
	}
}
