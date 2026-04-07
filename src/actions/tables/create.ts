/* NOTE: This file controls to create a table inside of json file
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { data_structure, main_structure } from "../../interface";
import { read, save } from "../../middlewares/data_control";
import { c, stringToJson } from "../../utils";

export default function createTable(filename: string, key: string, cache: main_structure) {
	return (table: string, columns: data_structure | string, autoincrement?: boolean) => {
		table = table.toLowerCase()

		// TODO: Anti destroy reserve table
		if (table === "table_struct") {
			throw new Error("Cannot access reserved table: table_struct");
		}

		if (autoincrement === undefined) {
			autoincrement = true
		}

		if (typeof columns === "string") {
			columns = stringToJson(columns)
		}

		if (Object.keys(cache).length === 0) {
			Object.assign(cache, read(filename, key))
		}

		// TODO: To prevent overwrite of the table
		if (cache[table] !== undefined) {
			c("Create Table", "e", "Table is already existed")
			return
		}

		// TODO: Clearing cache table
		cache[table] = {}

		if (columns["id"] === undefined) {
			columns["id"] = "number"
		}

		cache["table_struct"][table] = columns

		save(filename, key, cache)
		return {
			"message": "New table created"
		}
	}
}
