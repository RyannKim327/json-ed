/* NOTE: This file controls to rename a table inside of json file
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure } from "../../interface";
import { read, save } from "../../middlewares/data_control";

export default function renameTable(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}

	return (oldTable: string, newTable: string) => {
		const regex = /^[A-Za-z_]+$/
		if (!regex.test(newTable)) {
			throw new Error("Table name only accepts alphabet characters and underscore")
		}

		newTable = newTable.toLowerCase()

		if (newTable === "table_struct") {
			throw new Error("Cannot access reserved table: table_struct");
		}

		if (cache["table_struct"][oldTable] === undefined) {
			throw new Error(`The table ${oldTable} is not found`)
		}

		if (cache[oldTable] === undefined) {
			throw new Error(`The table ${oldTable} is existed, but the data is not existing`)
		}

		cache["table_struct"][newTable] = cache["table_struct"][oldTable]
		cache[newTable] = cache[oldTable]

		delete cache["table_struct"][oldTable]
		delete cache[oldTable]
		save(filename, key, cache)
		return {
			"message": `Table ${oldTable} is now renamed to ${newTable}`
		}

	}
}
